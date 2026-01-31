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

const Settings = () => {
  const [settings, setSettings] = useState(defaultSettings);

  const handleSave = () => {
    console.log("Saved Settings:", settings);
  };

  const handleReset = () => {
    setSettings(defaultSettings);
  };

  const handleCancel = () => {
    setSettings(defaultSettings);
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
        />
      </div>
    </div>
  );
};

export default Settings;
