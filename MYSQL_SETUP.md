# MySQL Database Setup Guide

## Local Development Setup

### Windows

1. **Download MySQL**
   - Download MySQL Community Server from [mysql.com/downloads](https://dev.mysql.com/downloads/mysql/)
   - Or use XAMPP which includes MySQL: [apachefriends.org](https://www.apachefriends.org/)

2. **Install MySQL**
   ```powershell
   # If using MySQL installer, follow the GUI
   # If using XAMPP, start MySQL from XAMPP Control Panel
   ```

3. **Create Database**
   ```bash
   # Open MySQL command line or use phpMyAdmin (if using XAMPP)
   mysql -u root -p
   ```
   
   ```sql
   CREATE DATABASE vines_trading CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

4. **Run Schema**
   ```bash
   # From project root
   cd g:\trade\backend
   mysql -u root -p vines_trading < db/schema.sql
   ```

5. **Configure Environment**
   ```bash
   # Copy .env.example to .env
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=vines_trading
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   ```

6. **Install Dependencies**
   ```bash
   npm install
   ```

7. **Seed Database**
   ```bash
   npm run seed
   ```

8. **Start Server**
   ```bash
   npm run dev
   ```

---

## Hostinger Deployment Setup

### Step 1: Create MySQL Database

1. Log in to **Hostinger hPanel**
2. Go to **Databases** → **MySQL Databases**
3. Click **Create New Database**
   - Database Name: `u123456789_vines` (or similar)
   - Username: Create a new user or use existing
   - Password: Set a strong password
   - Click **Create**

### Step 2: Import Database Schema

1. In hPanel, click **phpMyAdmin** next to your database
2. Select your database from the left sidebar
3. Click **Import** tab
4. Choose file: Upload `backend/db/schema.sql`
5. Click **Go** to execute

### Step 3: Upload Project Files

**Option A: Using File Manager**
1. In hPanel, go to **Files** → **File Manager**
2. Navigate to `public_html` or your domain folder
3. Create folders: `backend` and `frontend`
4. Upload backend files to `/backend`
5. Upload frontend build files to `/frontend/dist`

**Option B: Using FTP/SFTP**
```bash
# Use FileZilla or similar FTP client
# Connect using credentials from hPanel → FTP Accounts
```

**Option C: Using Git (if available)**
```bash
# SSH into your hosting
git clone https://github.com/ahmedabouessa/vines.git
```

### Step 4: Configure Environment Variables

1. Navigate to `backend` folder
2. Create `.env` file with:
   ```env
   PORT=5000
   NODE_ENV=production
   
   # MySQL Database (from Hostinger phpMyAdmin)
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=u123456789_vines
   DB_USER=u123456789_vines_user
   DB_PASSWORD=your_hostinger_db_password
   
   # CORS
   FRONTEND_URL=https://yourdomain.com
   
   # Admin Credentials
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=your_secure_password
   ```

### Step 5: Install Node.js Dependencies

```bash
# SSH into your hosting
cd ~/public_html/backend
npm install --production
```

### Step 6: Seed Database

```bash
cd ~/public_html/backend
npm run seed
```

### Step 7: Configure Node.js Application

1. In hPanel, go to **Advanced** → **Node.js**
2. Click **Create Application**
   - Node.js version: 18.x or higher
   - Application mode: Production
   - Application root: `/public_html/backend`
   - Application startup file: `server.js`
   - Click **Create**

### Step 8: Setup Frontend

1. Build the frontend locally:
   ```bash
   cd g:\trade\frontend
   npm run build
   ```

2. Upload `dist` folder contents to:
   - `/public_html` (for main domain)
   - Or `/public_html/subdomain` (for subdomain)

### Step 9: Configure Domain

**Option A: Separate Domains**
- Frontend: `yourdomain.com` → points to `/public_html/frontend/dist`
- Backend: `api.yourdomain.com` → points to Node.js app on port 5000

**Option B: Same Domain**
- Frontend: `yourdomain.com` → `/public_html`
- Backend: `yourdomain.com/api` → Proxy to Node.js app

Add to `.htaccess`:
```apache
# Proxy API requests to Node.js
RewriteEngine On
RewriteRule ^api/(.*)$ http://localhost:5000/api/$1 [P,L]
```

---

## Verification Steps

### 1. Test Database Connection

```bash
# SSH into hosting
cd ~/public_html/backend
node -e "import('./db/connection.js')"
```

Expected: `✅ Connected to MySQL database`

### 2. Test API Endpoints

```bash
curl https://yourdomain.com/api/products
curl https://yourdomain.com/api/categories
```

### 3. Test Frontend

Visit `https://yourdomain.com` and verify:
- Products load correctly
- Category filtering works
- Search functionality works
- Admin panel accessible

---

## Common Issues & Solutions

### Issue: "Access denied for user"
**Solution:** Check database credentials in `.env` match phpMyAdmin

### Issue: "Can't connect to MySQL server"
**Solution:** Use `localhost` as DB_HOST, not `127.0.0.1`

### Issue: "Table doesn't exist"
**Solution:** Re-import schema.sql via phpMyAdmin

### Issue: "CORS errors"
**Solution:** Update `FRONTEND_URL` in backend `.env` to match your domain

### Issue: Node.js app not starting
**Solution:** Check Node.js version (must be 18+), verify `server.js` path

---

## Database Backup

### Create Backup
```bash
# Via SSH
mysqldump -u username -p database_name > backup.sql

# Or use phpMyAdmin → Export
```

### Restore Backup
```bash
# Via SSH
mysql -u username -p database_name < backup.sql

# Or use phpMyAdmin → Import
```

---

## Performance Tips

1. **Enable MySQL Query Cache** (via phpMyAdmin)
2. **Use Connection Pooling** (already configured in `connection.js`)
3. **Add Indexes** for frequently queried fields
4. **Enable Gzip Compression** in hosting settings
5. **Use CDN** for static assets

---

## Security Checklist

- [ ] Change default admin password in `.env`
- [ ] Use strong MySQL password
- [ ] Restrict database access to localhost only
- [ ] Enable HTTPS/SSL on Hostinger
- [ ] Never commit `.env` file to Git
- [ ] Keep dependencies updated: `npm audit fix`
- [ ] Implement rate limiting for API endpoints
- [ ] Validate all user inputs in backend routes
