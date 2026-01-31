import { FaVolumeUp, FaPlay } from "react-icons/fa";

const AudioTuningCard = ({ settings, setSettings }) => {
  const volume = settings.volume;

  const previewVoice = () => {
    const utterance = new SpeechSynthesisUtterance(
      "Hello! This is how your voice will sound.",
    );
    utterance.volume = volume / 100;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white shadow-sm rounded-xl p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Audio Tuning</h2>
        <button
          onClick={previewVoice}
          className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-600 text-white px-0 sm:px-4 py-2 sm:py-3 rounded-lg shadow hover:bg-blue-700 transition-all duration-300 text-sm sm:text-base"
        >
          <FaPlay className="w-4 h-4 sm:w-5 sm:h-5" />
          Preview Voice
        </button>
      </div>

      <div className="bg-gray-80 p-4 rounded-lg shadow-sm">
        <div className="flex justify-between mb-2">
          <div className="flex items-center gap-2 text-gray-700 font-medium">
            <FaVolumeUp /> Output Volume
          </div>
          <span className="text-blue-600 font-semibold">{volume}%</span>
        </div>

        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) =>
            setSettings({ ...settings, volume: Number(e.target.value) })
          }
          className="w-full"
        />

        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>Mute</span>
          <span>50%</span>
          <span>Max</span>
        </div>
      </div>
    </div>
  );
};

export default AudioTuningCard;
