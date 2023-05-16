import ModalContainer from "./ModalContainer.jsx";

// eslint-disable-next-line react/prop-types
const EditProductModal = ({ visible, onClose }) => {
  return (
    <>
      <ModalContainer visible={visible} onClose={onClose}>
        <p>HOLA2</p>
      </ModalContainer>
    </>
  );
};

export default EditProductModal;
