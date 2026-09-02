# Development Guide

## Setup du Backend

### Prérequis
- Node.js 18+
- PostgreSQL 14+
- Redis (optionnel pour development)

### Installation

```bash
cd backend
npm install
```

### Configuration de la base de données

```bash
cp .env.example .env
```

Modifiez `.env` avec vos paramètres PostgreSQL:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/yoe_dev
```

### Migrations Prisma

```bash
# Créer la base de données et appliquer les migrations
npm run db:migrate

# Voir l'état de la base de données
npm run db:studio
```

### Démarrer le serveur

```bash
npm run dev
# Serveur sur http://localhost:5000
```

## Setup du Frontend

### Installation

```bash
cd frontend
npm install
```

### Configuration

Les variables d'environnement sont configurées automatiquement via `next.config.js`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Démarrer le dev server

```bash
npm run dev
# Application sur http://localhost:3000
```

## API Endpoints (MVP)

### Authentication
```
POST /api/auth/register
POST /api/auth/login
```

### Opportunities
```
GET /api/opportunities
GET /api/opportunities/:id
POST /api/opportunities/:id/apply
```

### Users
```
GET /api/users/me (protected)
PUT /api/users/me (protected)
GET /api/users/:id
```

### Organizations
```
GET /api/organizations
GET /api/organizations/:id
POST /api/organizations (protected)
```

### Formations
```
GET /api/formations
GET /api/formations/:id
```

### Mentors
```
GET /api/mentors
GET /api/mentors/:id
POST /api/mentors/:id/request (protected)
```

### Notifications
```
GET /api/notifications (protected)
PUT /api/notifications/:id/read (protected)
```

## Structure des fichiers

```
backend/
├── src/
│   ├── index.ts              # Point d'entrée
│   ├── config/               # Configuration
│   │   ├── logger.ts
│   │   └── database.ts
│   ├── middleware/           # Middleware
│   │   ├── auth.middleware.ts
│   │   └── validation.middleware.ts
│   ├── routes/               # Routes API
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── opportunity.routes.ts
│   │   ├── organization.routes.ts
│   │   ├── formation.routes.ts
│   │   ├── mentor.routes.ts
│   │   ├── notification.routes.ts
│   │   └── admin.routes.ts
│   ├── services/             # Logique métier (à créer)
│   ├── utils/                # Utilitaires (à créer)
│   └── scripts/              # Scripts (seed, etc)
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env.example
├── tsconfig.json
└── package.json
```

## Prochaines étapes

### Phase 1 (MVP)
- [x] Configuration backend de base
- [x] Schéma Prisma complet
- [ ] Intégration frontend-backend
- [ ] Pages Opportunités avec recherche
- [ ] Dashboard utilisateur
- [ ] Dashboard admin
- [ ] Système de notifications

### Phase 2
- [ ] Orientation académique
- [ ] Module Compétences avancé
- [ ] Mentorat
- [ ] Entrepreneuriat
- [ ] Leadership
- [ ] Événements

### Phase 3+
- [ ] Recommandations IA
- [ ] Mobile app
- [ ] API publique
- [ ] Intégrations externes
