import PropTypes, { func } from "prop-types";

const FloatingButton = ({ onClick, show = false }) => {
  return !show ? (
    <div
      className="fixed bottom-5 right-5 bg-blue-600 rounded-[50%] w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-blue-800"
      onClick={onClick}
    >
      <button className="text-2xl text-white">+</button>
    </div>
  ) : null;
};

FloatingButton.propTypes = {
  onClick: func,
  show: PropTypes.bool,
};

export default FloatingButton;
