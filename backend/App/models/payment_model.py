def payment_helper(payment):

    return {
        "id": str(payment["_id"]),
        "user_id": str(payment["user_id"]),
        "stripe_session_id": payment["stripe_session_id"],
        "amount": payment["amount"],
        "currency": payment["currency"],
        "plan_type": payment["plan_type"],
        "status": payment["status"],
        "created_at": payment["created_at"]
    }