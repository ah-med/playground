import PropTypes from 'prop-types';

function CardForm({ onFormChange, onReset, values }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      onFormChange({ target: { name: 'imageUrl', value: imageUrl } });
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Customize Card</h2>
        <button
          onClick={onReset}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-medium transition-colors"
        >
          Reset
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Background Color
          </label>
          <input
            type="color"
            name="backgroundColor"
            value={values.backgroundColor}
            onChange={onFormChange}
            className="h-10 w-full rounded border border-gray-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Text Color
          </label>
          <input
            type="color"
            name="textColor"
            value={values.textColor}
            onChange={onFormChange}
            className="h-10 w-full rounded border border-gray-300"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={values.title}
            onChange={onFormChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subtext
          </label>
          <textarea
            name="subtext"
            value={values.subtext}
            onChange={onFormChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            placeholder="Enter subtext"
            rows="3"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

CardForm.propTypes = {
  onFormChange: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  values: PropTypes.shape({
    title: PropTypes.string.isRequired,
    subtext: PropTypes.string.isRequired,
    backgroundColor: PropTypes.string.isRequired,
    textColor: PropTypes.string.isRequired,
    imageUrl: PropTypes.string,
  }).isRequired,
};

export default CardForm;