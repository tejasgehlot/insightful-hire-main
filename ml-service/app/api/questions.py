from fastapi import APIRouter
from app.services.question_generator import generate_questions

router = APIRouter()

@router.post("/generate-questions")
def generate_questions_api(payload: dict):
    questions = generate_questions(
        payload["skill"], payload["difficulty"]
    )
    return {
        "status": "ok",
        "payload": questions,
        "confidence": 0.85,
        "explain": "Questions generated using FLAN-T5"
    }
