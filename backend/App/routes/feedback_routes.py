from fastapi import APIRouter, Depends, HTTPException
from datetime import datetime
from bson import ObjectId

from App.schemas.feedback_schema import FeedbackRequest
from App.database.database import feedback_collection, users_collection
from App.core.auth import verify_token
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

router = APIRouter()

security = HTTPBearer()


@router.post("/feedback")
def submit_feedback(
    data: FeedbackRequest,
    credentials: HTTPAuthorizationCredentials = Depends(security)
):

    payload = verify_token(credentials.credentials)

    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")

    db_user = users_collection.find_one({"_id": ObjectId(payload["id"])})

    feedback_collection.insert_one({
        "user_id": str(db_user["_id"]),
        "name": db_user["name"],
        "email": db_user["email"],
        "rating": data.rating,
        "feedback_text": data.feedback_text,
        "is_approved": False,
        "created_at": datetime.utcnow()
    })

    return {"message": "Thank you for your feedback"}