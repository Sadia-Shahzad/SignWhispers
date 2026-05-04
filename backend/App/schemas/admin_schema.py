from pydantic import BaseModel
from typing import Optional

class UpdateRoleSchema(BaseModel):
    role: str  # "admin" or "user"

class ApproveFeedbackSchema(BaseModel):
    is_approved: bool