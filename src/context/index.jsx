// eslint-disable-next-line react/prop-types
import NotificationProvider from "./NotificationProvider.jsx";
import AuthProvider from "./AuthProvider.jsx";

// eslint-disable-next-line react/prop-types
export default function ContextProviders({ children }) {
  return (
    <NotificationProvider>
      <AuthProvider>{children}</AuthProvider>
    </NotificationProvider>
  );
}
