import { ImSpinner3 } from "react-icons/im";

// eslint-disable-next-line react/prop-types
export default function Submit({ value, busy, type, onClick }) {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={onClick}
        type={type || "submit"}
        className="text-black bg-submitColor rounded-xl p-3 pl-14 pr-14 border-2 border-black hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer h-10 flex items-center justify-center w-max hover:bg-compraBoton hover:text-white"
      >
        {busy ? <ImSpinner3 className="animate-spin" /> : value}
      </button>
    </div>
  );
}
