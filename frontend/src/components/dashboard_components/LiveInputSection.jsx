import React, { useState, useRef, useEffect } from "react";
import { FiMic, FiMaximize } from "react-icons/fi";
import cameraImage from "../../assets/camera-image.png";
import Webcam from "react-webcam";
import { Hands } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";

const LiveInputSection = ({ isLive, onPrediction }) => {

  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(null);

  const webcamRef = useRef(null);
  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const handsRef = useRef(null);

  const lastPredictionTime = useRef(0);
  const lastPredictionValue = useRef(null);
  const sessionStartTime = useRef(null);

  const canvasRef = useRef(document.createElement("canvas"));

  // --- MediaPipe start/stop: isLive change hone par ---
  useEffect(() => {
    if (!isLive) {
      // Camera band: sab cleanup karo
      if (cameraRef.current) {
        cameraRef.current.stop();
        cameraRef.current = null;
      }
      if (handsRef.current) {
        handsRef.current.close();
        handsRef.current = null;
      }
      sessionStartTime.current = null;
      lastPredictionValue.current = null;
      setCountdown(null);
      return;
    }

    // Camera chalu: MediaPipe initialize karo
    const startMediaPipe = () => {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const hands = new Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.5,
      });

      hands.onResults(async (results) => {
        // Koi hand nahi mila — countdown reset
        if (
          !results.multiHandLandmarks ||
          results.multiHandLandmarks.length === 0
        ) {
          sessionStartTime.current = null;
          setCountdown(null);
          return;
        }

        // Hand mila — 3s hold timer shuru
        if (!sessionStartTime.current) {
          sessionStartTime.current = Date.now();
        }

        const elapsed = Date.now() - sessionStartTime.current;
        const remaining = Math.ceil((3000 - elapsed) / 1000);

        // Abhi 3s nahi hue — countdown dikhao
        if (elapsed < 3000) {
          setCountdown(remaining);
          return;
        }

        setCountdown(null);

        // 21 landmarks flatten karo (x,y,z) → 63 numbers
        const landmarks = results.multiHandLandmarks[0];
        const flatLandmarks = landmarks.flatMap(({ x, y, z }) => [x, y, z]);

        try {
          setIsProcessing(true);

          // POST to /predict → sign character wapas aata hai
          const response = await fetch("http://localhost:8000/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ landmarks: flatLandmarks }),
          });

          const data = await response.json();

          const now = Date.now();
          const isSameGesture = data.prediction === lastPredictionValue.current;
          const withinCooldown = now - lastPredictionTime.current < 2500;

          // Same gesture 2.5s ke andar — skip karo (duplicate avoid)
          if (isSameGesture && withinCooldown) return;

          lastPredictionTime.current = now;
          lastPredictionValue.current = data.prediction;
          sessionStartTime.current = null; // Next sign ke liye reset

          // Detected character Dashboard ko bhejo
          onPrediction(data.prediction);
        } catch (err) {
          console.error("Prediction error:", err);
        } finally {
          setIsProcessing(false);
        }
      });

      // Har frame mirror karke MediaPipe ko bhejo
      const camera = new Camera(videoElement, {
        onFrame: async () => {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext("2d");
          canvas.width = videoElement.videoWidth;
          canvas.height = videoElement.videoHeight;
          ctx.save();
          ctx.scale(-1, 1);
          ctx.drawImage(videoElement, -canvas.width, 0, canvas.width, canvas.height);
          ctx.restore();
          await hands.send({ image: canvas });
        },
        width: 640,
        height: 480,
      });

      camera.start();
      cameraRef.current = camera;
      handsRef.current = hands;
    };

    // Webcam ready hone ka wait
    const timer = setTimeout(startMediaPipe, 500);
    return () => clearTimeout(timer);
  }, [isLive, onPrediction]);

  return (
    <div className="relative w-full h-75 sm:h-100 lg:h-full xl:h-140 rounded-2xl overflow-hidden shadow-lg border border-slate-200">
      {isLive ? (
        <div ref={webcamRef} className="w-full h-full overflow-hidden rounded-2xl">

          {/* Hidden video — MediaPipe Camera ke liye */}
          <video ref={videoRef} autoPlay playsInline style={{ display: "none" }} />

          {/* Visible webcam feed */}
          <Webcam
            audio={false}
            mirrored={true}
            className="w-full h-full object-cover rounded-2xl"
            videoConstraints={{ width: 1280, height: 720, facingMode: "user" }}
          />

          {/* Status bar: countdown / detecting / idle */}
          <div className="absolute top-16 left-4 right-4 flex justify-center">
            <div className="bg-black/70 backdrop-blur px-4 py-2 rounded-xl border border-white/10 shadow">
              {countdown !== null ? (
                <span className="text-blue-400 text-sm font-bold">
                  Hold still... {countdown}s
                </span>
              ) : isProcessing ? (
                <span className="text-yellow-400 text-sm font-semibold">
                  Detecting...
                </span>
              ) : (
                <span className="text-white/50 text-sm">
                  Show a hand gesture...
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="w-full h-full bg-cover bg-center rounded-2xl"
          style={{ backgroundImage: `url(${cameraImage})` }}
        />
      )}

      {/* LIVE BADGE */}
      {isLive && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/70 backdrop-blur px-3 py-1.5 rounded-full border border-white/10 shadow">
          <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-white text-xs font-bold tracking-wide">LIVE INPUT</span>
        </div>
      )}
    </div>
  );
};

export default LiveInputSection;