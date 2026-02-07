import numpy as np
from app.core.model_registry import ModelRegistry

def analyze_anomaly(features: list):
    X = np.array([features])
    score = ModelRegistry.anomaly_model.fit_predict(X)[0]

    return {
        "risk": "high" if score == -1 else "low"
    }
