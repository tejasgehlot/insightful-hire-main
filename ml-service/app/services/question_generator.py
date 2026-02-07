from app.core.model_registry import ModelRegistry

def generate_questions(skill: str, difficulty: str):
    prompt = f"""
    Generate 3 MCQ questions for skill: {skill}
    Difficulty: {difficulty}
    Each question must have 4 options and 1 correct answer.
    Return JSON only.
    """

    response = ModelRegistry.qg(prompt, max_length=512)[0]["generated_text"]
    return response
