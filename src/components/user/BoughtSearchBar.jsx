import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const defaultInputStyle =
  "dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white text-lg";

const SearchForm = ({
  // eslint-disable-next-line react/prop-types
  showResetIcon,
  // eslint-disable-next-line react/prop-types
  placeholder,
  // eslint-disable-next-line react/prop-types
  onSubmit,
  // eslint-disable-next-line react/prop-types
  onReset,
  // eslint-disable-next-line react/prop-types
  inputClassName = defaultInputStyle,
}) => {
  const [value, setValue] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  const handleSearchReset = () => {
    onReset();
    setValue("");
  };

  return (
    <form onSubmit={handleOnSubmit} className="relative">
      <input
        type="text"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        className={
          "border-2 transition bg-transparent rounded p-1 outline-none " +
          inputClassName
        }
        placeholder={placeholder}
      />

      {showResetIcon ? (
        <button
          onClick={handleSearchReset}
          type="button"
          className="absolute top-1/2 -translate-y-1/2 right-2 text-secondary dark:text-white"
        >
          <AiOutlineClose></AiOutlineClose>
        </button>
      ) : null}
    </form>
  );
};

export default SearchForm;
