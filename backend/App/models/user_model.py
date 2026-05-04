
def user_helper(user):
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user.get("role", "user"),
        "is_admin": user.get("role") == "admin",  # ✅ yeh add kiya
        "is_premium": user.get("is_premium", False),
        "premium_type": user.get("premium_type"),
        "premium_start": user.get("premium_start"),
        "premium_end": user.get("premium_end")
    }