// eslint-disable-next-line react/prop-types
const Label = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="text-light-subtle font-semibold">
      {children}
    </label>
  );
};

export default Label;
