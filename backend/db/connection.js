import initSqlJs from 'sql.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SQLite database path
const dbPath = path.join(__dirname, 'vines_trading.sqlite');

let db = null;
let SQL = null;

// Initialize database
async function initDatabase() {
  try {
    SQL = await initSqlJs();

    // Load existing database or create new one
    if (fs.existsSync(dbPath)) {
      const buffer = fs.readFileSync(dbPath);
      db = new SQL.Database(buffer);
      console.log('✅ Connected to existing SQLite database');
    } else {
      db = new SQL.Database();
      console.log('✅ Created new SQLite database');
    }

    console.log(`📁 Database: ${dbPath}`);

    // Enable foreign keys
    db.run('PRAGMA foreign_keys = ON');

  } catch (err) {
    console.error('❌ Failed to initialize SQLite database:', err);
    process.exit(-1);
  }
}

// Save database to file
function saveDatabase() {
  if (db) {
    const data = db.export();
    const buffer = Buffer.from(data);
    fs.writeFileSync(dbPath, buffer);
  }
}

// Initialize database on import
await initDatabase();

// Auto-save on process exit
process.on('exit', saveDatabase);
process.on('SIGINT', () => {
  saveDatabase();
  process.exit(0);
});

export { db, saveDatabase };
