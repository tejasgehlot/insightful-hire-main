from sklearn.metrics.pairwise import cosine_similarity
from app.core.model_registry import ModelRegistry

def grade_answer(answer: str, model_answer: str):
    emb1 = ModelRegistry.embedder.encode(answer)
    emb2 = ModelRegistry.embedder.encode(model_answer)

    similarity = cosine_similarity([emb1], [emb2])[0][0]
    score = round(similarity * 10, 2)

    explanation = ModelRegistry.qg(
        f"Explain why this answer scored {score}/10:\n{answer}",
        max_length=150
    )[0]["generated_text"]

    return {
        "score": score,
        "explanation": explanation
    }
