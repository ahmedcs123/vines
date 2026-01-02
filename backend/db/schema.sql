-- Database Schema for The Vines Trading Company (SQLite)

-- Drop tables if they exist
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

-- Categories Table
CREATE TABLE categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    image TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    category_id INTEGER NOT NULL,
    name_en TEXT NOT NULL,
    name_ar TEXT NOT NULL,
    code TEXT UNIQUE NOT NULL,
    weight TEXT NOT NULL,
    description_en TEXT,
    description_ar TEXT,
    image TEXT DEFAULT 'placeholder.jpg',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_code ON products(code);
CREATE INDEX idx_categories_slug ON categories(slug);
