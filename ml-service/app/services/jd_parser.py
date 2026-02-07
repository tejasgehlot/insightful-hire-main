from app.core.model_registry import ModelRegistry

def parse_jd(text: str):
    ner_results = ModelRegistry.ner(text)

    skills = [
        ent["word"] for ent in ner_results
        if ent["entity_group"] in ["MISC", "ORG"]
    ]

    role_labels = [
        "frontend developer",
        "backend developer",
        "full stack developer",
        "data analyst",
        "machine learning engineer"
    ]

    role_pred = ModelRegistry.zero_shot(text, role_labels)
    experience_pred = ModelRegistry.zero_shot(
        text, ["fresher", "mid level", "senior"]
    )

    return {
        "skills": list(set(skills)),
        "role": role_pred["labels"][0],
        "experience": experience_pred["labels"][0],
        "confidence": {
            "role": role_pred["scores"][0],
            "experience": experience_pred["scores"][0]
        }
    }
