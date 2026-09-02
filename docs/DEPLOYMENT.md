# Youth Opportunity Ecosystem - Deployment Guide

## Frontend Deployment (Vercel)

### Option 1: Automatic Deployment

1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Cliquez "Deploy"

### Option 2: Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
cd frontend
vercel
```

### Environment Variables (Frontend)

```
NEXT_PUBLIC_API_URL=https://api.yoe.ht/api
```

## Backend Deployment

### Option 1: Cloud Hosting (Render, Railway, Heroku)

#### Render

1. Créez un compte sur [Render](https://render.com)
2. Créez un nouveau Web Service
3. Connectez votre repository GitHub
4. Configurez:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
5. Ajoutez les variables d'environnement
6. Cliquez "Deploy"

#### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### Option 2: VPS/Dedicated Server

```bash
# SSH into server
ssh user@your_server.com

# Clone repository
git clone https://github.com/your-username/youth-opportunity-ecosystem.git
cd youth-opportunity-ecosystem/backend

# Install dependencies
npm install

# Build
npm run build

# Setup PM2 for process management
npm i -g pm2
pm2 start dist/index.js --name yoe-api

# Setup automatic restart on reboot
pm2 startup
pm2 save
```

### Environment Variables (Backend)

```env
NODE_ENV=production
PORT=5000
API_URL=https://api.yoe.ht
FRONTEND_URL=https://yoe.ht

# Database (use managed service like AWS RDS)
DATABASE_URL=postgresql://user:password@db.yoe.ht:5432/yoe_prod

# Redis (use managed service like Redis Cloud)
REDIS_URL=redis://username:password@redis.yoe.ht:6379

# JWT
JWT_SECRET=your-very-secure-random-secret-key
JWT_EXPIRES_IN=7d

# Email
EMAIL_FROM=noreply@yoe.ht
SENDGRID_API_KEY=your-sendgrid-api-key

# File Storage
FILE_STORAGE=s3
AWS_S3_BUCKET=yoe-uploads
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret

# Logging
LOG_LEVEL=info
```

## Database Setup

### PostgreSQL (AWS RDS)

1. Créez une RDS instance PostgreSQL sur AWS
2. Notez le connection string
3. Exécutez les migrations:

```bash
DATABASE_URL=postgresql://... npm run db:migrate
```

### Redis Setup

Ulisez Redis Cloud ou un service géré:

```
REDIS_URL=redis://username:password@host:port
```

## Domain & SSL

### Domain Setup

1. Achetez un domaine (ex: yoe.ht)
2. Configurez les DNS records:
   - **Frontend**: Vercel nameservers ou A record
   - **Backend**: Point vers Render/Railway/VPS

### SSL Certificate

- **Vercel**: Automatique
- **Render/Railway**: Automatique
- **VPS**: Utilisez Let's Encrypt avec Certbot

```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot certonly -d api.yoe.ht
```

## CI/CD Pipeline

### GitHub Actions

Créez `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          cd backend
          npm install
      
      - name: Run tests
        run: |
          cd backend
          npm run type-check
      
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK }}
```

## Monitoring & Logging

### Application Monitoring

- **Sentry** pour error tracking: https://sentry.io
- **New Relic** pour performance: https://newrelic.com
- **Datadog** pour comprehensive monitoring: https://www.datadoghq.com

### Log Aggregation

```bash
# Installer LogDNA ou Papertrail
npm install --save logdna
```

## Backup & Disaster Recovery

### Database Backups

```bash
# AWS RDS automatic backups (configured in console)
# Or manual backup:
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql
```

### File Storage Backups

- AWS S3 versioning activé
- Copies régulières vers backup bucket

## Performance Optimization

### Database

```sql
-- Indexes already created in schema
-- Monitor slow queries
ALTER DATABASE yoe_prod SET log_min_duration_statement = 5000;
```

### Caching

- Redis pour sessions & cache
- CDN pour assets frontend (Vercel)
- CloudFlare pour DDoS protection

## Security Checklist

- [ ] HTTPS only
- [ ] Environment variables sécurisées
- [ ] Database encryption at rest
- [ ] Regular security updates
- [ ] CORS properly configured
- [ ] Rate limiting activé
- [ ] Input validation & sanitization
- [ ] SQL injection protection (Prisma ORM)
- [ ] XSS protection headers
- [ ] Regular backups tested

## Post-Deployment Verification

```bash
# Health check
curl https://api.yoe.ht/health

# API test
curl -X POST https://api.yoe.ht/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@yoe.ht",
    "password": "testpass123",
    "firstName": "Test",
    "lastName": "User",
    "userType": "young"
  }'
```

## Troubleshooting

### 502 Bad Gateway

1. Vérifiez que le serveur backend est running
2. Vérifiez les logs: `pm2 logs yoe-api`
3. Vérifiez la connection database

### Database Connection Error

```bash
# Testez la connection
psql $DATABASE_URL -c "SELECT 1"
```

### High Memory Usage

1. Vérifiez les memory leaks
2. Augmentez la limite Node.js: `NODE_OPTIONS="--max-old-space-size=2048"`

## Maintenance

### Regular Tasks

- [ ] Vérifiez les logs
- [ ] Mettez à jour les dépendances
- [ ] Testez les backups
- [ ] Vérifiez les metrics de performance
- [ ] Nettoyez les données obsolètes

---

**For more help:** Consulter la [documentation officielle Vercel](https://vercel.com/docs) et [Render](https://render.com/docs)
