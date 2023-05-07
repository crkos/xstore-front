// eslint-disable-next-line react/prop-types
import NotificationProvider from "./NotificationProvider.jsx";
import AuthProvider from "./AuthProvider.jsx";
import ProductProvider from "./ProductProvider.jsx";
import CartProvider from "./CartProvider.jsx";

// eslint-disable-next-line react/prop-types
export default function ContextProviders({ children }) {
  return (
    <NotificationProvider>
      <ProductProvider>
        <CartProvider>
          <AuthProvider>{children}</AuthProvider>
        </CartProvider>
      </ProductProvider>
    </NotificationProvider>
  );
}
