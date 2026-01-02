import express from 'express';
import pool from '../db/connection.js';

const router = express.Router();

// GET all products with filters
router.get('/', async (req, res) => {
    try {
        const { category, search } = req.query;

        let query = `
      SELECT p.*, c.name_en as category_name_en, c.name_ar as category_name_ar, c.slug as category_slug
      FROM products p
      JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
        const params = [];
        let paramCount = 1;

        // Filter by category slug
        if (category) {
            query += ` AND c.slug = $${paramCount}`;
            params.push(category);
            paramCount++;
        }

        // Search by name or code
        if (search) {
            query += ` AND (
        LOWER(p.name_en) LIKE LOWER($${paramCount}) OR 
        LOWER(p.name_ar) LIKE LOWER($${paramCount}) OR 
        LOWER(p.code) LIKE LOWER($${paramCount})
      )`;
            params.push(`%${search}%`);
            paramCount++;
        }

        query += ' ORDER BY p.created_at DESC';

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// GET single product by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            `SELECT p.*, c.name_en as category_name_en, c.name_ar as category_name_ar, c.slug as category_slug
       FROM products p
       JOIN categories c ON p.category_id = c.id
       WHERE p.id = $1`,
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
});

// POST create new product (Admin)
router.post('/', async (req, res) => {
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

        const result = await pool.query(
            `INSERT INTO products 
       (category_id, name_en, name_ar, code, weight, description_en, description_ar, image) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
       RETURNING *`,
            [
                category_id,
                name_en,
                name_ar,
                code,
                weight,
                description_en || '',
                description_ar || '',
                image || 'placeholder.jpg'
            ]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// PUT update product (Admin)
router.put('/:id', async (req, res) => {
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

        const result = await pool.query(
            `UPDATE products 
       SET category_id = $1, name_en = $2, name_ar = $3, code = $4, 
           weight = $5, description_en = $6, description_ar = $7, image = $8
       WHERE id = $9 
       RETURNING *`,
            [category_id, name_en, name_ar, code, weight, description_en, description_ar, image, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE product (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM products WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

export default router;
