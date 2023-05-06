// eslint-disable-next-line react/prop-types
import NotificationProvider from "./NotificationProvider.jsx";
import AuthProvider from "./AuthProvider.jsx";
import ProductProvider from "./ProductProvider.jsx";

// eslint-disable-next-line react/prop-types
export default function ContextProviders({ children }) {
  return (
    <NotificationProvider>
      <ProductProvider>
        <AuthProvider>{children}</AuthProvider>
      </ProductProvider>
    </NotificationProvider>
  );
}
