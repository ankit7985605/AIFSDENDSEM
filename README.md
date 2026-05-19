# AI-Based Smart Complaint Management System

A full-stack MERN (MongoDB, Express, React, Node.js) application built for registering, tracking, and managing citizen complaints with AI-powered analysis.

## Features

- **Authentication**: Secure Signup and Login using JWT and bcrypt.
- **Complaint Registration**: Citizens can register complaints with location and category.
- **AI Analysis**: Automatically analyzes the complaint using OpenRouter AI to determine:
  - Priority (High, Medium, Low)
  - Recommended Department
  - Brief Summary
  - Auto-generated response for the citizen
- **Search & Tracking**: Citizens can search complaints by location and track the status.
- **Modern UI**: Clean, responsive, and professional public service aesthetic.

## Tech Stack

- **Frontend**: React.js + Vite, Axios, React Router, CSS Modules/Vanilla CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas with Mongoose
- **AI Integration**: OpenRouter API (OpenAI compatible)

## Setup & Local Development

### 1. Clone the repository
\`\`\`bash
git clone <your-repo-link>
cd <project-folder>
\`\`\`

### 2. Backend Setup
\`\`\`bash
cd server
npm install
\`\`\`
Create a `.env` file in the `server` folder with the following variables:
\`\`\`env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
OPENROUTER_API_KEY=your_openrouter_api_key
\`\`\`
Start the backend server:
\`\`\`bash
npm run dev
\`\`\`

### 3. Frontend Setup
Open a new terminal window:
\`\`\`bash
cd client
npm install
\`\`\`
Start the Vite development server:
\`\`\`bash
npm run dev
\`\`\`

The app will be running at \`http://localhost:5173\`.

## Deployment Instructions

### Backend (Render)
1. Push your code to GitHub.
2. Go to Render.com and create a new **Web Service**.
3. Connect your GitHub repo and select the `backend` folder (or set the root directory to `backend`).
4. Build Command: `npm install`
5. Start Command: `node index.js`
6. Add your Environment Variables (`MONGO_URI`, `JWT_SECRET`, `OPENROUTER_API_KEY`) in the Render dashboard.

### Frontend (Render or Vercel)
1. If using **Vercel** (recommended for Vite React):
   - Import the GitHub repo.
   - Set the Root Directory to `frontend`.
   - Framework Preset: Vite.
   - Add Environment Variable: `VITE_API_URL` (Set this to your Render backend URL, e.g., `https://your-backend.onrender.com/api`).
   - Note: You will need to update `frontend/src/context/AuthContext.jsx` and `frontend/src/components/...` to use `import.meta.env.VITE_API_URL` instead of `http://localhost:5000/api` for production.

---
*Built for B.Tech 4th Semester ESE Project*
