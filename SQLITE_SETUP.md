# SQLite Database Setup Guide

## Overview

This project uses **SQLite** for local development. SQLite is a self-contained, zero-configuration database that stores data in a single file, making it perfect for development and testing.

---

## ✅ Advantages of SQLite

- **Zero Configuration**: No server needed, no installation required
- **Single File**: Database stored in `backend/db/vines_trading.sqlite`
- **Cross-Platform**: Works on Windows, Mac, and Linux
- **Fast**: Perfect for development and testing
- **Easy Backup**: Just copy the `.sqlite` file

---

## 🚀 Quick Setup

### 1. Install Dependencies

```bash
cd g:\trade\backend
npm install
```

This will install `better-sqlite3` automatically.

### 2. Create Database and Seed Data

```bash
npm run seed
```

This single command will:
- Create the database file automatically
- Create all tables (categories, products)
- Insert sample data (6 categories, 25+ products)

### 3. Start the Server

```bash
npm start
# Or for development with auto-reload:
npm run dev
```

You should see:
```
✅ Connected to SQLite database
📁 Database: g:\trade\backend\db\vines_trading.sqlite
Server running on http://localhost:9080
```

---

## 📁 Database File Location

The SQLite database file is created at:
```
g:\trade\backend\db\vines_trading.sqlite
```

This file contains all your data. You can:
- **Backup**: Copy this file anywhere
- **Reset**: Delete it and run `npm run seed` again
- **Share**: Send it to teammates for testing

---

## 🔄 Database Operations

### View Database Contents

You can use any SQLite viewer:

**Option 1: VS Code Extension**
- Install "SQLite Viewer" extension
- Right-click `vines_trading.sqlite` → Open in SQLite Viewer

**Option 2: DB Browser for SQLite** (Recommended)
- Download from: https://sqlitebrowser.org/
- Open the `.sqlite` file
- Browse tables, run queries, export data

**Option 3: Command Line**
```bash
# On Windows (if SQLite CLI installed)
sqlite3 backend/db/vines_trading.sqlite

# View tables
.tables

# Query data
SELECT * FROM categories;
SELECT * FROM products LIMIT 5;

# Exit
.exit
```

### Reset Database

```bash
# Delete database file
rm backend/db/vines_trading.sqlite  # Mac/Linux
del backend\db\vines_trading.sqlite  # Windows

# Re-seed
npm run seed
```

### Backup Database

```bash
# Simple copy
cp backend/db/vines_trading.sqlite backend/db/backup_$(date +%Y%m%d).sqlite
```

---

## 🧪 Testing

### Test API Endpoints

```bash
# Get all categories
curl http://localhost:9080/api/categories

# Get all products
curl http://localhost:9080/api/products

# Search products
curl http://localhost:9080/api/products?search=chocolate

# Filter by category
curl http://localhost:9080/api/products?category=chocolates
```

### Test Admin Operations

```bash
# Create a category
curl -X POST http://localhost:9080/api/categories \
  -H "Content-Type: application/json" \
  -d '{"name_en":"Test Category","name_ar":"فئة تجريبية","slug":"test-category"}'

# Update a product
curl -X PUT http://localhost:9080/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"category_id":1,"name_en":"Updated Product","name_ar":"محدث","code":"TEST-01","weight":"1KG","description_en":"Test","description_ar":"اختبار","image":"test.jpg"}'

# Delete a product
curl -X DELETE http://localhost:9080/api/products/1
```

---

## ⚠️ Production Deployment

> [!IMPORTANT]
> **SQLite is for LOCAL DEVELOPMENT ONLY!**

When deploying to Hostinger or any production server:

### Why Not SQLite in Production?

- ❌ Not suitable for concurrent writes
- ❌ Not recommended for web hosting
- ❌ Most hosting providers don't support file-based databases well

### Deploy with MySQL Instead

For production deployment, follow these steps:

1. **Use MySQL Setup Guide**
   ```bash
   # See MYSQL_SETUP.md for complete instructions
   ```

2. **Export SQLite Data** (if needed)
   - Use DB Browser to export tables as SQL
   - Import into MySQL via phpMyAdmin

3. **Update Code for MySQL**
   - The codebase can support both SQLite and MySQL
   - Use environment variable to switch:
   ```javascript
   const db = process.env.NODE_ENV === 'production' 
     ? mysqlConnection 
     : sqliteConnection;
   ```

4. **Or Keep Separate Branches**
   - `dev` branch: SQLite code
   - `production` branch: MySQL code
   - Merge features from dev → production

---

## 🔧 Advanced Tips

### Custom Database Path

Edit `backend/db/connection.js`:
```javascript
const dbPath = path.join(__dirname, 'custom_name.sqlite');
```

### Performance Optimization

```javascript
// In connection.js, add:
db.pragma('journal_mode = WAL'); // Write-Ahead Logging
db.pragma('synchronous = NORMAL');
db.pragma('cache_size = 10000');
```

### Enable Query Logging

Already enabled in connection.js:
```javascript
const db = new Database(dbPath, { verbose: console.log });
```

To disable logging:
```javascript
const db = new Database(dbPath); // Remove verbose option
```

---

## 🐛 Troubleshooting

### Error: "Database is locked"

**Cause**: Another process is using the database  
**Solution**: 
- Close any SQLite viewer apps
- Restart the server
- Check no other Node.js process is running

### Error: "Cannot find module 'better-sqlite3'"

**Solution**:
```bash
cd backend
npm install
```

### Database file not created

**Solution**:
```bash
# Make sure db directory exists
mkdir -p backend/db

# Run seed
npm run seed
```

### Foreign key constraint failed

**Solution**:
- Make sure foreign keys are enabled (already done in connection.js)
- Check category_id exists before inserting products

---

## 📚 Learn More

- **better-sqlite3 Docs**: https://github.com/WiseLibs/better-sqlite3/blob/master/docs/api.md
- **SQLite Official**: https://www.sqlite.org/
- **DB Browser**: https://sqlitebrowser.org/
