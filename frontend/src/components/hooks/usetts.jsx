import { useState, useRef } from "react";

const getVolumeFromSettings = () => {
  try {
    const saved = localStorage.getItem("voiceSettings");
    if (saved) {
      const parsed = JSON.parse(saved);
      return typeof parsed.volume === "number" ? parsed.volume / 100 : 0.8;
    }
  } catch {
    // ignore
  }
  return 0.8; // default 80%
};

const useTTS = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const audioRef = useRef(null);

  const speak = async (text) => {
    if (!text?.trim()) return;
    setError(null);
    setIsSpeaking(true);

    try {
      const res = await fetch("http://localhost:8000/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) throw new Error("TTS request failed");

      const blob = await res.blob();
      const audioUrl = URL.createObjectURL(blob);

      // Clean up previous audio
      if (audioRef.current) {
        audioRef.current.pause();
        URL.revokeObjectURL(audioRef.current.src);
      }

      const audio = new Audio(audioUrl);
      audio.volume = getVolumeFromSettings(); // apply saved volume
      audioRef.current = audio;

      audio.onended = () => setIsSpeaking(false);
      audio.onerror = () => {
        setError("Audio playback failed");
        setIsSpeaking(false);
      };

      audio.play();
    } catch (err) {
      console.error("TTS error:", err);
      setError(err.message);
      setIsSpeaking(false);
    }
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsSpeaking(false);
    }
  };

  return { speak, stop, isSpeaking, error };
};

export default useTTS;