
# RESUME EDITOR

A web-based resume editor that allows users to 
- Upload, edit their resumes
- Enhance specific sections using a mock AI backend
- Save and retrieve resume data via a FastAPI backend
- Download the final resume in `.json` format

---


## Project Structure

resume-editor/  
├── frontend/   # React.js application  
└── backend/    # FastAPI server


---


## Features

### Frontend (React.js)

- **Upload Resume:** Accept `.pdf` or `.docx` files (mock parsed with dummy data).
- **Edit Resume:** Edit fields like name, experience, education, and skills.
- **Enhance with AI:** Button to enhance individual sections using `/ai-enhance`.
- **Save Resume:** Send full resume JSON to the backend via `/save-resume`.
- **Download:** Download the edited resume as a `.json` file.

### Backend (FastAPI)

- **POST `/ai-enhance`:** Accepts a section and returns an improved version (mocked).
- **POST `/save-resume`:** Saves resume JSON in memory or to disk.


---


## Setup Instructions

### Frontend Setup (React.js)
```bash
cd frontend
npm install
npm start
```

The app will start on `http://localhost:3000`.

---

### Backend Setup (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
Or manually:

```bash
pip install fastapi uvicorn python-multipart
```

The server will start on `http://localhost:8000`.


---

