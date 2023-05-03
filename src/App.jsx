import NavBar from "./components/user/NavBar.jsx";
import Categories from "./components/user/Categories.jsx";
import Footer from "./components/user/Footer.jsx";

export default function App() {
  return (
    <>
      <div className="pb-[9rem]">
        <NavBar />
        <Categories />
      </div>
      <Footer />
    </>
  );
}
