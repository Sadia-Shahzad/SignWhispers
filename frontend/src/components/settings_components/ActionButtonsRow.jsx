const ActionButtonsRow = ({ onSave, onReset, onCancel, saveStatus = "idle" }) => {
  const isSaving = saveStatus === "saving";
  const isSaved = saveStatus === "saved";
  const isError = saveStatus === "error";

  const btnLabel = isSaving
    ? "Saving..."
    : isSaved
    ? "Saved"
    : isError
    ? "Failed"
    : "Save Changes";

  const btnClass = isSaved
    ? "bg-green-600 text-white px-5 py-2 rounded-lg shadow"
    : isError
    ? "bg-red-600 text-white px-5 py-2 rounded-lg shadow hover:bg-red-700"
    : "bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700";

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
      <button
        onClick={onReset}
        disabled={isSaving}
        className="text-gray-500 hover:text-gray-700 disabled:opacity-40"
      >
        Reset Defaults
      </button>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={isSaving}
          className="border px-5 py-2 rounded-lg hover:bg-gray-100 disabled:opacity-40"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          disabled={isSaving}
          className={`${btnClass} transition-all duration-300 disabled:opacity-60`}
        >
          {btnLabel}
        </button>
      </div>
    </div>
  );
};

export default ActionButtonsRow;