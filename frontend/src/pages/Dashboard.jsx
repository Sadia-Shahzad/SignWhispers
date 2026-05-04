// import React, { useState, useRef, useEffect } from "react";
// import LiveInputSection from "../components/dashboard_components/LiveInputSection";
// import ControlPanel from "../components/dashboard_components/ControlPanel";
// import LiveTranslationPanel from "../components/dashboard_components/LiveTranslationPanel";

// const Dashboard = () => {
//   const [isLive, setIsLive] = useState(false);
//   const [prediction, setPrediction] = useState(null);
//   const [targetLanguage, setTargetLanguage] = useState("en");
//   const [translatedText, setTranslatedText] = useState("");
//   const [sessionText, setSessionText] = useState("");
//   const [fullString, setFullString] = useState(""); // LiveTranslationPanel ke saath shared

//   const predictionsLog = useRef([]);

//   // Language code → full name (sent to /translate API)
//   const languageMap = {
//     en: "English",
//     "zh-CN": "Mandarin Chinese",
//     hi: "Hindi",
//     es: "Spanish",
//     fr: "French",
//     ar: "Arabic",
//     bn: "Bengali",
//     pt: "Portuguese",
//     ru: "Russian",
//     ur: "Urdu",
//     id: "Indonesian",
//     de: "German",
//     ja: "Japanese",
//     sw: "Swahili",
//     mr: "Marathi",
//   };

