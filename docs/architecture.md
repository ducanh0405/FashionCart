## FashionCart Architecture Overview

This document describes the **high-level architecture** and **project structure** for the FashionCart platform. It focuses on separation of concerns and future scalability, without any implementation details.

---

## 1. High-Level System Components

- **Frontend**: Web client for users (browsing products, managing carts, using VTON, etc.).
- **Backend API**: Core business logic, authentication, and communication with databases and ML services.
- **ML Services**: Separate services for size/style recommendations (DSS) and Virtual Try-On (VTON).
- **Infrastructure**: Deployment, CI/CD, environments, and operational tooling.

At a high level:

- Frontend ↔ Backend API (HTTP/REST or GraphQL)
- Backend API ↔ Database (relational or NoSQL)
- Backend API ↔ ML Services (internal HTTP/gRPC)

---

## 2. Repository Structure

Top-level layout:

- `frontend/`: Web client.
- `backend/`: API server and business logic.
- `ml-services/`: DSS and VTON related work.
- `infrastructure/`: Deployment and environment configuration.
- `docs/`: Documentation (including this file).
- `scripts/`: Development and operations helper scripts.
- `tests/`: Cross-system and end-to-end tests.

---

## 3. Frontend Architecture

**Path**: `frontend/`

### 3.1 Structure

- `src/`
  - `components/`: Reusable UI elements shared across pages.
  - `pages/` or `routes/`: Page-level views (Home, Product Detail, Cart, Checkout, Profile, etc.).
  - `features/`:
    - `auth/`
    - `catalog/`
    - `cart/`
    - `checkout/`
    - `chat/`
    - `profile/`
    - `vton/` (Virtual Try-On UI flows)
  - `hooks/`: Reusable logic hooks.
  - `services/`: API clients and HTTP utilities.
  - `store/`: Global state management.
  - `styles/`: Global styling, themes, and design tokens.
  - `utils/`: Small shared utilities.
- `public/`: Static assets (logos, images, fonts).

### 3.2 Responsibilities

- Render user experiences for discovering, trying on, and purchasing fashion items.
- Communicate with the backend API for data (products, cart, orders, chat messages).
- Integrate VTON flows exposed by the backend and ML services.

---

## 4. Backend Architecture

**Path**: `backend/`

### 4.1 Structure

- `src/`
  - `config/`: Environment configuration and constants.
  - `modules/`:
    - `auth/`: Authentication, authorization, and session handling.
    - `users/`: User profiles, preferences, and account data.
    - `products/`: Product catalog, categories, and search.
    - `orders/`: Orders, payments, and order history.
    - `cart/`: Cart state and operations.
    - `chat/`: Messaging between buyers and shops.
    - `recommendations/`: Size/style recommendation integration with DSS.
    - `vton/`: Backend integration layer for Virtual Try-On.
  - `api/`:
    - `routes/` or `controllers/`: HTTP endpoints.
    - `middlewares/`: Cross-cutting concerns (logging, auth, validation, etc.).
  - `db/`:
    - `models/`: Database models / schemas.
    - `migrations/`: Schema migration files.
    - `repositories/`: Data access logic.
  - `services/`: Business use-cases and domain-specific operations.
  - `jobs/`: Background jobs (e.g., sending emails, processing events).
  - `utils/`: Shared backend helpers.
- `tests/`: Backend-specific unit and integration tests.

### 4.2 Responsibilities

- Provide secure APIs for all frontend features.
- Orchestrate flows such as product browsing, cart, checkout, and order tracking.
- Call ML services for recommendations and VTON, shielding frontend from ML details.

---

## 5. ML Services Architecture

**Path**: `ml-services/`

The ML layer is separated to allow independent experimentation, scaling, and deployment of models.

### 5.1 DSS (Size/Style Recommendation)

**Path**: `ml-services/dss/`

- `data/`: Data schemas and sample datasets for development.
- `notebooks/`: Exploration, experiments, and research.
- `models/`: Model definitions and saved weights.
- `service/`: Future microservice wrapper exposing a simple API (e.g., `POST /recommend`).
- `evaluation/`: Metrics, evaluation scripts, and experiment tracking.

### 5.2 VTON (Virtual Try-On)

**Path**: `ml-services/vton/`

- `data/`: Input images, garments, and annotations.
- `notebooks/`: Research and experimentation for VTON pipelines.
- `models/`: Trained networks and VTON models.
- `service/`: API wrapper for generating try-on results.
- `evaluation/`: Quality and performance metrics.

### 5.3 Shared ML Utilities

**Path**: `ml-services/shared/`

- `utils/`: Common preprocessing, postprocessing, and helpers.
- `experiments/`: Cross-model experiments and comparison.

---

## 6. Infrastructure & Deployment

**Path**: `infrastructure/`

### 6.1 Structure

- `docker/`:
  - `docker-compose.dev.yml`: Local development setup.
  - `docker-compose.prod.yml`: Production-oriented composition.
- `k8s/`: Kubernetes manifests (if adopted later).
- `ci-cd/`: CI/CD pipeline definitions (e.g., GitHub Actions, GitLab CI).
- `monitoring/`: Monitoring, logging, and alerting configuration.
- `env-templates/`:
  - `.env.example` files (documenting required env vars without secrets).

### 6.2 Responsibilities

- Standardize how services are built, run, and deployed.
- Provide clear environment separation (development, staging, production).
- Support scaling and observability when FashionCart grows.

---

## 7. Cross-Cutting Testing Strategy

**Path**: `tests/`

- `e2e/`: End-to-end tests that cover full user journeys (browse → add to cart → checkout).
- `load/` (optional): Load/performance tests for critical paths.

Backend and frontend also have their own local `tests/` directories for more granular coverage.

---

## 8. Documentation Layout

**Path**: `docs/`

- `ideadraft.md`: Initial idea, goals, and vision.
- `architecture.md`: This document.
- `frontend.md`: Design decisions, routing strategy, and UI guidelines (future).
- `backend.md`: API design, modules, and data models (future).
- `ml.md`: DSS and VTON concepts, datasets, evaluation, and roadmap (future).
- `roadmap.md`: Milestones for MVP, post-MVP, and long-term evolution.

---

This architecture is meant to be a **starting point**. As FashionCart evolves, you can refine module boundaries, split services, or consolidate pieces based on real usage and team preferences, while keeping the overall separation of concerns.

