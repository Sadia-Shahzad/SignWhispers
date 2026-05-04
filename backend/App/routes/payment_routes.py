from fastapi import APIRouter, Depends, HTTPException, Request
from datetime import datetime
import stripe
from bson import ObjectId
import os
from App.database.database import users_collection, payment_collection
from App.core.auth import get_current_user
router = APIRouter()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")




@router.post("/create-checkout-session")
def create_checkout_session(current_user: dict = Depends(get_current_user)):
    try:
        user_id_str = str(current_user["_id"])
        print(f"Creating session for: {current_user.get('email')} (ID: {user_id_str})")

        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            mode="payment",
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": "SignWhisper | Lifetime Elite Access 🚀",
                        "description": (
                            "Transform your communication. Get unlimited real-time sign language "
                            "translation, exclusive AI voice models, and lifetime priority updates."
                        ),
                        "images": ["https://your-domain.com/premium-banner.png"],
                        "metadata": {
                            "plan_type": "lifetime",
                            "tier": "elite"
                        }
                    },
                    "unit_amount": 2000,
                    "tax_behavior": "inclusive",
                },
                "quantity": 1,
            }],
            success_url=f"{os.getenv('FRONTEND_URL', 'http://localhost:5173')}/success",
            cancel_url=f"{os.getenv('FRONTEND_URL', 'http://localhost:5173')}/profile",
            metadata={"user_id": user_id_str}
        )

        now = datetime.utcnow()

        # ✅ Payment table mein record insert karo — seedha SUCCESS
        payment_collection.insert_one({
            "user_id": current_user["_id"],
            "stripe_session_id": session.id,
            "amount": 2000,
            "currency": "usd",
            "plan_type": "lifetime",
            "status": "success",        # ✅ seedha success
            "created_at": now
        })

        # ✅ User table update karo — premium ON
        users_collection.update_one(
            {"_id": current_user["_id"]},
            {"$set": {
                "is_premium": True,
                "premium_type": "lifetime",
                "premium_start": now,
                "premium_end": None       # ✅ null rahega lifetime ke liye
            }}
        )

        return {"url": session.url}

    except Exception as e:
        print(f"Stripe Session Error: {e}")
        raise HTTPException(status_code=500, detail="Could not create stripe session")
    



