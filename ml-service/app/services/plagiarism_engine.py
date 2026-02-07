from app.core.model_registry import ModelRegistry
import numpy as np

def check_plagiarism(texts: list):
    embeddings = ModelRegistry.embedder.encode(texts)
    sim = np.inner(embeddings, embeddings)
    max_sim = float(sim.max())

    return {
        "similarity": max_sim,
        "flag": "high_risk" if max_sim > 0.85 else "low_risk"
    }
