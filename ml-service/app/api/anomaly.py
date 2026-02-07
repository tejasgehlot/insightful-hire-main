from fastapi import APIRouter
from app.services.anomaly_engine import analyze_anomaly

router = APIRouter()

@router.post("/analyze-anomaly")
def anomaly_api(payload: dict):
    result = analyze_anomaly(payload["features"])
    return {
        "status": "ok",
        "payload": result,
        "confidence": 0.8,
        "explain": "Isolation Forest based anomaly detection"
    }
