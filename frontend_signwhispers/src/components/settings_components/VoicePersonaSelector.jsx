import { FaMale, FaFemale } from "react-icons/fa";
import { BsSoundwave } from "react-icons/bs";

const VoicePersonaSelector = ({ settings, setSettings }) => {
  const selected = settings.voice;

  const Card = ({ id, icon, title, subtitle }) => (
    <div
      onClick={() => setSettings({ ...settings, voice: id })}
      className={`flex flex-col items-center justify-center p-6 rounded-xl border cursor-pointer transition-all duration-300
      ${
        selected === id
          ? "border-blue-600 bg-blue-50 shadow-md"
          : "border-gray-200 bg-white hover:shadow"
      }`}
    >
      <div className="text-2xl text-gray-600 mb-2">{icon}</div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );

  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Voice Persona</h2>
        <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full font-medium">
          AI NEURAL ENGINE
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        <Card
          id="male"
          icon={<FaMale />}
          title="Male Voice"
          subtitle="Deep & Resonant"
        />
        <Card
          id="female"
          icon={<FaFemale />}
          title="Female Voice"
          subtitle="Clear & Melodic"
        />
        <Card
          id="neutral"
          icon={<BsSoundwave />}
          title="Neutral Voice"
          subtitle="Balanced & Modern"
        />
      </div>
    </div>
  );
};

export default VoicePersonaSelector;
