# 💇 Elysian Hair Spa — Management System

A modern, web-based salon management system built to streamline daily operations for Elysian Hair Spa. The system supports appointment management, point-of-sale transactions, sales reporting, and a public-facing landing page — replacing the salon's outdated manual processes with a fast, reliable digital solution.

---

## Table of Contents

- [System Overview](#system-overview)
- [User Roles](#user-roles)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Docker Reference](#docker-reference)
- [Database Modules](#database-modules)
- [Security](#security)
- [Deployment](#deployment)
- [GitHub Guidelines](#github-guidelines)

---

## System Overview

Elysian Hair Spa serves clients across hair, nail, skin, and beauty services. As the business grew, manual operations could no longer keep pace — especially during peak hours. This system addresses that by providing:

- A **public landing page** for clients to view services, browse the gallery, and book appointments
- A **POS interface** for staff to manage transactions efficiently
- An **admin dashboard** for the owner to track sales, manage employees, and export reports

---

## User Roles

### Owner / Admin
- Full dashboard access
- Sales reports (daily, weekly, monthly, custom ranges)
- Manage employees, services, and pricing
- Export reports as PDF or Excel
- View revenue analytics and top-performing services

### Employee / Staff
- POS access — create and manage transactions
- Add services to cart, apply discounts, process payments
- Accept Cash, GCash, or Card
- Generate receipts and view daily sales summary
- Manage appointments *(optional)*

### Client / Visitor
- Browse services, prices, gallery, and testimonials
- Submit contact form
- Book appointments *(optional)*
- Login for loyalty features *(optional)*

---

## Features

### Landing Page *(Public — Mobile Responsive)*
> This is the **only** part of the system that is fully mobile-responsive.

- Hero section
- About Elysian Hair Spa
- Services overview and price list
- Gallery and testimonials
- Contact information
- Book Now and Login buttons

### Authentication
- Login / Logout
- Role-based access control
- JWT token authentication
- Password encryption
- Session management

### Employee Page (POS)
- Create transactions and add services/products to cart
- Apply discounts
- Payment methods: Cash / GCash / Card
- Generate and print receipts
- Daily sales summary and transaction history

### Admin Page
- Sales reports with custom date ranges
- Revenue tracking and analytics
- Top services and employee performance metrics
- Manage services, prices, and employees
- Export reports (PDF / Excel)
- System settings

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js, TypeScript |
| Backend | Django, Django REST Framework |
| Database | PostgreSQL |
| Authentication | JWT (SimpleJWT) |
| API Docs | Swagger / OpenAPI |
| Containerization | Docker, Docker Compose |
| Frontend Hosting | Vercel *(tentative)* |
| Backend Hosting | AWS / DigitalOcean / Render *(tentative)* |

---

## Architecture

```
Client Browser
     │
     ▼
Next.js Frontend (Vercel)
     │  REST API calls (HTTPS)
     ▼
Django REST Framework (Backend)
     │
     ▼
PostgreSQL Database
```

The frontend handles role-based routing and communicates with the backend exclusively via REST API. The backend enforces permissions at the API level and manages all business logic and data persistence.

---

## Installation

The project runs entirely through **Docker**. You do not need to install Python, Node.js, or PostgreSQL manually — Docker handles all of that.

### Prerequisites

- **Git** — https://git-scm.com
- **Docker Desktop** — https://www.docker.com/products/docker-desktop

Verify Docker is installed after setup:
```bash
docker --version
```

---

### 1. Clone the repository

```bash
git clone https://github.com/your-org/elysian-hair-spa.git
cd elysian-hair-spa
```

---

### 2. Set up environment variables

Copy the example env file:
```bash
cp .env.example .env
```

Then generate a secure Django secret key:
```bash
docker run --rm python:3.12-slim python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

Open `.env` and paste the generated key as the value for `SECRET_KEY`. The database credentials in `.env.example` work as-is for local development — Docker automatically creates the PostgreSQL database using those values on first boot. See [Environment Variables](#environment-variables) for a full breakdown.

---

### 3. Build and start all containers

```bash
docker-compose up --build
```

This single command:
- Pulls the PostgreSQL image and creates the database
- Builds and starts the Django backend
- Runs all migrations automatically
- Builds and starts the Next.js frontend

First build takes a few minutes. Subsequent startups are much faster.

---

### 4. Verify everything is running

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8000/api/ |
| Django Admin | http://localhost:8000/admin/ |
| Database | `localhost:5432` (connect via TablePlus or pgAdmin) |

---

### 5. Create a superuser (Admin account)

In a separate terminal, while the containers are running:
```bash
docker-compose exec backend python manage.py createsuperuser
```

---

### That's it

The full stack is running. No manual database setup, no virtual environments, no separate server commands.

To stop everything:
```bash
docker-compose down
```

---

## Environment Variables

All environment variables live in a single `.env` file at the root of the repository. This file is **never committed to Git**.

| Variable | Description | Example |
|---|---|---|
| `SECRET_KEY` | Django's cryptographic master key — generate once, keep secret | `3n6y#p!q8$vx...` |
| `DEBUG` | `True` for local development, `False` in production | `True` |
| `ALLOWED_HOSTS` | Comma-separated list of accepted hostnames | `localhost,127.0.0.1` |
| `DB_NAME` | PostgreSQL database name — Docker creates this automatically | `elysian_db` |
| `DB_USER` | PostgreSQL username — Docker creates this automatically | `elysian_user` |
| `DB_PASSWORD` | PostgreSQL password — Docker creates this automatically | `elysian_password` |
| `CORS_ALLOWED_ORIGINS` | Origins allowed to call the Django API | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | The API base URL used by the Next.js frontend | `http://localhost:8000/api` |

---

## Docker Reference

### Everyday commands

| Task | Command |
|---|---|
| Start all containers | `docker-compose up` |
| Start and rebuild images | `docker-compose up --build` |
| Stop all containers | `docker-compose down` |
| Stop and wipe the database | `docker-compose down -v` |
| View logs for a service | `docker-compose logs backend` |
| Restart a single service | `docker-compose restart backend` |

### Running Django management commands

All Django commands must be run inside the backend container:

```bash
# Run migrations after adding or changing a model
docker-compose exec backend python manage.py makemigrations
docker-compose exec backend python manage.py migrate

# Create a superuser
docker-compose exec backend python manage.py createsuperuser

# Open a shell inside the container
docker-compose exec backend sh
```

### Installing new packages

Adding a package requires rebuilding the container image since packages live inside Docker, not on your local machine.

**Python (Django):**
```bash
# 1. Install locally to update requirements.txt (venv must be active)
pip install <package-name>
pip freeze > backend/requirements.txt

# 2. Rebuild the backend image
docker-compose up --build backend
```

**Node.js (Next.js):**
```bash
# 1. Install locally to update package.json
cd frontend
npm install <package-name>

# 2. Rebuild the frontend image
docker-compose up --build frontend
```

### Connecting to the database (TablePlus / pgAdmin)

While containers are running, connect with:

| Field | Value |
|---|---|
| Host | `localhost` |
| Port | `5432` |
| Database | value of `DB_NAME` in your `.env` |
| User | value of `DB_USER` in your `.env` |
| Password | value of `DB_PASSWORD` in your `.env` |

---

## Database Modules

| Module | Description |
|---|---|
| `Users` | Authentication, roles, and account management |
| `Roles` | Owner, Employee, and Client role definitions |
| `Services` | Service catalog with categories and pricing |
| `Categories` | Service groupings (hair, nails, skin, etc.) |
| `Transactions` | Sales transaction headers |
| `Transaction Items` | Individual line items per transaction |
| `Payments` | Payment records and methods |
| `Employees` | Employee profiles and performance data |
| `Reports` | Aggregated sales and analytics data |

---

## Security

- **Role-based access control** — API endpoints are permission-gated by user role
- **JWT authentication** — Stateless token-based auth with refresh rotation
- **Password encryption** — Passwords hashed using Django's PBKDF2 by default
- **Input validation** — Server-side validation on all API inputs via DRF serializers
- **CSRF protection** — Enabled on session-based routes
- **Audit logs** — Key actions (logins, transactions, changes) are logged
- **Secure API endpoints** — All production traffic served over HTTPS

---

## Deployment

| Component | Platform |
|---|---|
| Frontend | Vercel |
| Backend | AWS / DigitalOcean / Render *(tentative)* |
| Database | Managed PostgreSQL (e.g. Render DB, RDS, Supabase) |

**Pre-deployment checklist:**
- [ ] Set `DEBUG=False` in production
- [ ] Configure `ALLOWED_HOSTS` with your domain
- [ ] Set all secrets as environment variables on the hosting platform (never commit `.env`)
- [ ] Switch Django run command from `runserver` to `gunicorn`
- [ ] Switch Next.js from `npm run dev` to `npm run build && npm start`
- [ ] Enable HTTPS on all endpoints
- [ ] Run `python manage.py collectstatic` before deploying the backend
- [ ] Point `DB_HOST` to your managed PostgreSQL instance

---

## GitHub Guidelines

### Branching Strategy

We follow a simplified **Gitflow** model:

```
main
 └── develop
      ├── feature/your-feature-name
      ├── fix/your-bug-description
      └── chore/your-task-description
```

| Branch | Purpose |
|---|---|
| `main` | Production-ready code only. Never commit directly. |
| `develop` | Integration branch. All features merge here first. |
| `feature/*` | New features and enhancements |
| `fix/*` | Bug fixes |
| `chore/*` | Config changes, refactors, dependency updates |
| `hotfix/*` | Urgent fixes that go directly to `main` |

**Creating a branch:**
```bash
git checkout develop
git pull origin develop
git checkout -b feature/pos-discount-logic
```

---

### Commit Message Format

Follow the **Conventional Commits** standard:

```
<type>(<scope>): <short description>
```

**Types:**

| Type | When to use |
|---|---|
| `feat` | A new feature |
| `fix` | A bug fix |
| `chore` | Build process, tooling, or config changes |
| `refactor` | Code restructuring with no behavior change |
| `docs` | Documentation changes only |
| `style` | Formatting, missing semicolons, etc. (no logic change) |
| `test` | Adding or updating tests |
| `perf` | Performance improvements |

**Examples:**
```bash
feat(pos): add GCash payment method to checkout
fix(auth): resolve JWT refresh token expiry bug
chore(deps): upgrade Django to 5.1
docs(readme): add environment variable setup section
refactor(reports): simplify monthly aggregation query
```

**Rules:**
- Use the **imperative mood** — "add feature" not "added feature"
- Keep the subject line under **72 characters**
- Reference issue numbers where applicable: `fix(auth): handle expired tokens (#42)`

---

### Pull Request Process

1. **Branch off `develop`**, never `main`
2. Keep PRs **focused** — one feature or fix per PR
3. Write a clear PR description explaining *what* changed and *why*
4. Request at least **one reviewer** before merging
5. Ensure all checks pass (linting, tests) before requesting review
6. **Squash and merge** to keep the `develop` history clean
7. Delete the branch after merging

**PR Title format** (mirrors commit convention):
```
feat(admin): add CSV export to reports page
```

---

### General Git Rules

- **Never force-push** to `main` or `develop`
- **Never commit secrets** — use `.env` files and ensure they are in `.gitignore`
- Pull and rebase before pushing to avoid conflicts:
  ```bash
  git pull --rebase origin develop
  ```
- Tag releases on `main` using semantic versioning:
  ```bash
  git tag -a v1.0.0 -m "Initial production release"
  git push origin v1.0.0
  ```