//   // --- Spacebar: live session mein space add karta hai ---
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.code === "Space" && isLive) {
//         e.preventDefault();
//         handlePrediction(" ");
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => window.removeEventListener("keydown", handleKeyDown);
//   }, [isLive]);

//   // --- LiveInputSection se har detected character yahan aata hai ---
//   const handlePrediction = (newPrediction) => {
//     if (typeof newPrediction === "string") {
//       setPrediction(newPrediction);
//       predictionsLog.current.push(newPrediction);
//       setFullString((prev) => prev + newPrediction);
//     }
//   };

//   // --- Start Input click ---
//   const handleStart = () => {
//     predictionsLog.current = [];
//     setPrediction(null);
//     setTranslatedText("");
//     setSessionText("");
//     setFullString("");
//     setIsLive(true);
//   };

//   // --- End Input click ---
//   const handleStop = () => {
//     setIsLive(false);
//     const sessionString = fullString.trim();
//     predictionsLog.current = [];
//     if (!sessionString) return;
//     setSessionText(sessionString);
//   };

//   // --- Dropdown se language select hone par yeh call hoti hai ---
//   const handleLanguageChange = async (selectedLanguage) => {
//     setTargetLanguage(selectedLanguage);

//     const textToTranslate = sessionText || fullString.trim();

//     if (!textToTranslate) return;

//     // English selected — translation skip, but TTS ke liye translatedText set karo
//     if (selectedLanguage === "en") {
//       setTranslatedText(textToTranslate); // ✅ TTS ke liye zaroor set karo
//       setPrediction({
//         original: textToTranslate,
//         translated: textToTranslate,
//       });
//       return;
//     }

//     // POST to /translate
//     try {
//       const response = await fetch("http://localhost:8000/translate", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           text: textToTranslate,
//           target_language: languageMap[selectedLanguage],
//         }),
//       });

//       const data = await response.json();

//       setPrediction({
//         original: textToTranslate,
//         translated: data.translated_text,
//       });

//       setTranslatedText(data.translated_text || "");
//     } catch (error) {
//       console.error("Translation error:", error);
//       setPrediction({
//         original: textToTranslate,
//         translated: "Translation failed",
//       });
//       setTranslatedText("");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-100 p-4 md:p-6 flex flex-col gap-4">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-3">

//         {/* LEFT: Camera + Sign Detection */}
//         <div className="lg:col-span-2">
//           <LiveInputSection
//             isLive={isLive}
//             onPrediction={handlePrediction}
//           />
//         </div>

//         {/* RIGHT: Controls */}
//         <div className="lg:col-span-1">
//           <ControlPanel
//             isLive={isLive}
//             start={handleStart}
//             stop={handleStop}
//             targetLanguage={targetLanguage}
//             setTargetLanguage={handleLanguageChange}
//             translatedText={translatedText}
//             sessionText={sessionText}
//           />
//         </div>
//       </div>

//       {/* BOTTOM: Translation Output Panel */}
//       <LiveTranslationPanel
//         prediction={prediction}
//         isLive={isLive}
//         fullString={fullString}
//         setFullString={setFullString}
//       />
//     </div>
//   );
// };

// export default Dashboard;




import React, { useState, useRef, useEffect } from "react";
import LiveInputSection from "../components/dashboard_components/LiveInputSection";
import ControlPanel from "../components/dashboard_components/ControlPanel";
import LiveTranslationPanel from "../components/dashboard_components/LiveTranslationPanel";

const Dashboard = () => {
  const [isLive, setIsLive] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState("en");
  const [translatedText, setTranslatedText] = useState("");
  const [sessionText, setSessionText] = useState("");
  const [fullString, setFullString] = useState("");

  const predictionsLog = useRef([]);

  const languageMap = {
    en: "English",
    "zh-CN": "Mandarin Chinese",
    hi: "Hindi",
    es: "Spanish",
    fr: "French",
    ar: "Arabic",
    bn: "Bengali",
    pt: "Portuguese",
    ru: "Russian",
    ur: "Urdu",
    id: "Indonesian",
    de: "German",
    ja: "Japanese",
    sw: "Swahili",
    mr: "Marathi",
  };

  // ✅ Save to DB helper
  const saveTranslation = async (detected_text, translated_text, language) => {
    try {
      const token = localStorage.getItem("token");
      await fetch("http://localhost:8000/translations/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ detected_text, translated_text, language }),
      });
    } catch (err) {
      console.error("Save translation error:", err);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space" && isLive) {
        e.preventDefault();
        handlePrediction(" ");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLive]);

  const handlePrediction = (newPrediction) => {
    if (typeof newPrediction === "string") {
      setPrediction(newPrediction);
      predictionsLog.current.push(newPrediction);
      setFullString((prev) => prev + newPrediction);
    }
  };

  const handleStart = () => {
    predictionsLog.current = [];
    setPrediction(null);
    setTranslatedText("");
    setSessionText("");
    setFullString("");
    setIsLive(true);
  };

  const handleStop = () => {
    setIsLive(false);
    const sessionString = fullString.trim();
    predictionsLog.current = [];
    if (!sessionString) return;
    setSessionText(sessionString);
  };

  const handleLanguageChange = async (selectedLanguage) => {
    setTargetLanguage(selectedLanguage);

    const textToTranslate = sessionText || fullString.trim();

    if (!textToTranslate) return;

    if (selectedLanguage === "en") {
      setTranslatedText(textToTranslate);
      setPrediction({
        original: textToTranslate,
        translated: textToTranslate,
      });
      await saveTranslation(textToTranslate, "", "en"); // ✅ save
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: textToTranslate,
          target_language: languageMap[selectedLanguage],
        }),
      });

      const data = await response.json();

      setPrediction({
        original: textToTranslate,
        translated: data.translated_text,
      });

      setTranslatedText(data.translated_text || "");
      await saveTranslation(textToTranslate, data.translated_text || "", selectedLanguage); // ✅ save
    } catch (error) {
      console.error("Translation error:", error);
      setPrediction({
        original: textToTranslate,
        translated: "Translation failed",
      });
      setTranslatedText("");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-6 flex flex-col gap-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mx-3">
        <div className="lg:col-span-2">
          <LiveInputSection
            isLive={isLive}
            onPrediction={handlePrediction}
          />
        </div>
        <div className="lg:col-span-1">
          <ControlPanel
            isLive={isLive}
            start={handleStart}
            stop={handleStop}
            targetLanguage={targetLanguage}
            setTargetLanguage={handleLanguageChange}
            translatedText={translatedText}
            sessionText={sessionText}
          />
        </div>
      </div>
      <LiveTranslationPanel
        prediction={prediction}
        isLive={isLive}
        fullString={fullString}
        setFullString={setFullString}
      />
    </div>
  );
};

export default Dashboard;