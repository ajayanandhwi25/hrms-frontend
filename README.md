# HRMS Lite – Full Stack Assignment

## Overview
HRMS Lite is a lightweight Human Resource Management System built as part of a full-stack coding assignment.
It allows an admin to manage employee records and track daily attendance using a clean and professional interface.

The application focuses on core HR operations and avoids unnecessary over-engineering.

---

## Features

### Employee Management
- Add new employees with unique Employee ID
- View list of all employees
- Delete employees
- Server-side validation for required fields and duplicate entries

### Attendance Management
- Mark daily attendance (Present / Absent)
- View attendance records for each employee
- Proper error handling and user feedback

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

### Backend
- Python
- FastAPI
- SQLAlchemy
- SQLite

### Deployment
- Frontend: Vercel
- Backend: Render

---

## Live Application

- **Frontend URL:** https://hrms-frontend-dw4gtqbxd-ajay-anands-projects-136b5f19.vercel.app
- **Backend API:** https://hrms-backend-nws5.onrender.com
- **Swagger Docs:** https://hrms-backend-nws5.onrender.com/docs#/

---

## Run Locally

### Backend
```bash
cd hrms-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload