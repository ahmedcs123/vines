-- Database Schema for The Vines Trading Company

-- Drop tables if they exist
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;

-- Categories Table
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
    name_en VARCHAR(255) NOT NULL,
    name_ar VARCHAR(255) NOT NULL,
    code VARCHAR(50) UNIQUE NOT NULL,
    weight VARCHAR(100) NOT NULL,
    description_en TEXT DEFAULT '',
    description_ar TEXT DEFAULT '',
    image VARCHAR(500) DEFAULT 'placeholder.jpg',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_code ON products(code);
CREATE INDEX idx_categories_slug ON categories(slug);

-- Full text search indexes
CREATE INDEX idx_products_name_en ON products USING gin(to_tsvector('english', name_en));
CREATE INDEX idx_products_name_ar ON products USING gin(to_tsvector('arabic', name_ar));
