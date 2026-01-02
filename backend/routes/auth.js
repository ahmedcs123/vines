import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Simple admin authentication
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'vines2024';

    if (username === adminUsername && password === adminPassword) {
        res.json({
            success: true,
            message: 'Login successful',
            user: { username: adminUsername, role: 'admin' }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid credentials'
        });
    }
});

export default router;
