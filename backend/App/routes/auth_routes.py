from fastapi import APIRouter, HTTPException, Depends
from passlib.context import CryptContext
from datetime import datetime, timedelta
from bson import ObjectId
import secrets
import os
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from App.schemas.auth_schema import UserRegister, UserLogin, GoogleAuthRequest, ForgotPasswordRequest, ResetPasswordRequest
from App.database.database import users_collection, tokens_collection, reset_tokens_collection
from App.core.auth import create_access_token, create_refresh_token, verify_token
from App.services.email_service import send_reset_email
from App.models.user_model import user_helper
from types import SimpleNamespace
from pydantic import BaseModel

router = APIRouter()
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

# --- UTILITY: Get Current User ---
def get_current_active_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    
    db_user = users_collection.find_one({"_id": ObjectId(payload["id"])})
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return SimpleNamespace(
        name=db_user.get("name"),
        email=db_user.get("email"),
        is_admin=db_user.get("role") == "admin",
        is_premium=db_user.get("is_premium", False)
    )

# ---------------- REGISTER ----------------
@router.post("/register")
def register(user: UserRegister):
    if users_collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="User already exists")
    hashed_password = pwd_context.hash(user.password[:72])  # ✅ fix
    users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed_password,
        "auth_provider": "email",
        "role": "user",
        "is_premium": False,
        "premium_type": None,
        "premium_start": None,
        "premium_end": None,
        "created_at": datetime.utcnow()
    })
    return {"message": "User registered successfully"}


# ---------------- LOGIN ----------------
@router.post("/login")
def login(user: UserLogin):
    db_user = users_collection.find_one({"email": user.email})
    if not db_user or not pwd_context.verify(user.password[:72], db_user.get("password", "")):  # ✅ fix
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token({"id": str(db_user["_id"])})
    refresh_token = create_refresh_token({"id": str(db_user["_id"])})

    tokens_collection.insert_one({
        "user_id": str(db_user["_id"]),
        "refresh_token": refresh_token,
        "created_at": datetime.utcnow(),
        "expires_at": datetime.utcnow() + timedelta(days=7),  # ✅ fix
        "is_revoked": False
    })

    return {"access_token": access_token, "refresh_token": refresh_token}


# ---------------- GOOGLE AUTH ----------------
@router.post("/google")
def google_auth(data: GoogleAuthRequest):
    if not GOOGLE_CLIENT_ID:
        raise HTTPException(status_code=500, detail="Google Client ID not configured")
    try:
        google_user = id_token.verify_oauth2_token(
            data.token,
            google_requests.Request(),
            GOOGLE_CLIENT_ID
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid Google token")

    email = google_user["email"]
    name = google_user["name"]

    existing_user = users_collection.find_one({"email": email})
    if existing_user:
        user_id = str(existing_user["_id"])
        users_collection.update_one({"_id": existing_user["_id"]}, {"$set": {"auth_provider": "google"}})
    else:
        result = users_collection.insert_one({
            "name": name,
            "email": email,
            "password": None,
            "auth_provider": "google",
            "role": "user",
            "is_premium": False,
            "premium_type": None,
            "premium_start": None,
            "premium_end": None,
            "created_at": datetime.utcnow()
        })
        user_id = str(result.inserted_id)

    access_token = create_access_token({"id": user_id})
    refresh_token = create_refresh_token({"id": user_id})

    tokens_collection.insert_one({
        "user_id": user_id,
        "refresh_token": refresh_token,
        "created_at": datetime.utcnow(),
        "expires_at": datetime.utcnow() + timedelta(days=7),  # ✅ fix
        "is_revoked": False
    })

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "user": {"name": name, "email": email}
    }


# ---------------- FORGOT PASSWORD ----------------
@router.post("/forgot-password")
def forgot_password(data: ForgotPasswordRequest):
    user = users_collection.find_one({"email": data.email})
    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    raw_token = secrets.token_urlsafe(32)
    token_hash = pwd_context.hash(raw_token)

    try:
        reset_tokens_collection.insert_one({
            "user_id": str(user["_id"]),
            "token_hash": token_hash,
            "expires_at": datetime.utcnow() + timedelta(minutes=15),
            "created_at": datetime.utcnow()
        })
        print(f"✅ Token stored in DB!")
    except Exception as e:
        print(f"❌ DB ERROR: {e}")
        raise HTTPException(status_code=500, detail="Database error")

    try:
        send_reset_email(user["email"], raw_token)
    except Exception as e:
        print(f"📧 Email sending failed: {e}")
    
    return {"message": "Password reset email sent"}


# ---------------- RESET PASSWORD ----------------
@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest):
    tokens = reset_tokens_collection.find({"expires_at": {"$gt": datetime.utcnow()}})
    valid_token_doc = None
    for token_doc in tokens:
        if pwd_context.verify(data.token, token_doc["token_hash"]):
            valid_token_doc = token_doc
            break

    if not valid_token_doc:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    new_hashed_password = pwd_context.hash(data.new_password[:72])  # ✅ fix
    users_collection.update_one(
        {"_id": ObjectId(valid_token_doc["user_id"])},
        {"$set": {"password": new_hashed_password}}
    )
    reset_tokens_collection.delete_one({"_id": valid_token_doc["_id"]})

    return {"message": "Password reset successful"}


# ---------------- REFRESH TOKEN ----------------
@router.post("/refresh")
def refresh_token(refresh_token: str):
    payload = verify_token(refresh_token)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    token_doc = tokens_collection.find_one({
        "refresh_token": refresh_token,
        "is_revoked": False
    })

    if not token_doc or token_doc["expires_at"] < datetime.utcnow():
        raise HTTPException(status_code=401, detail="Token not found or expired")

    new_access_token = create_access_token({"id": payload["id"]})
    return {"access_token": new_access_token}


@router.get("/profile")
def profile(credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if payload is None:
        raise HTTPException(status_code=401, detail="Invalid token")
    db_user = users_collection.find_one({"_id": ObjectId(payload["id"])})
    user_data = user_helper(db_user) if db_user else None
    return {"message": "Protected route accessed", "user": user_data}


# Ek chota sa schema add karein top pe
class LogoutRequest(BaseModel):
    refresh_token: str


# ---------------- LOGOUT ----------------
@router.post("/logout")
def logout(data: LogoutRequest):
    token_doc = tokens_collection.find_one({
        "refresh_token": data.refresh_token,
        "is_revoked": False
    })

    if not token_doc:
        return {"message": "Token already revoked or not found"}

    tokens_collection.update_one(
        {"_id": token_doc["_id"]},
        {"$set": {"is_revoked": True}}
    )
    
    print(f" Token Revoked: {data.refresh_token[:10]}...")
    return {"message": "Logged out successfully"}