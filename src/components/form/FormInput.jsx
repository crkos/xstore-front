// eslint-disable-next-line react/prop-types
export default function FormInput({ name, placeholder, label, ...rest }) {
  return (
    <div className="flex flex-col-reverse mb-8">
      <input
        id={name}
        name={name}
        className="bg-transparent rounded border-2 border-light-subtle w-full text-lg outline-none focus:border-black p-1 peer transition"
        placeholder={placeholder}
        {...rest}
      ></input>
      <label
        htmlFor={name}
        className="font-bold dark:text-dark-subtle text-secondary dark:peer-focus:text-white peer-focus:text-primary transition self-start mb-1"
      >
        {label}
      </label>
    </div>
  );
}
