const ActionButtonsRow = ({ onSave, onReset, onCancel }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4">
      <button onClick={onReset} className="text-gray-500 hover:text-gray-700">
        Reset Defaults
      </button>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="border px-5 py-2 rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default ActionButtonsRow;
