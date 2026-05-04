from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from App.database.database import history_collection  # ✅ history_collection
from App.core.auth import verify_token
from bson import ObjectId
from datetime import datetime
from pydantic import BaseModel
from typing import Optional

router = APIRouter()
security = HTTPBearer()

class TranslationSaveRequest(BaseModel):
    detected_text: str
    translated_text: Optional[str] = ""
    language: str = "en"

# ---------------- SAVE TRANSLATION ----------------
@router.post("/translations/save")
def save_translation(data: TranslationSaveRequest, credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    translated_text = "" if data.language == "en" else data.translated_text

    history_collection.insert_one({
        "user_id": ObjectId(payload["id"]),
        "detected_text": data.detected_text,
        "translated_text": translated_text,
        "language": data.language,
        "created_at": datetime.utcnow()
    })

    return {"message": "Translation saved successfully"}


# ---------------- GET HISTORY ----------------
@router.get("/translations/history")
def get_history(credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    records = list(
        history_collection
        .find({"user_id": ObjectId(payload["id"])})
        .sort("created_at", -1)
    )

    history = []
    for r in records:
        history.append({
            "id": str(r["_id"]),
            "detected_text": r.get("detected_text", ""),
            "translated_text": r.get("translated_text", ""),
            "language": r.get("language", "en"),
            "created_at": r.get("created_at", "").isoformat() if r.get("created_at") else ""
        })

    return {"history": history}


