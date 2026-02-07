from fastapi import FastAPI
from app.core.model_registry import load_models

from app.api import jd, questions, grading, plagiarism, anomaly

app = FastAPI(title="AI Assessment ML Service")

@app.on_event("startup")
def startup():
    load_models()

app.include_router(jd.router, prefix="/ml")
app.include_router(questions.router, prefix="/ml")
app.include_router(grading.router, prefix="/ml")
app.include_router(plagiarism.router, prefix="/ml")
app.include_router(anomaly.router, prefix="/ml")
