import { IoCartSharp } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const Product = ({ product }) => {
  return (
    <div className="bg-submitColor p-4 flex flex-col justify-center pt-20 shadow-lg drop-shadow-md h-full w-full">
      <div className="flex items-center justify-center border-b-4 drop-shadow-md pb-2 mb-2">
        {/* eslint-disable-next-line react/prop-types */}
        <img alt="PC" src={product.imagen_producto} />
      </div>
      <div className="flex items-center justify-between mb-4">
        {/* eslint-disable-next-line react/prop-types */}
        <p className="text-2xl font-bold">${product.precio}</p>
        <IoCartSharp className="text-3xl" />
      </div>
      {/* eslint-disable-next-line react/prop-types */}
      <p>{product.descripcion}</p>
    </div>
  );
};

export default Product;
