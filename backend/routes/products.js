import express from 'express';
import { db, saveDatabase } from '../db/connection.js';

const router = express.Router();

// Helper function to convert sql.js result to objects
function resultToObjects(result) {
    if (!result || result.length === 0) return [];
    const rows = [];
    for (const values of result[0].values) {
        const obj = {};
        result[0].columns.forEach((col, idx) => {
            obj[col] = values[idx];
        });
        rows.push(obj);
    }
    return rows;
}

// GET all products with filters
router.get('/', (req, res) => {
    try {
        const { category, search } = req.query;

        let query = `
      SELECT p.*, c.name_en as category_name_en, c.name_ar as category_name_ar, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
        const params = [];

        // Filter by category slug
        if (category) {
            query += ` AND c.slug = ?`;
            params.push(category);
        }

        // Search by name or code
        if (search) {
            query += ` AND (
        LOWER(p.name_en) LIKE LOWER(?) OR 
        LOWER(p.name_ar) LIKE LOWER(?) OR 
        LOWER(p.code) LIKE LOWER(?)
      )`;
            const searchTerm = `%${search}%`;
            params.push(searchTerm, searchTerm, searchTerm);
        }

        query += ' ORDER BY p.created_at DESC';

        const stmt = db.prepare(query);
        if (params.length > 0) {
            stmt.bind(params);
        }

        const rows = [];
        while (stmt.step()) {
            rows.push(stmt.getAsObject());
        }
        stmt.free();

        res.json(rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET single product by ID
router.get('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const stmt = db.prepare(`
            SELECT p.*, c.name_en as category_name_en, c.name_ar as category_name_ar, c.slug as category_slug
            FROM products p
            JOIN categories c ON p.category_id = c.id
            WHERE p.id = ?
        `);
        stmt.bind([id]);

        if (stmt.step()) {
            const row = stmt.getAsObject();
            stmt.free();
            res.json(row);
        } else {
            stmt.free();
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// POST create new product (Admin)
router.post('/', (req, res) => {
    try {
        const {
            category_id,
            name_en,
            name_ar,
            code,
            weight,
            description_en,
            description_ar,
            image
        } = req.body;

        const stmt = db.prepare(`
            INSERT INTO products 
            (category_id, name_en, name_ar, code, weight, description_en, description_ar, image) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `);

        stmt.bind([
            category_id,
            name_en,
            name_ar,
            code,
            weight,
            description_en || '',
            description_ar || '',
            image || 'placeholder.jpg'
        ]);

        stmt.step();
        stmt.free();

        saveDatabase();

        // Get the inserted product
        const stmt2 = db.prepare('SELECT * FROM products WHERE id = last_insert_rowid()');
        stmt2.step();
        const row = stmt2.getAsObject();
        stmt2.free();

        res.status(201).json(row);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product', details: error.message });
    }
});

// PUT update product (Admin)
router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const {
            category_id,
            name_en,
            name_ar,
            code,
            weight,
            description_en,
            description_ar,
            image
        } = req.body;

        const stmt = db.prepare(`
            UPDATE products 
            SET category_id = ?, name_en = ?, name_ar = ?, code = ?, 
                weight = ?, description_en = ?, description_ar = ?, image = ?
            WHERE id = ?
        `);

        stmt.bind([
            category_id,
            name_en,
            name_ar,
            code,
            weight,
            description_en,
            description_ar,
            image,
            id
        ]);

        stmt.step();
        stmt.free();

        saveDatabase();

        // Get the updated product
        const stmt2 = db.prepare('SELECT * FROM products WHERE id = ?');
        stmt2.bind([id]);

        if (stmt2.step()) {
            const row = stmt2.getAsObject();
            stmt2.free();
            res.json(row);
        } else {
            stmt2.free();
            res.status(404).json({ error: 'Product not found' });
        }
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE product (Admin)
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;

        const stmt = db.prepare('DELETE FROM products WHERE id = ?');
        stmt.bind([id]);
        stmt.step();
        stmt.free();

        saveDatabase();

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

export default router;
