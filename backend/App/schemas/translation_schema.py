from pydantic import BaseModel

class TranslationRequest(BaseModel):
    detected_text: str
    language: str