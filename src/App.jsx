import NavBar from "./components/user/NavBar.jsx";
import Categories from "./components/user/Categories.jsx";
import Footer from "./components/user/Footer.jsx";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/user/SignIn.jsx";
import SignUp from "./components/user/SignUp.jsx";
import Products from "./components/products/Products.jsx";
import NotFound from "./components/user/NotFound.jsx";
import SingleProduct from "./components/user/SingleProduct.jsx";

export default function App() {
  return (
    <>
      <div className="pb-[9rem]">
        <NavBar />
        <Categories />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}
