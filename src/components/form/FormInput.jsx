import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

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

  ...rest
}) {
  return (
    <div className="relative">
      <div className="flex flex-col-reverse mb-8">
        <div className="relative">
          <input
            id={name}
            name={name}
            className={defaultInputStyle}
            placeholder={placeholder}
            {...rest}
          />
          {typeform === "email" ? (
            <span className="absolute top-1/2 right-2 transform -translate-y-1/2">
              <MdEmail />
            </span>
          ) : (
            <span className="absolute top-1/2 right-2 transform -translate-y-1/2">
              <FaLock />
            </span>
          )}
        </div>
        <label
          htmlFor={name}
          className="font-bold dark:text-dark-subtle text-secondary dark:peer-focus:text-white peer-focus:text-primary transition self-start mb-1"
        >
          {label}
        </label>
      </div>
    </div>
  );
}
