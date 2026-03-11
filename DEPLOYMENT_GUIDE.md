# Deployment Guide - Ramayan Tours and Travels 🚀

## **Quick Deployment Options**

### **Option 1: Vercel (Recommended - 5 minutes)**
```bash
# 1. Push to GitHub
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Connect to Vercel
# - Go to vercel.com
# - Import your GitHub repository
# - Configure environment variables
# - Deploy!
```

### **Option 2: Docker Deployment (10 minutes)**
```bash
# 1. Build Docker image
docker build -t ramayan-tours .

# 2. Run with environment
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e NEXTAUTH_SECRET="your-secret" \
  ramayan-tours
```

---

## **Environment Setup**

### **Required Environment Variables**

Create `.env.local` for production:

```env
# Database (Required)
DATABASE_URL="postgresql://user:pass@host:5432/dbname"

# Authentication (Required)
NEXTAUTH_SECRET="your-super-secret-key"
NEXTAUTH_URL="https://yourdomain.com"

# Optional Services
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
OPENAI_API_KEY="sk-your-openai-key"
```

### **Database Setup**

#### **PostgreSQL Configuration**

1. **Create Database**
```sql
CREATE DATABASE ramayan_tours;
CREATE USER ramayan_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE ramayan_tours TO ramayan_user;
```

2. **Run Migrations**
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

---

## **Vercel Deployment (Step-by-Step)**

### **1. Prepare Repository**
```bash
# Ensure all changes are committed
git status
git add .
git commit -m "Production ready"
git push
```

### **2. Vercel Setup**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure settings:
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### **3. Environment Variables**
In Vercel dashboard → Settings → Environment Variables:

```env
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=https://your-domain.vercel.app
```

### **4. Deploy**
- Click "Deploy"
- Wait for build completion
- Test the deployed application

---

## **Custom Domain Setup**

### **Vercel Custom Domain**
1. Go to Project Settings → Domains
2. Add your domain (e.g., `ramayantours.com`)
3. Update DNS records:
   ```
   A: 76.76.21.21
   CNAME: cname.vercel-dns.com
   ```

### **SSL Certificate**
- Vercel provides automatic SSL
- Certificate auto-renews
- HTTPS enforced by default

---

## **Database Hosting Options**

### **1. Supabase (Recommended)**
```bash
# Sign up at supabase.com
# Create new project
# Get connection string
# Update DATABASE_URL
```

### **2. Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and create database
railway login
railway new postgresql
railway variables set DATABASE_URL="..."
```

### **3. Neon**
```bash
# Sign up at neon.tech
# Create project
# Copy connection string
```

---

## **Production Optimizations**

### **Performance Settings**

#### **Next.js Configuration**
```javascript
// next.config.mjs
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
};
```

#### **Database Optimization**
```sql
-- Add indexes for performance
CREATE INDEX idx_destinations_category ON destinations(category);
CREATE INDEX idx_packages_featured ON packages(featured);
CREATE INDEX idx_bookings_status ON bookings(status);
```

### **Security Headers**
```javascript
// middleware.ts
import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const response = NextResponse.next();
  
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  return response;
}
```

---

## **Monitoring & Analytics**

### **Vercel Analytics**
1. Enable in Vercel dashboard
2. Add to your project
3. Monitor page views, speed, errors

### **Error Tracking**
```javascript
// Add to app/layout.tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

---

## **Backup Strategy**

### **Database Backups**
```bash
# Manual backup
pg_dump DATABASE_URL > backup_$(date +%Y%m%d).sql

# Automated backup (cron job)
0 2 * * * pg_dump DATABASE_URL > /backups/daily_$(date +\%Y\%m\%d).sql
```

### **Code Backups**
- Git repository (GitHub/GitLab)
- Vercel automatic deployments
- Local development environment

---

## **Scaling Considerations**

### **When to Scale**
- **Traffic**: >10,000 monthly visitors
- **Bookings**: >100 per day
- **Database**: >10,000 records

### **Scaling Options**

#### **Database Scaling**
```sql
-- Read replica for queries
CREATE DATABASE ramayan_tours_replica;
-- Configure application to use replica for reads
```

#### **Application Scaling**
- Vercel automatically scales
- Consider Edge functions for global distribution
- Implement caching strategies

---

## **Troubleshooting**

### **Common Issues**

#### **Build Errors**
```bash
# Clear build cache
rm -rf .next
npm run build
```

#### **Database Connection**
```bash
# Test connection
npx prisma db pull
```

#### **Environment Variables**
```bash
# Verify variables are set
echo $DATABASE_URL
```

### **Performance Issues**
1. Check Vercel Analytics
2. Optimize images (Next.js Image component)
3. Implement database indexes
4. Add caching headers

---

## **Maintenance Tasks**

### **Weekly**
- Update dependencies
- Check error logs
- Monitor performance metrics
- Backup database

### **Monthly**
- Security updates
- Feature testing
- User feedback review
- Performance optimization

### **Quarterly**
- Major dependency updates
- Security audit
- Scaling assessment
- Feature planning

---

## **Support Contacts**

### **Technical Support**
- **Email**: tech@ramayantours.com
- **Documentation**: Available in project
- **GitHub Issues**: For bug reports

### **Emergency Contacts**
- **Deployment Issues**: Contact hosting provider
- **Database Issues**: Contact database provider
- **Domain Issues**: Contact domain registrar

---

## **Post-Deployment Checklist**

### **✅ Functional Testing**
- [ ] Homepage loads correctly
- [ ] All navigation works
- [ ] Booking flow functional
- [ ] Admin panel accessible
- [ ] Forms submit properly

### **✅ Performance Testing**
- [ ] Page load speed <3 seconds
- [ ] Mobile responsive design
- [ ] Images load quickly
- [ ] No console errors

### **✅ Security Testing**
- [ ] HTTPS enforced
- [ ] Environment variables secure
- [ ] No sensitive data exposed
- [ ] Authentication working

### **✅ SEO & Analytics**
- [ ] Meta tags configured
- [ ] Sitemap generated
- [ ] Analytics tracking active
- [ ] Search console setup

---

**🎉 Your Ramayan Tours and Travels platform is now live and ready for business!**

For additional support or custom development, contact our technical team.
