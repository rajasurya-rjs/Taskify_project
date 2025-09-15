# Installation
Run the following command to clone the repository
```
git clone https://github.com/alokyadav1/mern-todo-app.git
```
Go to ```frontend``` and ```backend``` directory to install packages
```
cd frontend
## Taskify

Taskify is a simple, full-stack To‑Do application (MERN-style):
- Backend: Node.js + Express + MongoDB
- Frontend: React

This repository contains two main folders: `backend/` and `frontend/`. The app supports user authentication, task creation, task categorization, and a scheduler for background jobs.

## Table of contents
- Features
- Tech stack
- Repo structure
- Prerequisites
- Setup (backend)
- Setup (frontend)
- Environment variables
- Git tips (common issues)
- Notes
- Contributing
- License

## Features
- User registration and login (JWT)
- Create, update, delete tasks
- Filter tasks by category/status
- Background scheduler (see `scheduler/`)
- Forgot / reset password via email

## Tech stack
- Node.js, Express
- MongoDB (Mongoose)
- React (create-react-app)
- Axios for HTTP requests
- Tailwind + MUI for UI utilities

## Repo structure (top-level)

```
backend/         # Express API, models, controllers, routes, scheduler
frontend/        # React app
readme.md        # This file
LICENSE
```

Inside `backend/` you'll find `server.js`, `models/`, `controllers/`, `routes/`, `middleware/`, and `scheduler/`.

Inside `frontend/` the React source lives under `src/` and Axios config is under `src/Axios/axios.js`.

## Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (Atlas or local)

## Setup — Backend

1. Open a terminal and install dependencies:

```bash
cd backend
npm install
```

2. Create a `.env` file inside the `backend/` folder with the following keys (example):

```
MONGO_URI=your_mongo_connection_string
JWT_SECRET=replace_with_a_long_random_secret
GMAIL_USERNAME=your_email@example.com
GMAIL_PASSWORD=your_email_password_or_app_password
PORT=7123
```

3. Run the backend (development using nodemon):

```bash
npm run dev
```

Or run in production mode:

```bash
npm start
```

By default the example above uses port `7123` — change `PORT` in `.env` if needed.

## Setup — Frontend

1. Install dependencies and start the dev server:

```bash
cd frontend
npm install
npm start
```

2. Make sure the frontend Axios base URL points to your backend host/port. Edit:

```
frontend/src/Axios/axios.js
```

## Environment variables
Add these to `backend/.env` (do not commit `.env`):

- MONGO_URI — MongoDB connection string
- JWT_SECRET — a long random string used to sign JWTs
- GMAIL_USERNAME — (optional) sender email for forgot-password emails
- GMAIL_PASSWORD — (optional) email account password / app password
- PORT — backend server port (default example: 7123)

## Git tips / Common issues

- If `git push origin main` fails with "src refspec main does not match any":

```bash
# create or rename your local branch to main
git branch -M main
git add .
git commit -m "Initial commit"
# add remote if you haven't already
git remote add origin <your-remote-url>
git push -u origin main
```

- If you see the error about `.git/index.lock` ("Unable to create .git/index.lock"), a previous git process left a lock file. Usually safe fix:

```bash
rm -f .git/index.lock
```

If there are suspended jobs in your shell (for example a `git add .` that was suspended), list jobs and terminate/un-suspend them:

```bash
jobs -l
# to bring a suspended job to foreground
fg %1
# or kill by PID
kill <pid>
```

## API (not exhaustive)

- POST /auth/register — register new user (returns token)
- POST /auth/login — login (returns token)
- GET /auth/getuser — get current user (requires Authorization header)
- GET /tasks — list tasks (filter with query params like `?category=work`)
- POST /tasks — create task
- PATCH /tasks/:id — update task
- DELETE /tasks/:id — delete task

Check `backend/routes/` and `backend/controllers/` for full endpoint implementations.

## Notes
- Don't commit secrets. Add `.env` and `node_modules` to `.gitignore`.
- Scheduler: `backend/scheduler/scheduler.js` contains scheduled jobs; ensure your environment supports running background jobs if you enable it.
- Frontend Axios base URL: `frontend/src/Axios/axios.js`.

## Contributing
- Fork the repo, create a feature branch, open a PR. Keep changes small and focused.

## License
This project is provided under the MIT License. See `LICENSE` for details.


