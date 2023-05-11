import NavBar from "./components/user/NavBar.jsx";
import Categories from "./components/user/Categories.jsx";
import Footer from "./components/user/Footer.jsx";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/user/SignIn.jsx";
import SignUp from "./components/user/SignUp.jsx";
import Products from "./components/products/Products.jsx";
import NotFound from "./components/user/NotFound.jsx";
import SingleProduct from "./components/user/SingleProduct.jsx";
import Cart from "./components/user/Cart.jsx";
import Payment from "./components/products/Payment.jsx";
import Computadoras from "./components/products/Computadoras.jsx";
import Laptops from "./components/products/Laptops.jsx";
import Celulares from "./components/products/Celulares.jsx";
import Accesorios from "./components/products/Accesorios.jsx";
import LicenciasSoftware from "./components/products/LicenciasSoftware.jsx";
import UserBought from "./components/user/UserBought.jsx";

export default function App() {
  return (
    <>
      <div className="min-h-full">
        <NavBar />
        <Categories />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Payment />} />
          <Route path="/computadoras" element={<Computadoras />} />
          <Route path="/laptops" element={<Laptops />} />
          <Route path="/celulares" element={<Celulares />} />
          <Route path="/accesorios" element={<Accesorios />} />
          <Route path="/licencias-software" element={<LicenciasSoftware />} />
          <Route path="/compras" element={<UserBought />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}
