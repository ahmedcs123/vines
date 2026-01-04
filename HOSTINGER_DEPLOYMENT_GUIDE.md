# Hostinger Deployment Guide - Complete Step-by-Step

**Project:** The Vines Trading Company  
**Stack:** Node.js + Express + SQLite (Backend) + React + Vite (Frontend)  
**Hosting:** Hostinger Business Plan

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Pre-Deployment Preparation](#pre-deployment-preparation)
3. [Backend Deployment](#backend-deployment)
4. [Frontend Deployment](#frontend-deployment)
5. [Domain & SSL Configuration](#domain--ssl-configuration)
6. [Testing & Verification](#testing--verification)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance & Updates](#maintenance--updates)

---

## Prerequisites

### What You Need

- ✅ **Hostinger Business Plan** (active subscription)
- ✅ **Domain name** (configured in Hostinger)
- ✅ **SSH access** enabled in hPanel
- ✅ **FTP/SFTP credentials** from Hostinger
- ✅ **FileZilla** or similar FTP client installed
- ✅ **Git** (optional, but recommended)
- ✅ **Node.js 18+** installed locally

### Get Hostinger Credentials

1. **Login to Hostinger hPanel:** https://hpanel.hostinger.com
2. **Get SSH Credentials:**
   - Go to: **Advanced** → **SSH Access**
   - Note down:
     - SSH Username
     - SSH Port (usually 22 or 65002)
     - Server IP or hostname
   - If SSH is disabled, enable it

3. **Get FTP Credentials:**
   - Go to: **Files** → **FTP Accounts**
   - Note down:
     - FTP Host
     - FTP Username
     - FTP Password
     - FTP Port (21)

---

## Pre-Deployment Preparation

### Step 1: Test Project Locally

**Verify everything works before deploying:**

```bash
# Test Backend
cd g:\trade\backend
npm install
npm start
# Should run on http://localhost:9080

# Test Frontend (in new terminal)
cd g:\trade\frontend
npm install
npm run dev
# Should run on http://localhost:4000
```

**Test these features:**
- ✅ Products display correctly
- ✅ Categories work
- ✅ Search functionality
- ✅ Admin login works
- ✅ Creating/editing products
- ✅ Image uploads

---

### Step 2: Prepare Production Environment Files

#### Backend Environment File

**Create: `g:\trade\backend\.env.production`**

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# Database (SQLite)
# Database file: ./db/vines_trading.sqlite

# CORS - UPDATE WITH YOUR DOMAIN
FRONTEND_URL=https://yourdomain.com

# Admin Credentials - CHANGE THESE!
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!

# Optional: Session Secret
SESSION_SECRET=generate-a-random-string-here
```

> [!IMPORTANT]
> Replace `yourdomain.com` with your actual domain name!  
> Change the admin password to something secure!

---

#### Frontend Environment File

**Create: `g:\trade\frontend\.env.production`**

```env
# API URL - UPDATE WITH YOUR DOMAIN
VITE_API_URL=https://yourdomain.com/api
```

> [!IMPORTANT]
> Replace `yourdomain.com` with your actual domain name!

---

### Step 3: Build Frontend for Production

```bash
# Navigate to frontend
cd g:\trade\frontend

# Copy production env file
copy .env.production .env

# Install dependencies (if not already done)
npm install

# Build for production
npm run build
```

**Expected Output:**
```
✓ built in 15.23s
dist/index.html                   0.89 kB
dist/assets/index-abc123.css     45.32 kB
dist/assets/index-xyz789.js     156.78 kB
```

**Verify the `dist` folder was created:**
```
frontend/
└── dist/
    ├── index.html
    ├── assets/
    │   ├── index-[hash].css
    │   └── index-[hash].js
    └── vite.svg
```

✅ **Frontend is ready for deployment!**

---

### Step 4: Prepare Backend Files

**Create a deployment package:**

1. Copy `.env.production` to `.env`:
   ```bash
   cd g:\trade\backend
   copy .env.production .env
   ```

2. **Install production dependencies:**
   ```bash
   npm install --production
   ```

3. **Verify database exists:**
   ```
   backend/db/vines_trading.sqlite  ← Should exist and contain data
   ```

✅ **Backend is ready for deployment!**

---

## Backend Deployment

### Method 1: Deploy via SSH + Git (Recommended)

#### Step 1: Connect to Hostinger via SSH

**Windows (PowerShell or Command Prompt):**
```bash
ssh username@yourdomain.com -p 65002
# Or use the SSH details from hPanel
```

**Alternative:** Use **PuTTY** if you prefer a GUI:
- Host: `yourdomain.com`
- Port: `65002` (or as specified)
- Username: Your SSH username
- Password: Your SSH password

---

#### Step 2: Check Node.js Version

```bash
node --version
npm --version
```

**Required:** Node.js 18+ and npm 9+

If not installed or version is old:
```bash
# Install NVM (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc

# Install Node.js 18
nvm install 18
nvm use 18
```

---

#### Step 3: Clone Your Repository

**Option A: If your code is on GitHub:**
```bash
cd ~
git clone https://github.com/ahmedabouessa/vines.git
cd vines/backend
```

**Option B: If not using Git, skip to Method 2 (SFTP Upload)**

---

#### Step 4: Install Dependencies

```bash
cd ~/vines/backend
npm install --production
```

This will install all required packages.

---

#### Step 5: Create Production Environment File

```bash
nano .env
```

**Paste this (update with your actual domain and password):**
```env
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!
```

**Save and exit:**
- Press `Ctrl + O` (save)
- Press `Enter` (confirm)
- Press `Ctrl + X` (exit)

---

#### Step 6: Install PM2 (Process Manager)

```bash
npm install -g pm2
```

PM2 will keep your Node.js app running 24/7.

---

#### Step 7: Create Logs Directory

```bash
mkdir -p ~/vines/backend/logs
```

---

#### Step 8: Start Backend with PM2

**Using the ecosystem config file:**
```bash
cd ~/vines/backend
pm2 start ecosystem.config.cjs
```

**Or start manually:**
```bash
pm2 start server.js --name vines-backend
```

---

#### Step 9: Save PM2 Configuration

```bash
pm2 save
pm2 startup
```

**Copy the command it outputs and run it.** It looks like:
```bash
sudo env PATH=$PATH:/usr/bin pm2 startup systemd -u username --hp /home/username
```

This ensures your app auto-starts after server reboots.

---

#### Step 10: Verify Backend is Running

```bash
# Check PM2 status
pm2 status

# Should show:
# ┌─────┬──────────────────┬─────────┬─────────┬─────────┐
# │ id  │ name             │ status  │ restart │ uptime  │
# ├─────┼──────────────────┼─────────┼─────────┼─────────┤
# │ 0   │ vines-backend    │ online  │ 0       │ 5s      │
# └─────┴──────────────────┴─────────┴─────────┴─────────┘
```

**Test the API:**
```bash
curl http://localhost:3000/api/categories
```

**Expected:** JSON response with categories.

✅ **Backend is now running on port 3000!**

---

### Method 2: Deploy via SFTP (Alternative)

If you can't use Git or SSH commands, use this method:

#### Step 1: Connect with FileZilla

1. Open **FileZilla**
2. Enter credentials:
   - Host: `sftp://yourdomain.com` or IP from hPanel
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: `21` or `22` (for SFTP)
3. Click **Quickconnect**

---

#### Step 2: Upload Backend Files

1. **On Remote (right panel):**
   - Navigate to your home directory (usually `/home/username/`)
   - Create folder: `vines`
   - Enter the `vines` folder
   - Create folder: `backend`

2. **On Local (left panel):**
   - Navigate to: `g:\trade\backend`
   - Select ALL files and folders
   - Right-click → **Upload**

**Upload these important items:**
- ✅ `server.js`
- ✅ `package.json`
- ✅ `ecosystem.config.cjs`
- ✅ `.env` (your production env file)
- ✅ `routes/` folder
- ✅ `db/` folder (including `vines_trading.sqlite`)
- ✅ `uploads/` folder
- ✅ `scripts/` folder

> [!WARNING]
> Do NOT upload `node_modules/` - you'll install dependencies on the server.

---

#### Step 3: SSH and Install Dependencies

```bash
ssh username@yourdomain.com -p 65002
cd ~/vines/backend
npm install --production
```

Then continue from **Backend Deployment → Step 6** above.

---

## Frontend Deployment

### Step 1: Connect to Hostinger via FTP

1. Open **FileZilla**
2. Connect using FTP credentials
3. **Navigate to `public_html` folder** on the remote server (right panel)

---

### Step 2: Clear Existing Files (if any)

**⚠️ IMPORTANT:** If `public_html` has old files, delete them first.

**Keep these if they exist:**
- `.htaccess` (if you have custom rules)
- `cgi-bin/` folder
- `.well-known/` folder (for SSL)

**Delete everything else** in `public_html/`

---

### Step 3: Upload Frontend Files

1. **On Local (left panel):**
   - Navigate to: `g:\trade\frontend\dist`
   
2. **Select all files and folders:**
   - `index.html`
   - `assets/` folder
   - `vite.svg`
   - Any other files in `dist/`

3. **Drag and drop to `public_html/`** (right panel)

**Wait for upload to complete.**

---

### Step 4: Upload .htaccess

1. **Navigate to:** `g:\trade\frontend\.htaccess` (local)
2. **Upload to:** `public_html/.htaccess` (remote)

> [!IMPORTANT]
> The `.htaccess` file is crucial for:
> - Proxying API requests to backend
> - SPA routing (React Router)
> - Gzip compression
> - Browser caching

---

### Step 5: Verify File Structure

**Your `public_html` should look like:**
```
public_html/
├── .htaccess          ← Very important!
├── index.html
├── vite.svg
└── assets/
    ├── index-abc123.css
    └── index-xyz789.js
```

✅ **Frontend is deployed!**

---

## Domain & SSL Configuration

### Step 1: Point Domain to Hostinger

**If domain is not on Hostinger:**

1. Login to your **domain registrar** (GoDaddy, Namecheap, etc.)
2. Update **nameservers** to:
   ```
   ns1.dns-parking.com
   ns2.dns-parking.com
   ```
   *(or the nameservers provided by Hostinger)*

3. Wait 24-48 hours for DNS propagation

---

### Step 2: Add Domain in hPanel

1. Login to **Hostinger hPanel**
2. Go to: **Domains**
3. Click **Add Domain**
4. Enter your domain: `yourdomain.com`
5. Point to: `public_html`
6. Click **Add Domain**

---

### Step 3: Enable SSL Certificate

1. In **hPanel**, go to: **SSL**
2. Find your domain
3. Click **Install SSL** or **Manage**
4. Select **Free SSL (Let's Encrypt)**
5. Click **Install**

**Wait 10-15 minutes** for SSL to activate.

---

### Step 4: Verify HTTPS Works

Visit: `https://yourdomain.com`

**Should show:** 🔒 Secure connection

If not working, wait longer or check Hostinger support.

---

### Step 5: Update Backend CORS

**This is crucial for API to work!**

```bash
# SSH into server
ssh username@yourdomain.com -p 65002

# Edit .env
cd ~/vines/backend
nano .env
```

**Update this line:**
```env
FRONTEND_URL=https://yourdomain.com
```

**Save and restart:**
```bash
pm2 restart vines-backend
```

---

## Testing & Verification

### ✅ Complete Testing Checklist

**Visit your website:** `https://yourdomain.com`

#### Frontend Tests

- [ ] **Homepage loads** without errors
- [ ] **Products display** correctly
- [ ] **Categories filter** works
- [ ] **Search functionality** works
- [ ] **Language switching** (EN ↔ AR) works
- [ ] **Product details** page works
- [ ] **Images load** correctly
- [ ] **Responsive design** works on mobile

#### Backend Tests

- [ ] Visit: `https://yourdomain.com/api/categories`
  - Should show: JSON with categories
- [ ] Visit: `https://yourdomain.com/api/products`
  - Should show: JSON with products

#### Admin Panel Tests

- [ ] Visit: `https://yourdomain.com/admin`
- [ ] **Login works** with admin credentials
- [ ] **Can view dashboard**
- [ ] **Can add new product**
- [ ] **Can edit product**
- [ ] **Can delete product**
- [ ] **Can add category**
- [ ] **Can upload images**
- [ ] **Database persists changes**

---

### Test API Endpoints

```bash
# Test Categories
curl https://yourdomain.com/api/categories

# Test Products
curl https://yourdomain.com/api/products

# Test Search
curl https://yourdomain.com/api/products?search=chocolate

# Test Single Product
curl https://yourdomain.com/api/products/1
```

---

### Check Backend Status

```bash
ssh username@yourdomain.com -p 65002
pm2 status
pm2 logs vines-backend --lines 50
```

---

## Troubleshooting

### ❌ Issue: Website shows "500 Internal Server Error"

**Solution:**

1. Check `.htaccess` syntax:
   ```bash
   # Via SSH
   cd ~/public_html
   cat .htaccess
   ```

2. Check Apache error logs in **hPanel**:
   - Go to: **Advanced** → **Error Logs**

3. Verify `.htaccess` has the correct proxy rule:
   ```apache
   RewriteCond %{REQUEST_URI} ^/api/(.*)$
   RewriteRule ^api/(.*)$ http://localhost:3000/api/$1 [P,L]
   ```

---

### ❌ Issue: API requests return 404

**Possible causes:**

1. **Backend not running:**
   ```bash
   ssh username@yourdomain.com -p 65002
   pm2 status
   # If offline:
   pm2 restart vines-backend
   ```

2. **Wrong port in .htaccess:**
   - Verify backend runs on port `3000`
   - Check `.htaccess` proxies to `localhost:3000`

3. **CORS error:**
   ```bash
   cd ~/vines/backend
   nano .env
   # Ensure: FRONTEND_URL=https://yourdomain.com
   pm2 restart vines-backend
   ```

---

### ❌ Issue: CORS Error in Browser Console

**Error:** `Access to fetch at 'https://yourdomain.com/api/products' has been blocked by CORS policy`

**Solution:**

```bash
ssh username@yourdomain.com -p 65002
cd ~/vines/backend
nano .env
```

**Ensure this line matches your domain:**
```env
FRONTEND_URL=https://yourdomain.com
```

**Restart:**
```bash
pm2 restart vines-backend
```

---

### ❌ Issue: Images not displaying

**Solution:**

1. **Check uploads folder exists:**
   ```bash
   cd ~/vines/backend
   ls -la uploads/
   ```

2. **Check permissions:**
   ```bash
   chmod 755 uploads/
   chmod 644 uploads/*
   ```

3. **Verify image URLs** in browser DevTools Network tab

---

### ❌ Issue: Database changes not saving

**Solution:**

1. **Check database permissions:**
   ```bash
   cd ~/vines/backend/db
   ls -la vines_trading.sqlite
   chmod 664 vines_trading.sqlite
   ```

2. **Check PM2 logs for errors:**
   ```bash
   pm2 logs vines-backend --lines 100
   ```

---

### ❌ Issue: Frontend shows blank page

**Solution:**

1. **Check browser console** (F12) for errors

2. **Verify API URL in frontend:**
   - Should be: `https://yourdomain.com/api`
   - NOT: `http://localhost:3000/api`

3. **Rebuild frontend:**
   ```bash
   # On local machine
   cd g:\trade\frontend
   echo "VITE_API_URL=https://yourdomain.com/api" > .env
   npm run build
   # Re-upload dist/ to public_html/
   ```

---

### ❌ Issue: 404 on page refresh

**Example:** Visit `/admin` → works, refresh → 404

**Solution:**

Ensure `.htaccess` has SPA routing rule:
```apache
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

### ❌ Issue: PM2 process stops after server reboot

**Solution:**

```bash
ssh username@yourdomain.com -p 65002
cd ~/vines/backend
pm2 startup
pm2 save
```

Run the `sudo` command it outputs.

---

## Maintenance & Updates

### View Backend Logs

```bash
ssh username@yourdomain.com -p 65002
pm2 logs vines-backend

# Last 100 lines
pm2 logs vines-backend --lines 100

# Follow live logs
pm2 logs vines-backend --lines 0
```

---

### Restart Backend

```bash
pm2 restart vines-backend
```

---

### Update Backend Code

**If using Git:**
```bash
ssh username@yourdomain.com -p 65002
cd ~/vines/backend
git pull origin main
npm install --production
pm2 restart vines-backend
```

**If using SFTP:**
1. Upload changed files via FileZilla
2. SSH and restart: `pm2 restart vines-backend`

---

### Update Frontend

**On local machine:**
```bash
cd g:\trade\frontend

# Make your changes...

# Build
npm run build

# Upload dist/ to public_html/ via FileZilla
```

**Clear browser cache:** `Ctrl + Shift + R`

---

### Backup Database

**Download via SFTP:**
1. Open FileZilla
2. Download: `~/vines/backend/db/vines_trading.sqlite`
3. Save locally with date: `vines_backup_2026-01-04.sqlite`

**Or via SSH:**
```bash
ssh username@yourdomain.com -p 65002
cd ~/vines/backend/db
cp vines_trading.sqlite ~/vines_backup_$(date +%Y%m%d).sqlite

# Download with SFTP or:
scp -P 65002 username@yourdomain.com:~/vines_backup_20260104.sqlite ./
```

**Recommended:** Backup weekly or before major changes.

---

### Monitor Resources

```bash
# SSH
pm2 monit

# Shows:
# - CPU usage
# - Memory usage
# - Logs in real-time
```

**Or check in hPanel:**
- **Advanced** → **Resource Usage**

---

## Security Best Practices

### ✅ Security Checklist

- [ ] **Change admin password** from default
- [ ] **HTTPS/SSL** enabled (green lock 🔒)
- [ ] **`.env` file** contains strong passwords
- [ ] **Database file** has correct permissions (`chmod 664`)
- [ ] **`.env` and `.sqlite`** NOT in Git repository
- [ ] **Regular backups** scheduled
- [ ] **PM2 startup** configured (auto-restart)
- [ ] **Security headers** enabled in `.htaccess`

---

### Change Admin Password

**Option 1: Via UI**
1. Login to admin panel
2. Go to settings (if available)
3. Change password

**Option 2: Via Environment File**
```bash
ssh username@yourdomain.com -p 65002
cd ~/vines/backend
nano .env
# Update ADMIN_PASSWORD
pm2 restart vines-backend
```

---

### Enable Security Headers

Already included in `.htaccess`:
```apache
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set X-XSS-Protection "1; mode=block"
</IfModule>
```

---

## Performance Optimization

### Already Configured ✅

Your `.htaccess` includes:
- ✅ **Gzip Compression** (reduces file sizes by 70%)
- ✅ **Browser Caching** (faster repeat visits)
- ✅ **Security Headers** (protects against attacks)

---

### Monitor Performance

**Tools:**
- **Google PageSpeed Insights:** https://pagespeed.web.dev/
- **GTmetrix:** https://gtmetrix.com/
- **Pingdom:** https://tools.pingdom.com/

**Target:**
- Load time: < 3 seconds
- PageSpeed score: > 90

---

## Quick Reference

### Essential Commands

```bash
# SSH Login
ssh username@yourdomain.com -p 65002

# Check PM2 status
pm2 status

# View logs
pm2 logs vines-backend

# Restart backend
pm2 restart vines-backend

# Stop backend
pm2 stop vines-backend

# Start backend
pm2 start vines-backend

# Monitor resources
pm2 monit

# Backup database
cp ~/vines/backend/db/vines_trading.sqlite ~/backup_$(date +%Y%m%d).sqlite
```

---

### File Locations

| Item | Location |
|------|----------|
| **Frontend** | `~/public_html/` |
| **Backend** | `~/vines/backend/` |
| **Database** | `~/vines/backend/db/vines_trading.sqlite` |
| **PM2 Config** | `~/vines/backend/ecosystem.config.cjs` |
| **Backend Env** | `~/vines/backend/.env` |
| **Logs** | `~/vines/backend/logs/` |
| **Apache Config** | `~/public_html/.htaccess` |

---

### Important URLs

| Description | URL |
|-------------|-----|
| **Homepage** | `https://yourdomain.com` |
| **Admin Panel** | `https://yourdomain.com/admin` |
| **API Categories** | `https://yourdomain.com/api/categories` |
| **API Products** | `https://yourdomain.com/api/products` |
| **Hostinger hPanel** | `https://hpanel.hostinger.com` |

---

## Need Help?

### Common Resources

1. **PM2 Logs:**
   ```bash
   pm2 logs vines-backend --lines 100
   ```

2. **Apache Error Logs:**
   - hPanel → **Advanced** → **Error Logs**

3. **Test API Directly:**
   ```bash
   curl http://localhost:3000/api/categories
   ```

4. **Hostinger Support:**
   - Live Chat in hPanel
   - Submit ticket: https://www.hostinger.com/support

---

## Deployment Summary

### ✅ What We Deployed

1. **Backend (Node.js + Express)**
   - Location: `~/vines/backend/`
   - Running on: Port 3000
   - Process Manager: PM2
   - Database: SQLite (`vines_trading.sqlite`)

2. **Frontend (React + Vite)**
   - Location: `~/public_html/`
   - Served by: Apache
   - Built files: HTML, CSS, JS
   - Routing: `.htaccess` (SPA support)

3. **API Proxy**
   - Requests to `/api/*` → proxied to `localhost:3000`
   - Configured in: `.htaccess`

4. **SSL/HTTPS**
   - Free Let's Encrypt certificate
   - Auto-renewal enabled

---

## Next Steps

1. ✅ **Test thoroughly** - Use the testing checklist above
2. ✅ **Change admin password**
3. ✅ **Set up weekly database backups**
4. ✅ **Monitor server resources** in hPanel
5. ✅ **Add uptime monitoring** (e.g., UptimeRobot)
6. ✅ **Document any custom changes**
7. ✅ **Share website with users!** 🎉

---

## Congratulations! 🎉

Your website is now **LIVE** on Hostinger!

**Visit:** `https://yourdomain.com`

If you encounter any issues, refer to the [Troubleshooting](#troubleshooting) section above or check the PM2 logs.

---

*Last Updated: 2026-01-04*  
*Generated for: The Vines Trading Company*
