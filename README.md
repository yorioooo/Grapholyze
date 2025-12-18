# Grapholyze 🖋️

Grapholyze is an AI-powered Handwriting Analysis application.

## 🚀 Getting Started for Collaborators

If you want to work on this project, follow these steps:

### 1. Clone the Repository
Open your terminal and run:
```bash
git clone https://github.com/yorioooo/Grapholyze.git
cd Grapholyze
```

### 2. Switch to Development Branch
All active work happens in the `development` branch:
```bash
git checkout development
```

### 3. Install Dependencies
You need to install libraries for both Backend and Frontend:

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### 4. Configure Environment Variables (.env)
Since `.env` files are not uploaded to GitHub for security, you must create them manually.

**Create `backend/.env`:**
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/graphology-ai
JWT_SECRET=rahasia_negara_123  <-- Ganti dengan secret key yang sama jika perlu
FLASK_AI_URL=http://localhost:5000/predict <-- Sesuaikan jika ada server AI
```

### 5. Run the Project
You need two terminals running simultaneously:

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app!

## 🤝 Workflow
1.  Always `git pull origin development` before starting work.
2.  Make your changes.
3.  `git add .` -> `git commit -m "pesan"` -> `git push origin development`.
