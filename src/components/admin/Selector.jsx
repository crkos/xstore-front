import PropTypes from "prop-types";

const Selector = ({ name, value, onChange, label, options, title }) => {
  return (
    <select
      title={title}
      className="bg-modalBorderColor bg-opacity-50 rounded border-2 border-light-subtle text-lg outline-none focus:border-black p-1 peer transition invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
    >
      <option value="">{label}</option>
      {options.map(({ title, value }) => {
        return (
          <option key={title} value={value}>
            {title}
          </option>
        );
      })}
    </select>
  );
};

Selector.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  title: PropTypes.string,
};

export default Selector;
