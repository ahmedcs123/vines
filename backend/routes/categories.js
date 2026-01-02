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

// GET all categories
router.get('/', (req, res) => {
    try {
        const result = db.exec('SELECT * FROM categories ORDER BY id ASC');
        res.json(resultToObjects(result));
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// GET single category by slug
router.get('/:slug', (req, res) => {
    try {
        const { slug } = req.params;
        const stmt = db.prepare('SELECT * FROM categories WHERE slug = ?');
        stmt.bind([slug]);

        const result = [];
        while (stmt.step()) {
            const row = stmt.getAsObject();
            result.push(row);
        }
        stmt.free();

        if (result.length > 0) {
            res.json(result[0]);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
});

// POST create new category (Admin)
router.post('/', (req, res) => {
    try {
        const { name_en, name_ar, slug, image } = req.body;

        const stmt = db.prepare('INSERT INTO categories (name_en, name_ar, slug, image) VALUES (?, ?, ?, ?)');
        stmt.bind([name_en, name_ar, slug, image || null]);
        stmt.step();
        stmt.free();

        saveDatabase();

        // Get the inserted category
        const stmt2 = db.prepare('SELECT * FROM categories WHERE id = last_insert_rowid()');
        stmt2.step();
        const row = stmt2.getAsObject();
        stmt2.free();

        res.status(201).json(row);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category', details: error.message });
    }
});

// PUT update category (Admin)
router.put('/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { name_en, name_ar, slug, image } = req.body;

        const stmt = db.prepare('UPDATE categories SET name_en = ?, name_ar = ?, slug = ?, image = ? WHERE id = ?');
        stmt.bind([name_en, name_ar, slug, image, id]);
        stmt.step();
        stmt.free();

        saveDatabase();

        // Get the updated category
        const stmt2 = db.prepare('SELECT * FROM categories WHERE id = ?');
        stmt2.bind([id]);
        stmt2.step();
        const row = stmt2.getAsObject();
        stmt2.free();

        if (row && row.id) {
            res.json(row);
        } else {
            res.status(404).json({ error: 'Category not found' });
        }
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Failed to update category' });
    }
});

// DELETE category (Admin)
router.delete('/:id', (req, res) => {
    try {
        const { id } = req.params;

        const stmt = db.prepare('DELETE FROM categories WHERE id = ?');
        stmt.bind([id]);
        stmt.step();
        stmt.free();

        saveDatabase();

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

export default router;
