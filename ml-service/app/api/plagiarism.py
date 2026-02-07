from fastapi import APIRouter
from app.services.plagiarism_engine import check_plagiarism

router = APIRouter()

@router.post("/check-plagiarism")
def plagiarism_api(payload: dict):
    result = check_plagiarism(payload["texts"])
    return {
        "status": "ok",
        "payload": result,
        "confidence": 0.9,
        "explain": "Embedding similarity based plagiarism check"
    }
