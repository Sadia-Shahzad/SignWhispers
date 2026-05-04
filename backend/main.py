from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.requests import Request
from pydantic import BaseModel
from ML_model.prediction import predict_gesture
from APIs.translator_API import translate_text
from APIs.ElevenLabs_API import set_voice, set_volume, convert_text_to_speech
from App.routes import auth_routes, feedback_routes, payment_routes, translation_routes, admin_routes
from App.routes.auth_routes import get_current_active_user
import io
import stripe
from App.database.database import payment_collection, users_collection
from bson import ObjectId
from datetime import datetime


app = FastAPI(title="SignWhisper API")

# CORS middleware — explicit origins, right after app creation
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#  Global exception handler — ensures CORS headers survive unhandled errors
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": str(exc)},
        headers={"Access-Control-Allow-Origin": "http://localhost:5173"},
    )


# --- Pydantic Models ---
class LandmarkInput(BaseModel):
    landmarks: list[float]

class TextRequest(BaseModel):
    text: str

class TranslationRequest(BaseModel):
    text: str
    target_language: str

class SettingsRequest(BaseModel):
    voice: str   # "male" or "female"
    volume: int  # 0–100


# --- Routers ---
app.include_router(auth_routes.router)
app.include_router(feedback_routes.router)
app.include_router(payment_routes.router)
app.include_router(translation_routes.router)
app.include_router(admin_routes.router)


# --- Routes ---
@app.get("/")
def root():
    return {"message": "SignWhisper API running"}


@app.get("/users/me")
async def get_user_details(current_user=Depends(get_current_active_user)):
    return {
        "name": current_user.name,
        "email": current_user.email,
        "is_admin": current_user.is_admin,
        "is_premium": current_user.is_premium,
    }


@app.post("/predict")
def predict(data: LandmarkInput):
    if not data.landmarks:
        raise HTTPException(status_code=400, detail="No landmarks received")
    try:
        result = predict_gesture(data.landmarks)
        return {"prediction": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/settings")
async def save_settings(request: SettingsRequest):
    if request.voice not in ["male", "female"]:
        raise HTTPException(status_code=400, detail="Invalid voice option")
    if not (0 <= request.volume <= 100):
        raise HTTPException(status_code=400, detail="Volume must be between 0 and 100")
    set_voice(request.voice)
    set_volume(request.volume)
    return {"message": "Settings saved", "voice": request.voice, "volume": request.volume}


@app.post("/text-to-speech")
async def text_to_speech(request: TextRequest):
    if not request.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    try:
        audio_bytes = convert_text_to_speech(request.text)
        return StreamingResponse(
            io.BytesIO(audio_bytes),
            media_type="audio/mpeg",
            headers={"Content-Disposition": "inline; filename=output.mp3"},
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/translate")
def translate(request: TranslationRequest):
    try:
        result = translate_text(request.text, request.target_language)
        return {"translated_text": result}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    