from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uuid
import json
import os

app = FastAPI()

# CORS Middleware for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class EnhanceRequest(BaseModel):
    section: str
    content: str

class SaveResumeRequest(BaseModel):
    resume: dict

@app.post("/ai-enhance")
def ai_enhance(req: EnhanceRequest):
    # Mock enhancement
    enhanced = req.content + " (enhanced by AI)"
    return {"enhanced_content": enhanced}

@app.post("/save-resume")
def save_resume(req: SaveResumeRequest):
    resume_id = str(uuid.uuid4())
    os.makedirs("saved_resumes", exist_ok=True)
    path = f"saved_resumes/{resume_id}.json"
    with open(path, "w") as f:
        json.dump(req.resume, f, indent=2)
    return {"message": "Resume saved", "id": resume_id}
