# API Documentation - Youth Opportunity Ecosystem

## Overview

REST API pour la plateforme Youth Opportunity Ecosystem. Base URL: `http://localhost:5000/api`

## Authentication

La plupart des endpoints protégés nécessitent un JWT token dans le header:

```
Authorization: Bearer <token>
```

## Response Format

Tous les responses suivent ce format:

```json
{
  "status": "success" | "error",
  "data": {},
  "message": "optional message"
}
```

---

## AUTH ENDPOINTS

### Register User

```http
POST /auth/register
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "firstName": "Jean",
  "lastName": "Dupont",
  "userType": "young" // young, mentor, organization, admin
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "Jean",
      "lastName": "Dupont",
      "userType": "young"
    },
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}
```

### Login

```http
POST /auth/login
```

**Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response:** Same as register

---

## USER ENDPOINTS

### Get Current User Profile

```http
GET /users/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "Jean",
    "lastName": "Dupont",
    "bio": "...",
    "city": "Port-au-Prince",
    "phone": "+509...",
    "educationLevel": "bachelor",
    "studyField": "Computer Science",
    "userType": "young"
  }
}
```

### Update User Profile

```http
PUT /users/me
Authorization: Bearer <token>
```

**Body:**
```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "bio": "Passionate developer",
  "city": "Port-au-Prince",
  "phone": "+509...",
  "educationLevel": "bachelor",
  "studyField": "Computer Science"
}
```

### Get User by ID

```http
GET /users/:id
```

---

## OPPORTUNITY ENDPOINTS

### List Opportunities

```http
GET /opportunities?category=job&location=Port-au-Prince&limit=20&offset=0
```

**Query Parameters:**
- `category` - Filtre par catégorie (job, internship, scholarship, etc.)
- `location` - Filtre par location
- `status` - Filtre par status (default: active)
- `limit` - Nombre de résultats (default: 20, max: 100)
- `offset` - Pagination offset (default: 0)

**Response:**
```json
{
  "status": "success",
  "data": [
    {
      "id": "uuid",
      "title": "Stage en Finance",
      "description": "...",
      "organization_id": "uuid",
      "category": "internship",
      "location": "Port-au-Prince",
      "mode": "hybrid",
      "deadline": "2024-12-31T00:00:00Z",
      "status": "active",
      "view_count": 150,
      "application_count": 25
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 20,
    "offset": 0
  }
}
```

### Get Opportunity Detail

```http
GET /opportunities/:id
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "title": "Stage en Finance",
    "description": "Description complète...",
    "short_description": "Short desc",
    "organization_id": "uuid",
    "category": "internship",
    "field": "Finance",
    "location": "Port-au-Prince",
    "mode": "hybrid",
    "deadline": "2024-12-31T00:00:00Z",
    "min_education_level": "bachelor",
    "required_experience_years": 0,
    "skills_required": ["Excel", "Communication"],
    "status": "active",
    "is_verified": true,
    "view_count": 150
  }
}
```

### Apply to Opportunity

```http
POST /opportunities/:id/apply
Authorization: Bearer <token>
```

**Body:**
```json
{
  "resume_url": "https://...",
  "cover_letter": "Je suis intéressé par...",
  "additional_info": {}
}
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "opportunity_id": "uuid",
    "user_id": "uuid",
    "status": "submitted",
    "applied_at": "2024-09-02T21:00:00Z"
  }
}
```

---

## ORGANIZATION ENDPOINTS

### List Organizations

```http
GET /organizations?verified=true&limit=20&offset=0
```

**Query Parameters:**
- `verified` - Filtre par vérification (true/false)
- `limit` - Nombre de résultats
- `offset` - Pagination offset

### Get Organization

```http
GET /organizations/:id
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "id": "uuid",
    "name": "BanqueXYZ",
    "description": "...",
    "website": "https://banque.ht",
    "city": "Port-au-Prince",
    "org_type": "company",
    "is_verified": true,
    "opportunities": [
      // Top 10 active opportunities
    ]
  }
}
```

### Create Organization

```http
POST /organizations
Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "My Company",
  "description": "Description...",
  "website": "https://company.ht",
  "email": "contact@company.ht",
  "phone": "+509...",
  "city": "Port-au-Prince",
  "orgType": "company"
}
```

---

## FORMATION ENDPOINTS

### List Formations

```http
GET /formations?category=tech&level=beginner&format=online&limit=20
```

**Query Parameters:**
- `category` - Filtre par catégorie
- `level` - Filtre par niveau
- `format` - Filtre par format (online, in_person, hybrid, self_paced)

### Get Formation

```http
GET /formations/:id
```

---

## MENTOR ENDPOINTS

### List Mentors

```http
GET /mentors?verified=true&limit=20
```

### Get Mentor

```http
GET /mentors/:id
```

### Request Mentorship

```http
POST /mentors/:id/request
Authorization: Bearer <token>
```

**Body:**
```json
{
  "goals": "Apprendre le web development",
  "skillsToDevelop": ["React", "Node.js"],
  "durationWeeks": 12,
  "frequency": "weekly"
}
```

---

## NOTIFICATION ENDPOINTS

### Get Notifications

```http
GET /notifications?unread=true
Authorization: Bearer <token>
```

**Query Parameters:**
- `unread` - Filtre par non-lus (true/false)

### Mark as Read

```http
PUT /notifications/:id/read
Authorization: Bearer <token>
```

---

## ADMIN ENDPOINTS

### Get Dashboard Stats

```http
GET /admin/dashboard/stats
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "status": "success",
  "data": {
    "users": 1250,
    "opportunities": 450,
    "organizations": 85,
    "applications": 3200
  }
}
```

### Get Pending Opportunities

```http
GET /admin/opportunities/pending
Authorization: Bearer <admin_token>
```

### Verify Opportunity

```http
PUT /admin/opportunities/:id/verify
Authorization: Bearer <admin_token>
```

**Body:**
```json
{
  "verified": true
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "status": "error",
  "message": "Validation error",
  "errors": [
    { "field": "email", "message": "Invalid email" }
  ]
}
```

### 401 Unauthorized
```json
{
  "status": "error",
  "message": "Invalid token"
}
```

### 403 Forbidden
```json
{
  "status": "error",
  "message": "Access denied"
}
```

### 404 Not Found
```json
{
  "status": "error",
  "message": "Resource not found"
}
```

### 500 Internal Server Error
```json
{
  "status": "error",
  "message": "Internal server error"
}
```

---

## Rate Limiting

Les endpoints sont protégés par rate limiting:
- 100 requêtes par 15 minutes par IP

## CORS

CORS est activé pour `http://localhost:3000` en développement.
