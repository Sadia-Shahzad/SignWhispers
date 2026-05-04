
def history_helper(history):
    return {
        "id": str(history["_id"]),
        "user_id": str(history["user_id"]),
        "detected_text": history["detected_text"],
        "translated_text": history["translated_text"],
        "language": history["language"],
        "created_at": history["created_at"]
    }