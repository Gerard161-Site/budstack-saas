# BudStack Deployment Quick Start

## Prerequisites

Before deploying BudStack, ensure you have:

- ✅ **Docker** (v24.0+) and **Docker Compose** (v2.20+)
- ✅ **Node.js** (v20.x recommended for builds)
- ✅ **Git** for version control
- ✅ **PostgreSQL 15** knowledge
- ✅ **Domain name** (for production)
- ✅ **SSL certificates** (Let's Encrypt recommended)

---

## Quick Start (5 Minutes)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd healingbuds_website
```

### 2. Configure Environment

```bash
# Copy example environment file
cp .env.production.example .env.production

# Edit with your secrets
nano .env.production
```

**Required Variables:**
```bash
# Database
POSTGRES_PASSWORD=<STRONG_PASSWORD>

# NextAuth (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=<RANDOM_SECRET>
NEXTAUTH_URL=https://your-domain.com

# Dr. Green API
DRGREEN_API_KEY=<YOUR_KEY>
DRGREEN_SECRET_KEY=<YOUR_SECRET>

# AWS S3
AWS_BUCKET_NAME=<YOUR_BUCKET>
AWS_ACCESS_KEY_ID=<YOUR_KEY>
AWS_SECRET_ACCESS_KEY=<YOUR_SECRET>

# Email
EMAIL_SERVER=smtp://user:pass@smtp.sendgrid.net:587
EMAIL_FROM=noreply@your-domain.com
```

### 3. Deploy

```bash
# Run automated deployment script
./deploy.sh

# Select option 2 for production
```

### 4. Verify

```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f app

# Test health endpoint
curl http://localhost:3000/api/health
```

---

## Manual Deployment Steps

### Step 1: Database Setup

```bash
# Start database only
docker-compose up -d postgres pgbouncer redis

# Wait for healthy status
docker-compose ps
```

### Step 2: Run Migrations

```bash
# Generate Prisma client
cd nextjs_space
yarn prisma generate

# Run migrations
yarn prisma migrate deploy

# (Optional) Seed data
yarn prisma db seed
```

### Step 3: Build Application

```bash
# Build Docker image
docker-compose build app

# Start application
docker-compose up -d app
```

### Step 4: Configure NGINX (Production)

```bash
# Generate SSL certificate with Let's Encrypt
sudo certbot certonly --standalone -d your-domain.com

# Copy certificates to nginx/ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/fullchain.pem nginx/ssl/
sudo cp /etc/letsencrypt/live/your-domain.com/privkey.pem nginx/ssl/

# Start NGINX
docker-compose up -d nginx
```

---

## Scaling

### Horizontal Scaling

```bash
# Scale to 4 instances
docker-compose up -d --scale app=4

# Check load distribution
docker-compose ps
```

### Vertical Scaling

Edit `docker-compose.yml`:

```yaml
app:
  deploy:
    resources:
      limits:
        cpus: '4'      # Increase from 2
        memory: 4G     # Increase from 2G
```

---

## Monitoring

### View Real-Time Logs

```bash
# All services
docker-compose logs -f

# Application only
docker-compose logs -f app

# Database only
docker-compose logs -f postgres
```

### Resource Usage

```bash
# Container stats
docker stats

# Disk usage
docker system df
```

---

## Backup & Restore

### Database Backup

```bash
# Manual backup
docker-compose exec postgres pg_dump -U budstack budstack_db > backup_$(date +%Y%m%d).sql

# Automated backups (already configured)
# See docker-compose.yml backup service
ls -lh backups/
```

### Restore Database

```bash
# Restore from backup
docker-compose exec -T postgres psql -U budstack budstack_db < backup_20250104.sql
```

---

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs app

# Rebuild without cache
docker-compose build --no-cache app
docker-compose up -d app
```

### Database Connection Issues

```bash
# Test connection
docker-compose exec postgres psql -U budstack budstack_db -c "SELECT 1"

# Check PgBouncer (Common error: "wrong password type" means SCRAM auth is needed)
docker-compose logs pgbouncer

# Ensure PgBouncer has AUTH_TYPE: scram-sha-256 for Postgres 15+
```yaml
pgbouncer:
  environment:
    AUTH_TYPE: scram-sha-256
```
```

### Out of Memory

```bash
# Increase memory limits in docker-compose.yml
app:
  deploy:
    resources:
      limits:
        memory: 4G  # Increase from 2G
```

### Port Already in Use

```bash
# Find process using port 3000
sudo lsof -i :3000

# Kill process
sudo kill -9 <PID>
```

---

## Production Checklist

Before going live:

- [ ] SSL certificates configured
- [ ] Domain DNS pointing to server
- [ ] Environment variables set (no defaults)
- [ ] Database backups scheduled
- [ ] Monitoring configured (Sentry, Prometheus)
- [ ] Rate limiting enabled (NGINX)
- [ ] Firewall configured (UFW, security groups)
- [ ] Log rotation enabled
- [ ] Health checks passing (`/api/health`)
- [ ] Prisma Client initialized (`next.config.js` has standalone mode)
- [ ] Build-time Prisma workaround applied (mock DB or lazy load)
- [ ] Load testing completed

---

## Common Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Restart application
docker-compose restart app

# View running containers
docker-compose ps

# Execute command in container
docker-compose exec app <command>

# Access database
docker-compose exec postgres psql -U budstack budstack_db

# Prune unused resources
docker system prune -a

# Update to latest image
docker-compose pull
docker-compose up -d
```

---

## Next Steps

1. **Read Full Documentation**: See `BUDSTACK_ARCHITECTURE_AND_DEPLOYMENT.md`
2. **Configure Monitoring**: Set up Sentry, Prometheus, Grafana
3. **Set Up CI/CD**: GitHub Actions, GitLab CI, Jenkins
4. **Performance Tuning**: Optimize database queries, add caching
5. **Security Hardening**: Enable 2FA, audit logs, penetration testing

---

## Support

For issues or questions:

- **Documentation**: `/home/ubuntu/BUDSTACK_ARCHITECTURE_AND_DEPLOYMENT.md`
- **GitHub Issues**: <your-repo-url>/issues
- **Email**: support@budstack.to

---

**Last Updated**: January 2025
**Version**: 1.0
