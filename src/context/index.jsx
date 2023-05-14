// eslint-disable-next-line react/prop-types
import NotificationProvider from "./NotificationProvider.jsx";
import AuthProvider from "./AuthProvider.jsx";
import ProductProvider from "./ProductProvider.jsx";
import CartProvider from "./CartProvider.jsx";
import SearchProvider from "./SearchProvider.jsx";

// eslint-disable-next-line react/prop-types
export default function ContextProviders({ children }) {
  return (
    <NotificationProvider>
      <CartProvider>
        <ProductProvider>
          <SearchProvider>
            <AuthProvider>{children}</AuthProvider>
          </SearchProvider>
        </ProductProvider>
      </CartProvider>
    </NotificationProvider>
  );
}
