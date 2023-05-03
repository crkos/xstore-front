import { useState } from "react";
import { CiSearch } from "react-icons/ci";

const defaultInputStyle =
  "dark:border-dark-subtle border-light-subtle dark:focus:border-white focus:border-primary dark:text-white text-lg";

const SearchForm = ({
  // eslint-disable-next-line react/prop-types
  placeholder,
  // eslint-disable-next-line react/prop-types
  onSubmit,
  // eslint-disable-next-line react/prop-types
  inputClassName = defaultInputStyle,
}) => {
  const [value, setValue] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleOnSubmit} className="relative">
      <input
        type="text"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        className={
          "border-2 transition bg-transparent p-1 outline-none " +
          inputClassName
        }
        placeholder={placeholder}
      />
      <span className="absolute top-1/2 -translate-y-1/2 right-2 p-2 border-l-2 border-b-gray-950 md:text-2xl sm:text-lg">
        <CiSearch />
      </span>
    </form>
  );
};

export default SearchForm;
