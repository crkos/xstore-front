import React from "react";

const NotFoundText = ({ text, visible }) => {
  return visible ? (
    <h1 className="font-semibold text-3xl opacity-40 text-secondary dark:text-white text-center py-5">
      {text}
    </h1>
  ) : null;
};

export default NotFoundText;
