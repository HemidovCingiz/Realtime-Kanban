# 📋 Real-Time Kanban Board

A modern, containerized Full-Stack Kanban Board application built to manage project tasks efficiently in real-time. This project features a robust backend API, a sleek and responsive user interface, and automated DevOps workflows.

---

## 🚀 Features

- **Full CRUD Operations**: Create, read, update, and delete tasks seamlessly.
- **Dynamic Columns**: Tasks categorized into `To Do`, `In Progress`, and `Done`.
- **Modern UI/UX**: Built with React, TypeScript, and the cutting-edge Tailwind CSS v4.
- **Containerized Environment**: Fully orchestrated using Docker and Docker Compose.
- **Automated CI/CD**: Continuous integration pipeline configured via GitHub Actions.

---

## 🛠️ Tech Stack

### Backend
- **FastAPI**: High-performance, asynchronous Python web framework.
- **SQLModel**: Intuitive SQL database interactions combining SQLAlchemy and Pydantic.
- **PostgreSQL**: Production-ready relational database.

### Frontend
- **React 18** & **TypeScript**: Type-safe, scalable UI development.
- **Vite**: Ultra-fast frontend build tool.
- **Tailwind CSS v4**: Modern utility-first CSS framework.
- **Axios**: Promised-based HTTP client for API communication.

### DevOps & Tools
- **Docker / Docker Compose**
- **GitHub Actions**

---

## 📦 Getting Started

### Prerequisites
Make sure you have [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running on your machine.

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/HemidovCingiz/realtime-kanban.git](https://github.com/HemidovCingiz/realtime-kanban.git)
   cd realtime-kanban

2. Run the application using Docker Compose:
      docker compose up --build

3. Access the application:

Frontend App: http://localhost:5173

Backend API Docs (Swagger UI): http://localhost:8000/docs

⚙️ CI/CD Pipeline
This project includes an automated GitHub Actions workflow (cicd.yml) that automatically triggers on every push or pull_request to the main branch. It ensures code quality by:

Setting up the environment.

Installing dependencies.

Simulating and verifying Docker container builds.