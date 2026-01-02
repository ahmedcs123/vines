# Quick Deployment Checklist

## Before Deployment

### 1. Prepare Environment Files

**Backend (`backend/.env`):**
```env
PORT=3000
NODE_ENV=production
FRONTEND_URL=https://yourdomain.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YOUR_SECURE_PASSWORD
```

**Frontend (`frontend/.env`):**
```env
VITE_API_URL=https://yourdomain.com/api
```

### 2. Build Frontend

```bash
cd frontend
npm run build
```

This creates `dist/` folder with production files.

### 3. Files to Upload

**Backend Files:**
- All files in `backend/` folder
- Include `backend/db/vines_trading.sqlite`
- Include `backend/.env` (create from template above)

**Frontend Files:**
- All files from `frontend/dist/` folder
- Include `frontend/.htaccess`

---

## Deployment Steps (Hostinger)

### Step 1: Upload Backend via SSH

```bash
# Connect via SSH
ssh username@yourdomain.com

# Navigate to home
cd ~

# Upload via Git or SFTP
# If using Git:
git clone https://github.com/ahmedabouessa/vines.git
cd vines/backend

# Install dependencies
npm install --production

# Install PM2 globally
npm install -g pm2

# Start application
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

### Step 2: Upload Frontend via FTP

1. Build frontend locally
2. Connect to Hostinger via FTP (FileZilla)
3. Navigate to `public_html/`
4. Upload all files from `frontend/dist/`
5. Upload `frontend/.htaccess` to `public_html/`

### Step 3: Verify

- Visit: `https://yourdomain.com`
- Test admin: `https://yourdomain.com/admin`
- Check API: `https://yourdomain.com/api/products`

---

## Important Files Created

| File | Location | Purpose |
|------|----------|---------|
| `DEPLOYMENT.md` | `/` | Full deployment guide |
| `ecosystem.config.cjs` | `/backend/` | PM2 configuration |
| `.htaccess` | `/frontend/` | Apache config for SPA |

---

## After Deployment

1. Change admin password immediately
2. Test all features
3. Set up database backup schedule
4. Monitor PM2 logs: `pm2 logs vines-backend`

---

## Need Help?

Read `DEPLOYMENT.md` for complete step-by-step instructions.
