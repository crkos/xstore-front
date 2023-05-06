// eslint-disable-next-line react/prop-types
const Container = ({ children }) => {
  return (
    <div className="flex flex-col mt-4 h-max items-center justify-center">
      {children}
    </div>
  );
};

export default Container;
