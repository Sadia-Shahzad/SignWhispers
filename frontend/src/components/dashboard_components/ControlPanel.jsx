import React, { useState } from "react";
import { FaPlay, FaStop } from "react-icons/fa";
import { MdTranslate } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaVolumeUp } from "react-icons/fa";

const ControlPanel = ({ isLive, start, stop, targetLanguage, setTargetLanguage, translatedText, sessionText }) => {
  const [isLoadingAudio, setIsLoadingAudio] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // --- Play Translation: POST to /text-to-speech → audio play ---
  const handlePlayTranslation = async () => {
    //  translatedText ya sessionText — jo bhi available ho use karo
    const textToPlay = translatedText || sessionText;

    if (!textToPlay || !textToPlay.trim()) {
      alert("No translated text to play. Please complete a session first.");
      return;
    }

    setIsLoadingAudio(true);

    try {
      const response = await fetch("http://localhost:8000/text-to-speech", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: textToPlay }), // ✅ textToPlay use karo
      });

      if (!response.ok) {
        throw new Error("Failed to fetch audio from server.");
      }

      // Response blob se audio URL banao aur play karo
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);

      setIsPlayingAudio(true);
      audio.play();

      audio.onended = () => {
        setIsPlayingAudio(false);
        URL.revokeObjectURL(audioUrl); // Memory free karo
      };

      audio.onerror = () => {
        setIsPlayingAudio(false);
        alert("Error playing audio.");
      };

    } catch (error) {
      console.error("TTS Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsLoadingAudio(false);
    }
  };

  const getPlayButtonLabel = () => {
    if (isLoadingAudio) return "Loading...";
    if (isPlayingAudio) return "Playing...";
    return "Play Translation";
  };

  return (
    <div className="w-full flex flex-col gap-1 h-full">
      {/* START / END BUTTONS */}
      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={start}
          className={`h-20 flex flex-col items-center justify-center gap-2 rounded-2xl shadow-md text-white transition ${
            isLive ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <FaPlay size={20} />
          <span className="font-semibold">Start Input</span>
        </button>

        <button
          onClick={stop}
          className={`h-20 flex flex-col items-center justify-center gap-2 rounded-2xl shadow-sm text-slate-700 transition ${
            !isLive
              ? "bg-gray-200 cursor-not-allowed"
              : "bg-white border border-slate-200 hover:bg-slate-50 hover:text-red-600 hover:border-red-600"
          }`}
          disabled={!isLive}
        >
          <FaStop size={20} />
          <span className="font-semibold">End Input</span>
        </button>
      </div>

      <br />

      {/* For your information */}
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 flex-1">
  <p className="text-xs font-bold uppercase tracking-widest text-black text-center mb-1">
    How it works
  </p>

  <div className="flex flex-col gap-1">
    {/* Tip 1 */}
    <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-2">
      <div className="min-w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#185FA5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <path d="M8 21h8M12 17v4"/>
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800 mb-0.5">Use Spacebar</p>
        <p className="text-xs text-slate-500 leading-relaxed">
          Press spacebar to add spaces between signed words during a live session.
        </p>
      </div>
    </div>

    {/* Tip 2 */}
    <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-2">
      <div className="min-w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0F6E56" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 8l6 6 6-6"/>
          <circle cx="12" cy="12" r="10"/>
        </svg>
      </div>
      <div>
        <p className="text-sm font-semibold text-slate-800 mb-0.5">Pick your language</p>
        <p className="text-xs text-slate-500 leading-relaxed">
          Choose your desired language from the dropdown to translate signed text.
        </p>
      </div>
    </div>
  </div>
</div>

      {/* LANGUAGE DROPDOWN */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-3">
        <h3 className="text-sm font-bold uppercase tracking-wide mb-4 text-slate-800 flex items-center gap-1">
          <MdTranslate size={18} />
          Target Language
        </h3>

        <select
          value={targetLanguage}
          onChange={(e) => setTargetLanguage(e.target.value)}
          className="w-full border border-slate-200 rounded-xl p-3 text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option value="en">English (Default)</option>
          <option value="zh-CN">Mandarin Chinese</option>
          <option value="hi">Hindi</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
          <option value="ar">Arabic</option>
          <option value="bn">Bengali</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="ur">Urdu</option>
          <option value="id">Indonesian</option>
          <option value="de">German</option>
          <option value="ja">Japanese</option>
          <option value="sw">Swahili</option>
          <option value="mr">Marathi</option>
        </select>
      </div>

      <NavLink
        to="/feedback"
        className="h-10 flex items-center justify-center rounded-lg px-6 text-sm font-semibold text-white bg-blue-800 hover:bg-blue-900 shadow-md shadow-blue-700/20 transition-all duration-200 mt-2"
      >
        Give Feedback
      </NavLink>

      {/* PLAY TRANSLATION BUTTON */}
      <button
        onClick={handlePlayTranslation}
        disabled={isLoadingAudio || isPlayingAudio || (!translatedText && !sessionText)}
        className="h-10 w-full flex items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md shadow-emerald-600/30 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <FaVolumeUp className="text-base" />
        {getPlayButtonLabel()}
      </button>
    </div>
  );
};

export default ControlPanel;