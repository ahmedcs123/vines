import express from 'express';
import pool from '../db/connection.js';

const router = express.Router();

// GET all categories
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM categories ORDER BY id ASC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// GET single category by slug
router.get('/:slug', async (req, res) => {
    try {
        const { slug } = req.params;
        const result = await pool.query(
            'SELECT * FROM categories WHERE slug = $1',
            [slug]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).json({ error: 'Failed to fetch category' });
    }
});

// POST create new category (Admin)
router.post('/', async (req, res) => {
    try {
        const { name_en, name_ar, slug, image } = req.body;

        const result = await pool.query(
            'INSERT INTO categories (name_en, name_ar, slug, image) VALUES ($1, $2, $3, $4) RETURNING *',
            [name_en, name_ar, slug, image || null]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// PUT update category (Admin)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name_en, name_ar, slug, image } = req.body;

        const result = await pool.query(
            'UPDATE categories SET name_en = $1, name_ar = $2, slug = $3, image = $4 WHERE id = $5 RETURNING *',
            [name_en, name_ar, slug, image, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({ error: 'Failed to update category' });
    }
});

// DELETE category (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'DELETE FROM categories WHERE id = $1 RETURNING *',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

export default router;
