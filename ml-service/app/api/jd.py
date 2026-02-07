from fastapi import APIRouter
from app.services.jd_parser import parse_jd

router = APIRouter()

@router.post("/parse-jd")
def parse_jd_api(payload: dict):
    result = parse_jd(payload["text"])
    return {
        "status": "ok",
        "payload": result,
        "confidence": 0.9,
        "explain": "JD parsed using NER + zero-shot classification"
    }
