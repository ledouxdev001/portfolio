# 🚀 Portfolio CV Manager — Dorcel Le Doux Fopa

Projet full stack complet : Portfolio interactif avec authentification JWT et gestion complète du CV via une interface d'administration.

## 🗂️ Stack Technique

| Couche          | Technologie                                |
|-----------------|--------------------------------------------|
| Backend         | Spring Boot 3.2 + Spring Security + JWT    |
| Frontend        | React 18 + React Router + Axios + Nginx    |
| Base de données | MySQL 8                                    |
| Auth            | JWT (JSON Web Token)                       |
| Conteneurs      | Docker + Docker Compose                    |

---

## 🐳 Démarrage avec Docker (recommandé)

### Prérequis
- [Docker](https://www.docker.com/) 24+
- [Docker Compose](https://docs.docker.com/compose/) v2+

### 1. Configurer les variables d'environnement

```bash
bash scripts/generate-secrets.sh
# Editez .env si besoin (optionnel, les valeurs par defaut fonctionnent)
```

### 2. Lancer tous les services

```bash
docker compose up --build
```

> Premier lancement : 3 à 5 min (download images + build Maven + build React)

### Acces

| Service   | URL                        |
|-----------|----------------------------|
| Portfolio | http://localhost:3000       |
| API       | http://localhost:8080       |
| MySQL     | localhost:3307 (optionnel) |

**Compte admin par defaut :** `admin` / `Admin@2025`

---

### Commandes Docker utiles

```bash
# Demarrer en arriere-plan
docker compose up -d --build

# Voir les logs
docker compose logs -f

# Logs d'un service specifique
docker compose logs -f backend

# Arreter
docker compose down

# Arreter ET supprimer les volumes (reset base de donnees)
docker compose down -v

# Rebuild un service uniquement
docker compose up -d --build backend

# Statut des conteneurs
docker compose ps
```

---

## Demarrage sans Docker (developpement local)

### Prerequis
- Java 17+, Node.js 18+, MySQL 8+, Maven 3.8+

### 1. MySQL

```sql
CREATE DATABASE portfolio_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 2. Backend

```bash
cd backend
mvn spring-boot:run
# Backend sur http://localhost:8080
```

### 3. Frontend

```bash
cd frontend
npm install && npm start
# Frontend sur http://localhost:3000
```

---

## Authentification

| Endpoint              | Methode         | Acces        | Description          |
|-----------------------|-----------------|--------------|----------------------|
| /api/auth/login       | POST            | Public       | Connexion JWT        |
| /api/auth/me          | GET             | Prive        | Profil utilisateur   |
| /api/portfolio        | GET             | Public       | Lecture du portfolio |
| /api/portfolio/**     | PUT/POST/DELETE | Authentifie  | Modifications        |

---

## Fonctionnalites

**Public (visiteurs)**
- Consultation du portfolio complet
- Sections : Profil, Competences, Experiences, Projets, Formation, Langues, Qualites

**Admin (apres connexion)**
- Mode edition via le bouton "Modifier" dans la navbar
- Ajouter, modifier, supprimer chaque section
- Bouton Deconnexion dedie dans la navbar

---

## Structure du projet

```
portfolio-project/
|-- docker-compose.yml        Orchestration complete
|-- .env.example              Variables d'environnement
|-- README.md
|-- start.sh                  Script demarrage local
|
|-- backend/
|   |-- Dockerfile            Multi-stage build (Maven puis JRE Alpine)
|   |-- pom.xml
|   +-- src/main/java/com/portfolio/
|       |-- config/           SecurityConfig, DataInitializer
|       |-- controller/       AuthController, PortfolioController
|       |-- entity/           User, Profile, Skills, Experience...
|       |-- repository/       JPA Repositories
|       +-- security/         JWT utils et filtres
|
|-- frontend/
|   |-- Dockerfile            Multi-stage build (Node puis Nginx Alpine)
|   |-- nginx.conf            SPA routing + proxy API + cache
|   |-- package.json
|   +-- src/
|       |-- App.jsx
|       |-- contexts/         AuthContext
|       |-- pages/            PortfolioPage, LoginPage
|       |-- components/       Navbar, Modal
|       +-- services/         api.js (Axios)
|
+-- database/
    +-- init.sql              Script SQL d'initialisation
```

---

## Configuration production

```bash
# Generer un secret JWT securise
openssl rand -base64 64
```

Mettre a jour `.env` :
```
JWT_SECRET=<votre-cle-generee>
CORS_ORIGINS=https://votre-domaine.com
MYSQL_PASSWORD=<mot-de-passe-fort>
```

---

## Credits

**Dorcel Le Doux Fopa** — Developpeur Web Full Stack
- Email : ledouxdev001@gmail.com
- Site  : https://ledoux-fopa-media.vercel.app/

---

## CI/CD — GitHub Actions

### Workflows disponibles

| Workflow | Fichier | Declencheur | Role |
|---|---|---|---|
| CI | ci.yml | Push / PR sur main, develop | Tests + Build + Docker check |
| CD | cd.yml | Push sur main | Push Docker Hub + Deploy SSH |
| Release | release.yml | Tag vX.X.X | Release GitHub + artifacts |
| Security | security.yml | Lundi 08h + push main | OWASP + Trivy + CodeQL |

### Secrets GitHub a configurer

Dans Settings > Secrets and variables > Actions :

```
DOCKER_USERNAME     Votre identifiant Docker Hub
DOCKER_PASSWORD     Token Docker Hub (pas votre mdp)
SSH_HOST            IP ou domaine du serveur de production
SSH_USER            Utilisateur SSH (ex: ubuntu, deploy)
SSH_PRIVATE_KEY     Cle privee SSH (contenu complet)
SSH_PORT            Port SSH (defaut: 22)
```

### Flux de travail recommande

```
feature/ma-fonctionnalite
        |
        | Pull Request
        v
    develop  ──── CI (tests + build)
        |
        | Merge / PR
        v
      main   ──── CI + CD (deploy auto en prod)
        |
        | git tag v1.0.0
        v
    Release  ──── GitHub Release + artifacts
```

### Creer une release

```bash
git tag v1.0.0
git push origin v1.0.0
```

La release GitHub est creee automatiquement avec le JAR, le build React et le changelog.

