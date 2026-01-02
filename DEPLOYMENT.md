# Hostinger Deployment Guide - Business Plan

## Overview
Complete guide to deploy The Vines Trading Company website on Hostinger Business Plan with SQLite database.

---

## Prerequisites Checklist

- [ ] Hostinger Business Plan active
- [ ] Domain configured (optional)
- [ ] SSH access credentials from Hostinger
- [ ] FTP/SFTP credentials (backup method)
- [ ] Project code ready locally

---

## Part 1: Backend Deployment

### Step 1: Access Hostinger via SSH

```bash
ssh username@yourdomain.com
# Or use the SSH credentials from Hostinger hPanel
```

### Step 2: Upload Backend Files

**Option A: Using Git (Recommended)**
```bash
# On Hostinger server
cd ~
git clone https://github.com/ahmedabouessa/vines.git
cd vines/backend
```

**Option B: Using SFTP**
1. Use FileZilla or WinSCP
2. Upload entire `backend` folder to `~/vines/backend`
3. Upload `backend/db/vines_trading.sqlite` (your database file)

### Step 3: Install Dependencies

```bash
cd ~/vines/backend
npm install --production
```

### Step 4: Create Production Environment File

```bash
nano .env
```

Paste this content (update with your actual domain):
```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Database (SQLite - no configuration needed)
# Database file: ./db/vines_trading.sqlite

# CORS
FRONTEND_URL=https://yourdomain.com

# Admin Credentials
ADMIN_USERNAME=admin
ADMIN_PASSWORD=CHANGE_THIS_PASSWORD_NOW
```

Save (Ctrl+O, Enter, Ctrl+X)

### Step 5: Install PM2 (Process Manager)

```bash
npm install -g pm2
```

### Step 6: Start Backend with PM2

```bash
cd ~/vines/backend
pm2 start server.js --name vines-backend
pm2 save
pm2 startup
```

### Step 7: Verify Backend is Running

```bash
pm2 status
curl http://localhost:3000/api/categories
```

You should see JSON response with categories.

---

## Part 2: Frontend Deployment

### Step 1: Build Frontend Locally

On your local machine:

```bash
cd g:\trade\frontend

# Update .env with production API URL
echo "VITE_API_URL=https://yourdomain.com/api" > .env

# Build
npm run build
```

This creates `dist` folder with production files.

### Step 2: Upload Frontend to Hostinger

**Using FTP/SFTP:**
1. Open FileZilla
2. Connect to your Hostinger
3. Navigate to `public_html` folder
4. Upload all files from `frontend/dist` folder

**File structure should be:**
```
public_html/
├── index.html
├── assets/
│   ├── index-xxxxx.js
│   └── index-xxxxx.css
└── vite.svg
```

### Step 3: Configure Domain/Subdomain

**Option A: Main Domain**
- Frontend already served from `public_html`
- Configure proxy for `/api` requests to Node.js

**Option B: Subdomain**
- Create subdomain `api.yourdomain.com` for backend
- Update frontend `.env` with subdomain URL

---

## Part 3: Configure Reverse Proxy

To make `/api` requests work, add this to `.htaccess` in `public_html`:

```apache
# Enable Rewrite Engine
RewriteEngine On

# Proxy API requests to Node.js backend
RewriteCond %{REQUEST_URI} ^/api/(.*)$
RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]

# Frontend routing (SPA)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## Part 4: SSL Configuration

1. Go to Hostinger hPanel
2. Navigate to **SSL** section
3. Enable **Free Let's Encrypt SSL**
4. Wait 10-15 minutes for activation
5. Update frontend `.env`:
   ```
   VITE_API_URL=https://yourdomain.com/api
   ```
6. Rebuild and re-upload frontend

---

## Part 5: Post-Deployment Verification

### Test Checklist

- [ ] Visit `https://yourdomain.com` - Frontend loads
- [ ] Homepage displays products
- [ ] Category filtering works
- [ ] Search functionality works
- [ ] Admin login works (`/admin`)
- [ ] Can create/edit/delete products
- [ ] Can create/edit/delete categories
- [ ] Images upload correctly
- [ ] Database persists after server restart

### Test API Endpoints

```bash
# Get categories
curl https://yourdomain.com/api/categories

# Get products
curl https://yourdomain.com/api/products

# Search products
curl https://yourdomain.com/api/products?search=chocolate
```

---

## Part 6: Maintenance

### View Backend Logs

```bash
pm2 logs vines-backend
```

### Restart Backend

```bash
pm2 restart vines-backend
```

### Update Backend Code

```bash
cd ~/vines/backend
git pull  # If using Git
pm2 restart vines-backend
```

### Backup Database

```bash
# Download via SFTP
# Or create backup:
cp ~/vines/backend/db/vines_trading.sqlite ~/backup_$(date +%Y%m%d).sqlite
```

### Update Frontend

1. Build locally with new changes
2. Upload `dist` folder contents to `public_html`
3. Clear browser cache

---

## Troubleshooting

### Issue: Backend not accessible

**Check:**
```bash
pm2 status
pm2 logs vines-backend --lines 50
```

**Restart:**
```bash
pm2 restart vines-backend
```

### Issue: API requests fail (CORS error)

**Fix:** Update `backend/.env`:
```env
FRONTEND_URL=https://yourdomain.com
```
Then restart:
```bash
pm2 restart vines-backend
```

### Issue: Database not saving changes

**Check permissions:**
```bash
cd ~/vines/backend/db
ls -la vines_trading.sqlite
chmod 664 vines_trading.sqlite
```

### Issue: 404 on refresh (Frontend routing)

**Check `.htaccess`** in `public_html` has SPA rewrite rules

### Issue: PM2 process stops after reboot

**Enable startup:**
```bash
pm2 startup
pm2 save
```

---

## Security Checklist

- [ ] Changed default admin password
- [ ] HTTPS/SSL enabled
- [ ] `.env` file has secure credentials
- [ ] Database file has correct permissions (not world-readable)
- [ ] Git repository doesn't contain `.env` or `.sqlite` files
- [ ] Admin panel uses strong password
- [ ] Regular backups scheduled

---

## Performance Optimization

### Enable Gzip Compression

Add to `.htaccess`:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### Enable Browser Caching

Add to `.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>
```

---

## Quick Reference Commands

```bash
# View PM2 status
pm2 status

# View logs
pm2 logs vines-backend

# Restart backend
pm2 restart vines-backend

# Stop backend
pm2 stop vines-backend

# Monitor resources
pm2 monit

# Backup database
cp ~/vines/backend/db/vines_trading.sqlite ~/backup.sqlite
```

---

## Support

If you encounter issues:
1. Check PM2 logs: `pm2 logs vines-backend`
2. Check Apache logs in Hostinger hPanel
3. Test API directly: `curl http://localhost:3000/api/categories`
4. Contact Hostinger support for server-related issues

---

## Next Steps After Deployment

1. Test all functionality thoroughly
2. Set up regular database backups
3. Monitor server resources in Hostinger hPanel
4. Consider adding monitoring (e.g., UptimeRobot)
5. Document any custom configuration changes
