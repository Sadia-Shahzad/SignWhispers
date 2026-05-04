import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("Eleven_Labs_API_Key")

VOICE_IDS = {
    "male": "LcEgfwthyhQKQFCIQuxY",     
    "female": "XyCeaHmsMiTSGoahxpyB"    
}

# Runtime state — updated via /settings endpoint
current_voice_id = VOICE_IDS["female"]  # matches defaultSettings in frontend
current_volume = 0.8                    # 80% default, stored as 0.0–1.0


def set_voice(gender: str):
    global current_voice_id
    current_voice_id = VOICE_IDS.get(gender, VOICE_IDS["female"])


def set_volume(volume_percent: int):
    """Accepts 0 to 100 from frontend, converts to 0.0 to 1.0 for ElevenLabs."""
    global current_volume
    current_volume = max(0.0, min(1.0, volume_percent / 100))


def convert_text_to_speech(text: str) -> bytes:
    url = f"https://api.elevenlabs.io/v1/text-to-speech/{current_voice_id}"

    headers = {
        "xi-api-key": API_KEY,
        "Content-Type": "application/json"
    }

    data = {
        "text": text,
        "model_id": "eleven_multilingual_v2",
        "voice_settings": {
            "stability": 0.5,
            "similarity_boost": 0.75,
            "volume": current_volume   # applies the saved volume
        }
    }

    response = requests.post(url, headers=headers, json=data)

    if response.status_code != 200:
        raise Exception(f"ElevenLabs API error: {response.status_code} - {response.text}")

    return response.content