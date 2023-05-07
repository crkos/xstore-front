import { createContext, useState } from "react";

export const NotificationContext = createContext();

// eslint-disable-next-line react/prop-types
export default function NotificationProvider({ children }) {
  const [notification, setNotification] = useState("");
  const [classes, setclasses] = useState("");
  let timeoutId;

  const updateNotification = (type, value) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    switch (type) {
      case "error":
        setclasses("bg-red-500");
        break;
      case "success":
        setclasses("bg-green-500");
        break;
      case "warning":
        setclasses("bg-orange-500");
        break;
      default:
        setclasses("bg-red-500");
        break;
    }
    setNotification(value);
    timeoutId = setTimeout(() => {
      setNotification("");
    }, 1500);
  };

  return (
    <NotificationContext.Provider value={{ updateNotification }}>
      {children}
      {notification && (
        <div className="fixed left-1/2 -translate-x-1/2 top-24">
          <div className="shadow-md shadow-gray-400 rounded gelatine">
            <p className={classes + " text-white px-4 py-2 font-semibold"}>
              {" "}
              {notification}{" "}
            </p>
          </div>
        </div>
      )}
    </NotificationContext.Provider>
  );
}
