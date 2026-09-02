# Contribution Guide

## Comment contribuer

### 1. Fork le repository

```bash
git clone https://github.com/your-username/youth-opportunity-ecosystem.git
cd youth-opportunity-ecosystem
```

### 2. Créez une branche

```bash
git checkout -b feature/your-feature-name
```

### 3. Installez les dépendances

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 4. Faites vos modifications

- Suivez le style de code existant
- Écrivez des commentaires clairs
- Testez vos modifications

### 5. Commitez vos changements

```bash
git add .
git commit -m "feat: Add new feature description"
```

### Style de commit

- `feat:` - Nouvelle feature
- `fix:` - Correction de bug
- `docs:` - Documentation
- `style:` - Formatage
- `refactor:` - Refactoring
- `test:` - Tests
- `chore:` - Maintenance

### 6. Push et créez une Pull Request

```bash
git push origin feature/your-feature-name
```

Créez une PR sur GitHub avec une description claire.

## Code Style

### TypeScript

- Utilisez strict mode
- Typez toutes les variables
- Pas de `any` sauf si absolument nécessaire

### React/Next.js

- Utilisez les hooks fonctionnels
- Nommez les composants en PascalCase
- Utilisez les interfaces pour les props

### Naming Conventions

- Variables & functions: `camelCase`
- Classes: `PascalCase`
- Constants: `UPPER_SNAKE_CASE`
- Files: `lowercase-with-dashes` (folders), `lowercase.ts` (files)

## Testing

```bash
# Backend
cd backend
npm run test

# Frontend
cd frontend
npm run test
```

## Documentation

Mettez à jour la documentation si nécessaire:

- `docs/API.md` - API changes
- `docs/ARCHITECTURE.md` - Architecture changes
- `docs/DEVELOPMENT.md` - Setup changes
- `README.md` - General info

## Questions?

Ouvrez une issue ou contactez l'équipe.

## License

MIT
