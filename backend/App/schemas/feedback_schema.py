from pydantic import BaseModel, validator

class FeedbackRequest(BaseModel):
    rating: int
    feedback_text: str

    @validator('rating')
    def rating_valid(cls, v):
        if not 1 <= v <= 5:
            raise ValueError("Rating must be between 1 and 5")
        return v

    @validator('feedback_text')
    def feedback_valid(cls, v):
        v = v.strip()
        if not v:
            raise ValueError("Feedback cannot be empty")
        if len(v) < 10:
            raise ValueError("Feedback must be at least 10 characters")
        if len(v) > 500:
            raise ValueError("Feedback cannot exceed 500 characters")
        return v