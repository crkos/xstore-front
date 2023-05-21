import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";

const defaultInputStyle =
  "bg-transparent rounded border-2 border-light-subtle w-full text-lg outline-none focus:border-black p-1 peer transition invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500";

export default function FormInput({
  // eslint-disable-next-line react/prop-types
  name,
  // eslint-disable-next-line react/prop-types
  placeholder,
  // eslint-disable-next-line react/prop-types
  label,
  // eslint-disable-next-line react/prop-types
  typeform = null,
  // eslint-disable-next-line react/prop-types
  modal,
  // eslint-disable-next-line react/prop-types
  type = "text",

  ...rest
}) {
  return (
    <div className="relative">
      <div className="flex flex-col-reverse mb-8">
        <div className="relative">
          <input
            id={name}
            name={name}
            type={type}
            className={
              modal
                ? "bg-modalBorderColor bg-opacity-50 rounded border-2 border-light-subtle w-full text-lg outline-none focus:border-black p-1 peer transition invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                : defaultInputStyle
            }
            placeholder={placeholder}
            {...rest}
          />
          <TypeForm typeForm={typeform} />
        </div>
        <label
          htmlFor={name}
          className="font-bold text-secondary peer-focus:text-primary transition self-start mb-1"
        >
          {label}
        </label>
      </div>
    </div>
  );
}

// eslint-disable-next-line react/prop-types
const TypeForm = ({ typeForm }) => {
  if (typeForm === "email") {
    return (
      <span className="absolute top-1/2 right-2 transform -translate-y-1/2">
        <MdEmail />
      </span>
    );
  } else if (typeForm === "password") {
    return (
      <span className="absolute top-1/2 right-2 transform -translate-y-1/2">
        <FaLock />
      </span>
    );
  } else if (typeForm === "field") {
    return (
      <span className="absolute top-1/2 right-2 transform -translate-y-1/2">
        <BsFillPencilFill />
      </span>
    );
  } else {
    return (
      <span className="absolute top-1/2 right-2 transform -translate-y-1/2"></span>
    );
  }
};
