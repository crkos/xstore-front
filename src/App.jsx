import NavBar from "./components/user/NavBar.jsx";
import Categories from "./components/user/Categories.jsx";
import Footer from "./components/user/Footer.jsx";
import { Route, Routes } from "react-router-dom";
import SignIn from "./components/user/SignIn.jsx";

export default function App() {
  return (
    <>
      <div className="pb-[9rem]">
        <NavBar />
        <Categories />
        <Routes>
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
