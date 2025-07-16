import PropTypes from 'prop-types';

function Card({ title, subtext, backgroundColor, textColor, imageUrl }) {
  const defaultImage = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80";
  const isDefaultImage = !imageUrl || imageUrl === defaultImage;

  return (
    <div 
      className="relative max-w-sm rounded-lg overflow-hidden shadow-lg"
      style={{ backgroundColor }}
    >
      <img
        className="w-full h-48 object-cover"
        src={imageUrl || defaultImage}
        alt={title || "Mountain Landscape"}
      />
      <div className="px-6 py-4" style={{ color: textColor }}>
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-base">{subtext}</p>
      </div>
      {isDefaultImage && (
        <div className="px-6 pb-4 text-xs text-gray-500">
          Photo by{' '}
          <a
            href="https://unsplash.com/@heytowner"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Brad Towner
          </a>
          {' '}on{' '}
          <a
            href="https://unsplash.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Unsplash
          </a>
        </div>
      )}
    </div>
  );
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtext: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  textColor: PropTypes.string,
  imageUrl: PropTypes.string,
};

Card.defaultProps = {
  backgroundColor: '#ffffff',
  textColor: '#000000',
  imageUrl: '',
};

export default Card;