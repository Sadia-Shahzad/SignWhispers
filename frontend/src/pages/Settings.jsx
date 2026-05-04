import { useState } from "react";
import SettingsSidebar from "../components/settings_components/SettingsSidebar";
import SpeechSynthesisHeader from "../components/settings_components/SpeechSynthesisHeader";
import VoicePersonaSelector from "../components/settings_components/VoicePersonaSelector";
import AudioTuningCard from "../components/settings_components/AudioTuningCard";
import ActionButtonsRow from "../components/settings_components/ActionButtonsRow";

const defaultSettings = {
  voice: "female",
  volume: 80,
};

// Load from localStorage if available, else use defaults
const loadSettings = () => {
  try {
    const saved = localStorage.getItem("voiceSettings");
    return saved ? JSON.parse(saved) : defaultSettings;
  } catch {
    return defaultSettings;
  }
};

const Settings = () => {
  const [settings, setSettings] = useState(loadSettings);
  const [saveStatus, setSaveStatus] = useState("idle"); // "idle" | "saving" | "saved" | "error"

  const handleSave = async () => {
    setSaveStatus("saving");
    try {
      // 1. Tell backend which voice gender to use
      const res = await fetch("http://localhost:8000/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ voice: settings.voice, volume: settings.volume }),
      });

      if (!res.ok) throw new Error("Backend error");

      // 2. Persist both voice + volume to localStorage so all pages can read them
      localStorage.setItem("voiceSettings", JSON.stringify(settings));

      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2500);
    } catch (err) {
      console.error("Failed to save settings:", err);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    }
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  const handleCancel = () => {
    setSettings(loadSettings()); // revert to last saved, not default
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SettingsSidebar />

      <div className="flex-1 p-6 space-y-6">
        <SpeechSynthesisHeader />
        <VoicePersonaSelector settings={settings} setSettings={setSettings} />
        <AudioTuningCard settings={settings} setSettings={setSettings} />
        <ActionButtonsRow
          onSave={handleSave}
          onReset={handleReset}
          onCancel={handleCancel}
          saveStatus={saveStatus}
        />
      </div>
    </div>
  );
};

export default Settings;