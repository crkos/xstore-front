import PropTypes from "prop-types";

const commonPosterUI =
  "flex justify-center items-center border border-dashed rounded aspect-video border-black cursor-pointer p-4";

const commonInputClasses =
  "w-full bg-transparent outline-none text-primary border-light-subtle focus:border-black focus:border-primary transition";
const PosterSelector = ({
  name,
  selectedPoster,
  onChange,
  accept,
  className,
  label,
}) => {
  return (
    <div>
      <input
        accept={accept}
        name={name}
        id={name}
        type="file"
        onChange={onChange}
        hidden
      />
      <label htmlFor={name} className="text-center">
        {selectedPoster ? (
          <img
            className={commonInputClasses + " object-cover " + className}
            src={selectedPoster}
            alt=""
          />
        ) : (
          <PosterUI label={label} className={className}></PosterUI>
        )}
      </label>
    </div>
  );
};

PosterSelector.propTypes = {
  name: PropTypes.string.isRequired,
  selectedPoster: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  accept: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const PosterUI = ({ className, label }) => {
  return (
    <div className={commonPosterUI + " object-cover " + className}>
      <span className="dark:text-white text-secondary">{label}</span>
    </div>
  );
};

PosterUI.propTypes = {
  className: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default PosterSelector;
