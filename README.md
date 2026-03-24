# CodeContestPlatform - Code Contest Platform

A full-stack, scalable coding judge platform built similarly to LeetCode or HackerRank. Users can create accounts, view algorithmic problems, write and submit code in multiple programming languages (C++, Java, Javascript, C) directly in an integrated Monaco editor, and receive instantaneous background grading securely through Judge0.

## 🏗️ Architecture Stack

- **Frontend:** React, Vite, Tailwind CSS, Monaco Editor
- **Backend API:** Node.js, Express, Zod (for validation)
- **Database:** PostgreSQL (with Prisma ORM)
- **Object Storage / Big Files:** Supabase Storage (storing oversized raw input/output test case datasets to keep the database lightweight)
- **Job Queue:** Redis & BullMQ
- **Background Worker:** A dedicated Node.js background process that picks up submissions from Redis, fetches the correct test cases from Supabase, seamlessly connects with Judge0 to execute the untrusted code, and finally updates the PostgreSQL database verdict (`"AC"`, `"TLE"`, `"FAILED"`, etc).
- **Execution Engine:** Judge0 API (a secure sandbox compilation/run environment)


## 🚀 Running Your Environment Locally

To run this platform directly on your local machine, open four separate terminal windows.

### 1. Database & Queue Docker Services
A `docker-compose.yml` is provided at the root. It will spin up **Redis** and **PostgreSQL**.
```bash
docker-compose up -d
```

### 2. Prepare the Backend
Navigate to the `backend` directory, install packages, and push the database schema:
```bash
cd backend
npm install
# Note: Ensure you have populated your backend/.env with your Supabase keys and DATABASE_URL
npx prisma generate
npx prisma db push
```

Start the primary Express HTTP backend:
```bash
npm run dev
```

### 3. Start the Background Worker
In a new terminal window inside the `backend` folder, run the worker that consumes the BullMQ submission queue:
```bash
cd backend
npm run worker
```

### 4. Start the Frontend Application
In a new terminal window, spin up the React Vite interface:
```bash
cd frontend
npm install
npm run dev
```
Open your browser to `http://localhost:5173`.


## 📝 Usage Configuration

### `.env` Structure
Ensure your backend `.env` contains:
```env
DATABASE_URL="postgres://postgres:postgres@localhost:6543/Coding-arena"
SUPABASE_URL="https://yourid.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="ey..."
JWT_SECRET_KEY="your-secret-key"
```

## 📜 License
MIT
