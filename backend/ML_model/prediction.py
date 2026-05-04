import pickle
import numpy as np

# Load model ONCE when server starts (not on every request)
with open("ML_model/RF_model.pkl", "rb") as f:
    model = pickle.load(f)

def predict_gesture(landmarks: list[float]) -> str:
    """
    landmarks: flat list of floats [x0,y0,z0, x1,y1,z1, ...]
    returns: predicted gesture label as string
    """
    input_array = np.array(landmarks).reshape(1, -1)  # shape: (1, 63) for 21 landmarks × 3
    prediction = model.predict(input_array)
    return str(prediction[0])