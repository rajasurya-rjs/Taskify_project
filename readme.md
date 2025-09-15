# Installation
Run the following command to clone the repository
```
git clone https://github.com/alokyadav1/mern-todo-app.git
```
Go to ```frontend``` and ```backend``` directory to install packages
```
cd frontend
npm install
```
```
cd backend
npm install
```
# Taskify_project

Taskify — a simple To-Do app with categories (MERN stack).

This repository contains a backend (Express + MongoDB) and frontend (React) application.

Quick start (local)

Prerequisites
- Node.js (v16+)
- npm
- MongoDB (Atlas or local)

1. Backend

- Create a `.env` file in the `backend/` directory with the following keys:
```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=replace_with_a_long_random_secret
GMAIL_USERNAME=
GMAIL_PASSWORD=
PORT=7123
```
- Install and run:
```
cd backend
npm install
# dev (nodemon)
PORT=7123 npm run dev
# or production
npm run start
```

2. Frontend

- Install and run:
```
cd frontend
npm install
npm start
```

API endpoints
- POST /auth/register (register) — returns { token }
- POST /auth/login (login) — returns { token }
- GET /auth/getuser (get current user) — requires Authorization header
- GET /tasks?category=work (list tasks by category) — requires Authorization
- POST /tasks (create task) — requires Authorization
- PATCH /tasks/:id (update task) — requires Authorization
- DELETE /tasks/:id (delete task) — requires Authorization

Security
- Do not commit `.env` or any secrets to the repository. The `.gitignore` in this repo excludes `.env` and `node_modules`.

Notes
- Frontend Axios base URL is in `frontend/src/Axios/axios.js`. Make sure it points to the backend host/port.
- This repo contains examples and a working dev server started during setup. Replace the provided JWT secret with a secure value for production.

License
- MIT


