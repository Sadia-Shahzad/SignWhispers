
from pymongo import MongoClient
from App.core.config import MONGO_URI, DB_NAME

client = MongoClient(MONGO_URI, tlsAllowInvalidCertificates=True)  # ✅ fix

db = client[DB_NAME]

users_collection = db["users"]
tokens_collection = db["refresh_tokens"]
reset_tokens_collection = db["password_reset_tokens"]
feedback_collection = db["feedback"]
payment_collection = db["payment"]
history_collection = db["translation_history"]
