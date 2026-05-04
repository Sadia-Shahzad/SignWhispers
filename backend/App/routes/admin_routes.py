from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from bson import ObjectId
from datetime import datetime
from App.database.database import users_collection, feedback_collection, payment_collection
from App.core.auth import verify_token
from App.models.user_model import user_helper
router = APIRouter()
security = HTTPBearer()


# ---------------- DASHBOARD STATS ----------------
@router.get("/admin/dashboard")
def get_dashboard_stats():

    total_users = users_collection.count_documents({})
    premium_users = users_collection.count_documents({"is_premium": True})
    total_feedbacks = feedback_collection.count_documents({})
    pending_feedbacks = feedback_collection.count_documents({"is_approved": False})

    payments = list(payment_collection.find({"status": "success"}))
    total_amount = sum(p.get("amount", 0) for p in payments) / 100

    recent_users = list(users_collection.find().sort("created_at", -1).limit(5))
    recent_payments = list(payment_collection.find().sort("created_at", -1).limit(5))
    recent_feedbacks = list(feedback_collection.find().sort("created_at", -1).limit(5))

    activity = []

    for u in recent_users:
        activity.append({
            "type": "NEW USER",
            "message": f"New user registered: {u.get('name', 'Unknown')}",
            "time": str(u.get("created_at", ""))
        })

    for p in recent_payments:
        activity.append({
            "type": "PAYMENT",
            "message": f"Payment received: ${p.get('amount', 0) / 100}",
            "time": str(p.get("created_at", ""))
        })

    for f in recent_feedbacks:
        activity.append({
            "type": "FEEDBACK",
            "message": f"Feedback received from: {f.get('name', 'Unknown')}",
            "time": str(f.get("created_at", ""))
        })

    return {
        "total_users": total_users,
        "premium_users": premium_users,
        "total_feedbacks": total_feedbacks,
        "pending_feedbacks": pending_feedbacks,
        "total_payments": f"${total_amount:.2f}",
        "recent_activity": sorted(activity, key=lambda x: x["time"], reverse=True)[:10]
    }


# ---------------- GET ALL USERS ----------------
@router.get("/admin/users")
def get_all_users(
    page: int = 1,
    limit: int = 5,
    search: str = "",
    filter: str = "all"
):

    query = {}

    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"email": {"$regex": search, "$options": "i"}}
        ]

    if filter == "premium":
        query["is_premium"] = True

    total = users_collection.count_documents(query)
    skip = (page - 1) * limit

    users = list(users_collection.find(query).skip(skip).limit(limit))

    result = []
    for u in users:

        user_payments = list(payment_collection.find({
            "user_id": u["_id"],
            "status": "success"
        }))

        total_paid = sum(p.get("amount", 0) for p in user_payments) / 100

        result.append({
            "id": str(u["_id"]),
            "name": u.get("name"),
            "email": u.get("email"),
            "role": u.get("role", "user"),
            "is_premium": u.get("is_premium", False),
            "created_at": str(u.get("created_at", "")),
            "total_paid": f"${total_paid:.2f}"
        })

    return {
        "users": result,
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit
    }


# ---------------- UPDATE USER ROLE ----------------
@router.put("/admin/users/{user_id}/role")
def update_user_role(user_id: str, role: str):

    if role not in ["admin", "user"]:
        raise HTTPException(status_code=400, detail="Role must be 'admin' or 'user'.")

    user = users_collection.find_one({"_id": ObjectId(user_id)})

    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    users_collection.update_one(
        {"_id": ObjectId(user_id)},
        {"$set": {"role": role}}
    )

    return {"message": f"User role updated to '{role}' successfully."}


# ---------------- GET ALL FEEDBACK (ADMIN) ----------------
@router.get("/admin/feedback")
def get_all_feedback(
    page: int = 1,
    limit: int = 10,
    search: str = "",
    rating: int = 0
):

    query = {}

    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"feedback_text": {"$regex": search, "$options": "i"}}
        ]

    if rating > 0:
        query["rating"] = rating

    total = feedback_collection.count_documents(query)
    skip = (page - 1) * limit

    feedbacks = list(
        feedback_collection.find(query)
        .sort("created_at", -1)
        .skip(skip)
        .limit(limit)
    )

    result = []

    for f in feedbacks:
        result.append({
            "id": str(f["_id"]),
            "name": f.get("name"),
            "email": f.get("email"),
            "rating": f.get("rating"),
            "feedback_text": f.get("feedback_text"),
            "is_approved": f.get("is_approved", False),
            "created_at": str(f.get("created_at", ""))
        })

    return {
        "feedbacks": result,
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit
    }


# ---------------- GET APPROVED FEEDBACK (PUBLIC) ----------------
@router.get("/feedback/approved")
def get_approved_feedback():
    # Sirf approved feedbacks reviews page ke liye
    feedbacks = list(feedback_collection.find({"is_approved": True}).sort("created_at", -1))
    
    result = []
    for f in feedbacks:
        result.append({
            "id": str(f["_id"]),
            "name": f.get("name"),
            "rating": f.get("rating"),
            "feedback_text": f.get("feedback_text"),
            "created_at": str(f.get("created_at", ""))
        })
    return result


# ---------------- APPROVE / REJECT FEEDBACK ----------------
@router.put("/admin/feedback/{feedback_id}/approve")
def approve_feedback(feedback_id: str, is_approved: bool):

    feedback = feedback_collection.find_one({"_id": ObjectId(feedback_id)})

    if not feedback:
        raise HTTPException(status_code=404, detail="Feedback not found.")

    feedback_collection.update_one(
        {"_id": ObjectId(feedback_id)},
        {"$set": {"is_approved": is_approved}}
    )

    status = "approved" if is_approved else "rejected"

    return {"message": f"Feedback {status} successfully."}


# ---------------- GET ALL PAYMENTS ----------------
@router.get("/admin/payments")
def get_all_payments(
    page: int = 1,
    limit: int = 10,
    search: str = ""
):

    payments = list(payment_collection.find().sort("created_at", -1))

    result = []

    for p in payments:

        user = users_collection.find_one({"_id": p.get("user_id")})

        result.append({
            "id": str(p["_id"]),
            "user_name": user.get("name") if user else "Unknown",
            "user_email": user.get("email") if user else "Unknown",
            "amount": f"${p.get('amount', 0) / 100:.2f}",
            "currency": p.get("currency", "usd").upper(),
            "status": p.get("status", "pending"),
            "plan_type": p.get("plan_type", "lifetime"),
            "created_at": str(p.get("created_at", ""))
        })

    if search:
        result = [
            r for r in result
            if search.lower() in r["user_name"].lower()
            or search.lower() in r["user_email"].lower()
        ]

    total = len(result)

    skip = (page - 1) * limit

    paginated = result[skip:skip + limit]

    return {
        "payments": paginated,
        "total": total,
        "page": page,
        "pages": (total + limit - 1) // limit
    }



