from fastapi import APIRouter
from app.services.rubric_grader import grade_answer

router = APIRouter()

@router.post("/grade-answer")
def grade_answer_api(payload: dict):
    result = grade_answer(payload["answer"], payload["model_answer"])
    return {
        "status": "ok",
        "payload": result,
        "confidence": 0.88,
        "explain": "Hybrid embedding + LLM rubric grading"
    }
