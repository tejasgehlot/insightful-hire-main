from transformers import pipeline
from sentence_transformers import SentenceTransformer
from pyod.models.iforest import IsolationForest

class ModelRegistry:
    ner = None
    zero_shot = None
    embedder = None
    qg = None
    code_embedder = None
    anomaly_model = None

def load_models():
    ModelRegistry.ner = pipeline(
        "ner",
        model="dslim/bert-base-NER",
        aggregation_strategy="simple"
    )

    ModelRegistry.zero_shot = pipeline(
        "zero-shot-classification",
        model="facebook/bart-large-mnli"
    )

    ModelRegistry.embedder = SentenceTransformer(
        "sentence-transformers/all-mpnet-base-v2"
    )

    ModelRegistry.qg = pipeline(
        "text2text-generation",
        model="google/flan-t5-large"
    )

    ModelRegistry.code_embedder = SentenceTransformer(
        "microsoft/codebert-base"
    )

    ModelRegistry.anomaly_model = IsolationForest()
