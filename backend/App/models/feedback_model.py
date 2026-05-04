def feedback_helper(feedback):

    return {
        "id": str(feedback["_id"]),
        "user_id": str(feedback["user_id"]),
        "name": feedback["name"],
        "email": feedback["email"],
        "rating": feedback["rating"],
        "feedback_text": feedback["feedback_text"],
        "is_approved": feedback.get("is_approved", False),
        "created_at": feedback["created_at"]
    }