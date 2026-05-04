import React, { useEffect, useRef, useState } from "react";
import { FiCopy, FiDownload, FiTrash2, FiDelete } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";

// fullString aur setFullString ab Dashboard se props ke zariye aate hain
const LiveTranslationPanel = ({ prediction, isLive, fullString, setFullString }) => {
  const [sessions, setSessions] = useState([]);   // Completed session cards
  const [copied, setCopied] = useState(false);    // Copy toast
  const bottomRef = useRef(null);

  // --- Object prediction: language select hone ke baad { original, translated } aata hai ---
  // Session card banao aur fullString clear karo
  useEffect(() => {
    if (!prediction || typeof prediction !== "object") return;

    const stopTime = new Date().toLocaleString();
    setSessions((prev) => [
      ...prev,
      {
        original: prediction.original,
        translated: prediction.translated,
        time: stopTime,
        id: Date.now(),
      },
    ]);
    // fullString clear nahi karo — End Input ke baad bhi text preserve rahega
    // Clear sirf handleStart par hoga (Dashboard mein)
  }, [prediction]);

  // --- Auto scroll to bottom ---
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sessions, fullString]);

  // --- Copy + Download ke liye full text ---
  const buildFullText = () => {
    const completedText = sessions
      .map(
        (s) =>
          `[${s.time}]\nOriginal: ${s.original}\nTranslated: ${s.translated || "Translation failed"}`
      )
      .join("\n\n");
    const liveText = fullString ? `[Live session in progress]\n${fullString}` : "";
    return [completedText, liveText].filter(Boolean).join("\n\n");
  };

  // --- Copy to clipboard ---
  const handleCopy = () => {
    const text = buildFullText();
    if (!text) return;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => alert("Copy failed. Please try again."));
  };

  // --- Download as .txt ---
  const handleDownload = () => {
    const text = buildFullText();
    if (!text) return;
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `translation_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // --- Sab delete karo ---
  const handleDeleteAll = () => {
    if (sessions.length === 0 && !fullString) return;
    setSessions([]);
    setFullString("");
  };

  // --- Recent letter delete, ya last session hatao ---
  const handleDeleteRecent = () => {
    if (fullString.length > 0) {
      setFullString((prev) => prev.slice(0, -1));
    } else if (sessions.length > 0) {
      setSessions((prev) => prev.slice(0, -1));
    }
  };

  return (
    <div className="w-full relative">

      {/* COPY TOAST */}
      {copied && (
        <div className="absolute top-4 right-4 z-50 flex items-center gap-2 bg-green-500 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg animate-fade-in">
          <FiCheck size={14} />
          Copied to Clipboard!
        </div>
      )}

      <div className="bg-white/95 backdrop-blur border-t-4 border-blue-600 shadow-xl rounded-2xl p-1 sm:p-6 flex flex-col h-full">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1 text-blue-600">
            <span className="font-bold uppercase tracking-wide text-sm">
              Live Translation
            </span>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 text-slate-500">
            <button onClick={handleCopy} className="p-2 rounded-lg hover:bg-slate-100 transition" title="Copy all">
              <FiCopy size={16} />
            </button>
            <button onClick={handleDownload} className="p-2 rounded-lg hover:bg-slate-100 transition" title="Download as .txt">
              <FiDownload size={16} />
            </button>
            <button onClick={handleDeleteRecent} className="p-2 rounded-lg hover:bg-slate-100 transition" title="Delete recent letter">
              <FiDelete size={16} />
            </button>
            <button onClick={handleDeleteAll} className="p-2 rounded-lg hover:bg-red-50 hover:text-red-400 transition" title="Delete all">
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-3 text-sm sm:text-base">

          {/* Empty state */}
          {sessions.length === 0 && !fullString && (
            <p className="text-slate-400 italic text-xs">
              Start signing to see translation here...
            </p>
          )}

          {/* Completed session cards — translated text dikhta hai */}
          {sessions.map((session) => (
            <div key={session.id} className="border border-slate-100 rounded-xl p-3 bg-slate-50 space-y-2">
              {session.translated ? (
                <p className="text-slate-800 text-xs leading-relaxed font-medium">
                  {session.translated}
                </p>
              ) : (
                <p className="text-red-400 text-xs italic">Translation failed</p>
              )}
              <p className="text-slate-400 text-xs">🕐 Stopped at: {session.time}</p>
            </div>
          ))}

          {/* Live growing string — signing ke waqt aur End Input ke baad bhi dikhta hai */}
          {fullString && (
            <div className={`border rounded-xl p-3 ${isLive ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-slate-50"}`}>
              <p className="text-slate-900 font-semibold text-xs leading-relaxed">
                {fullString}
                {isLive && <span className="inline-block w-2 h-2 bg-blue-600 rounded-full ml-2 animate-bounce"></span>}
              </p>
              <p className={`text-xs mt-1 ${isLive ? "text-blue-400" : "text-slate-400"}`}>
                {isLive ? "🔴 Live session in progress..." : "⏹ Session ended — select language to translate"}
              </p>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
};

export default LiveTranslationPanel;