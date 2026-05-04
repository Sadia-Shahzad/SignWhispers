# auth.py
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from bson import ObjectId
from google.oauth2 import id_token
from google.auth.transport import requests
from App.database.database import users_collection, tokens_collection, reset_tokens_collection
import os
from dotenv import load_dotenv

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")
GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")

security = HTTPBearer()

tokens_collection.create_index("expires_at", expireAfterSeconds=0)
reset_tokens_collection.create_index("expires_at", expireAfterSeconds=0)

# ---------------- ACCESS TOKEN (7 days) ----------------
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(days=7)  # ✅ fix
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ---------------- REFRESH TOKEN (10 min) ----------------
def create_refresh_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=10)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

# ---------------- VERIFY JWT TOKEN ----------------
def verify_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except JWTError:
        return None

# ---------------- GOOGLE OAUTH VERIFICATION ----------------
def verify_google_token(token: str):
    try:
        idinfo = id_token.verify_oauth2_token(token, requests.Request(), GOOGLE_CLIENT_ID)
        return {
            "email": idinfo["email"],
            "name": idinfo.get("name"),
            "google_id": idinfo["sub"]
        }
    except Exception:
        return None

# ---------------- CURRENT USER DEPENDENCY ----------------
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    payload = verify_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    user = users_collection.find_one({"_id": ObjectId(payload["id"])})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return user

# ---------------- OPTIONAL: EXPIRED TOKENS CLEANUP ----------------
def cleanup_expired_tokens():
    tokens_deleted = tokens_collection.delete_many({"expires_at": {"$lt": datetime.utcnow()}})
    reset_deleted = reset_tokens_collection.delete_many({"expires_at": {"$lt": datetime.utcnow()}})
    print(f"Expired tokens deleted: {tokens_deleted.deleted_count}")
    print(f"Expired reset tokens deleted: {reset_deleted.deleted_count}")