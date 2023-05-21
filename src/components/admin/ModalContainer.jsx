import PropTypes from "prop-types";

const ModalContainer = ({ children, visible, onClose, ignoreContainer }) => {
  const renderChildren = () => {
    if (ignoreContainer) return children;
    return (
      <div className="bg-white rounded w-[47rem] h-[40rem] overflow-auto p-2">
        {children}
      </div>
    );
  };

  if (!visible) return null;

  const handleClick = (e) => {
    if (e.target.id === "modal-container") {
      onClose && onClose();
    }
  };

  return (
    <div
      id="modal-container"
      onClick={handleClick}
      className="fixed inset-0 w-full h-full bg-primary bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
    >
      {renderChildren()}
    </div>
  );
};

ModalContainer.propTypes = {
  children: PropTypes.node,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  ignoreContainer: PropTypes.bool,
};

export default ModalContainer;
