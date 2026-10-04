# SRI Smart Tool

The SRI Smart Tool is a web-based educational platform developed in the context of a diploma thesis on the Smart Readiness Indicator (SRI).

The platform combines theoretical learning, quizzes, final tests and a practical Case Study for applying the SRI methodology to a building scenario.

## Technologies

- React
- TypeScript
- Vite
- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Docker

## Run locally with Docker

### Prerequisites

- Git
- Docker Desktop
- Access to this GitHub repository

Install and start Docker Desktop before running the application.

### 1. Clone the repository

```bash
git clone https://github.com/Stella-Tz/sri-gamification-platform.git
cd sri-gamification-platform
```

### 2. Start the application

```bash
docker compose up --build
```

During the first startup:

- the PostgreSQL database container is created,
- the Prisma Client is generated,
- the database migrations are applied,
- the initial SRI, Course and Case Study data are seeded,
- the backend and frontend services are started.

### 3. Open the application

Open:

http://localhost:5173

A new user account can be created through the Register page.

## Stop the application

Press:

```text
Ctrl+C
```

and then run:

```bash
docker compose down
```

The PostgreSQL Docker volume is preserved, so local application data remain available between runs.

To also remove the local database volume and start again with a completely clean database:

```bash
docker compose down -v
```

## Application services

| Service | Address |
| --- | --- |
| Frontend | http://localhost:5173 |
| Backend | http://localhost:5000 |
| PostgreSQL | Internal Docker network |

## Deployment

The deployed version of the application is available at:

https://sri-smart-tool.onrender.com