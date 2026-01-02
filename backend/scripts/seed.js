import { db, saveDatabase } from '../db/connection.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Categories data
const categories = [
    { name_en: 'Raw Materials', name_ar: 'المواد الخام', slug: 'raw-materials' },
    { name_en: 'Chocolates', name_ar: 'الشوكولاتة', slug: 'chocolates' },
    { name_en: 'Creams & Fillings', name_ar: 'الكريمات والحشوات', slug: 'creams-fillings' },
    { name_en: 'Cake Decoration', name_ar: 'مستلزمات تزيين الكيك', slug: 'cake-decoration' },
    { name_en: 'Ice Cream & Gelato', name_ar: 'الآيس كريم والجيلاتو', slug: 'ice-cream-gelato' },
    { name_en: 'Beverages & Syrups', name_ar: 'المشروبات والسيروب', slug: 'beverages-syrups' }
];

// Products data organized by category
const products = [
    // Raw Materials (category 1)
    { category: 1, name_en: 'Cocoa Butter', name_ar: 'زبدة الكاكاو', code: 'RM-001', weight: '25 KG' },
    { category: 1, name_en: 'Natural Cocoa Powder', name_ar: 'بودرة كاكاو طبيعي', code: 'RM-002', weight: '25 KG' },
    { category: 1, name_en: 'Alkalized Cocoa Powder', name_ar: 'بودرة كاكاو قلوية', code: 'RM-003', weight: '25 KG' },
    { category: 1, name_en: 'Skimmed Milk Powder', name_ar: 'حليب بودرة منزوع الدسم', code: 'RM-004', weight: '25 KG' },
    { category: 1, name_en: 'Vegetable Ghee/Fats', name_ar: 'سمن نباتي / دهون', code: 'RM-005', weight: '15 KG' },

    // Chocolates (category 2)
    { category: 2, name_en: 'Dark Chocolate Couverture', name_ar: 'شوكولاتة خام داكنة كوفيرتير', code: 'CH-101', weight: '5 KG' },
    { category: 2, name_en: 'Milk Chocolate Chips', name_ar: 'حبيبات شوكولاتة بالحليب', code: 'CH-102', weight: '10 KG' },
    { category: 2, name_en: 'White Chocolate Compound Slab', name_ar: 'قوالب شوكولاتة بيضاء كومباوند', code: 'CH-103', weight: '10 KG' },
    { category: 2, name_en: 'Chocolate Vermicelli', name_ar: 'فرماسيل شوكولاتة', code: 'CH-104', weight: '1 KG' },

    // Creams & Fillings (category 3)
    { category: 3, name_en: 'Pistachio Cream', name_ar: 'كريمة الفستق', code: 'CR-201', weight: '5 KG' },
    { category: 3, name_en: 'Lotus/Biscuit Spread', name_ar: 'كريمة البسكويت', code: 'CR-202', weight: '5 KG' },
    { category: 3, name_en: 'Hazelnut Cocoa Cream', name_ar: 'كريمة البندق والكاكاو', code: 'CR-203', weight: '5 KG' },
    { category: 3, name_en: 'Kinder/Bueno Filling', name_ar: 'حشوة كيندر', code: 'CR-204', weight: '5 KG' },

    // Cake Decoration (category 4)
    { category: 4, name_en: 'Sugar Paste - White', name_ar: 'عجينة السكر - أبيض', code: 'DC-301', weight: '1 KG' },
    { category: 4, name_en: 'Sugar Paste - Colors', name_ar: 'عجينة السكر - ألوان', code: 'DC-302', weight: '1 KG' },
    { category: 4, name_en: 'Cold Glaze - Neutral', name_ar: 'ملمع بارد - شفاف', code: 'DC-303', weight: '5 KG' },
    { category: 4, name_en: 'Chantilly Cream Powder', name_ar: 'بودرة كريم شانتيه', code: 'DC-304', weight: '10 KG' },

    // Ice Cream & Gelato (category 5)
    { category: 5, name_en: 'Soft Ice Cream Powder - Vanilla', name_ar: 'بودرة سوفت آيس كريم - فانيليا', code: 'IC-401', weight: '1.5 KG' },
    { category: 5, name_en: 'Soft Ice Cream Powder - Chocolate', name_ar: 'بودرة سوفت آيس كريم - شوكولاتة', code: 'IC-402', weight: '1.5 KG' },
    { category: 5, name_en: 'Fruit Pastes (Mango/Strawberry)', name_ar: 'معجون الفواكه', code: 'IC-403', weight: '1 KG' },

    // Beverages & Syrups (category 6)
    { category: 6, name_en: 'Mojito Syrup', name_ar: 'سيروب موهيتو', code: 'BV-501', weight: '750ml' },
    { category: 6, name_en: 'Caramel Sauce', name_ar: 'صوص الكراميل', code: 'BV-502', weight: '1 KG' },
    { category: 6, name_en: 'Slush Syrup', name_ar: 'سيروب سلاش', code: 'BV-503', weight: '5 KG' }
];

function seedDatabase() {
    try {
        console.log('🌱 Starting database seeding...');

        // Read and execute schema
        const schemaPath = path.join(__dirname, '../db/schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        // Execute schema (create tables)
        db.exec(schema);
        console.log('📋 Schema executed successfully');

        // Clear existing data
        console.log('🗑️  Clearing existing data...');
        db.run('DELETE FROM products');
        db.run('DELETE FROM categories');

        // Insert categories
        console.log('📁 Inserting categories...');
        for (const cat of categories) {
            db.run(
                'INSERT INTO categories (name_en, name_ar, slug) VALUES ($1, $2, $3)',
                { $1: cat.name_en, $2: cat.name_ar, $3: cat.slug }
            );
            console.log(`   ✓ ${cat.name_en} (${cat.name_ar})`);
        }

        // Insert products
        console.log('📦 Inserting products...');
        for (const product of products) {
            db.run(`
                INSERT INTO products 
                (category_id, name_en, name_ar, code, weight, description_en, description_ar) 
                VALUES ($1, $2, $3, $4, $5, $6, $7)
            `, {
                $1: product.category,
                $2: product.name_en,
                $3: product.name_ar,
                $4: product.code,
                $5: product.weight,
                $6: `Premium quality ${product.name_en.toLowerCase()} for professional use.`,
                $7: `${product.name_ar} بجودة عالية للاستخدام المهني.`
            });
            console.log(`   ✓ ${product.code}: ${product.name_en}`);
        }

        // Save database
        saveDatabase();

        console.log('✅ Database seeding completed successfully!');
        console.log(`📊 Inserted: ${categories.length} categories, ${products.length} products`);

    } catch (error) {
        console.error('❌ Error seeding database:', error);
        throw error;
    }
}

// Run the seed function
try {
    seedDatabase();
    console.log('🎉 Seeding process finished');
    process.exit(0);
} catch (error) {
    console.error('💥 Seeding failed:', error);
    process.exit(1);
}
