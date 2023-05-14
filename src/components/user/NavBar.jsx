import SearchBar from "../form/SearchBar.jsx";
import { BsFillBellFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/index.js";

//TODO Agregar searchBar
function NavBar() {
  const { authInfo } = useAuth();
  const { isLoggedIn } = authInfo;

  const navigate = useNavigate();
  const handleSearchSubmit = (searchTerm) => {
    navigate(`/search?producto=${searchTerm.trim()}`);
  };

  if (isLoggedIn) {
    return (
      <>
        <nav className="bg-navbarColor font-light min-w-max p-1">
          <ul className="flex gap-6 p-1 items-center">
            <li className="ml-4 mr-4">
              <Link to="/">
                <img
                  alt="Logo marca"
                  src="/system.png"
                  className="lg:pt-0 lg:h-20 md:h-12 sm:h-10 aspect-auto"
                />
              </Link>
            </li>
            <li className="w-max flex-1">
              <SearchBar
                placeholder="Buscar en toda la tienda..."
                inputClassName="text-lg border bg-white rounded-none drop-shadow-lg w-full"
                onSubmit={handleSearchSubmit}
              />
            </li>
            <li className="border-r-2 pr-6 border-r-gray-400">
              <Link to="/">
                <span className="text-lg">Inicio</span>
              </Link>
            </li>
            <li className="border-r-2 pr-6 border-r-gray-400">
              <Link to="/compras">
                <span className="text-lg">Mis compras</span>
              </Link>
            </li>
            <li>
              <Link to="/">
                <span className="text-2xl">
                  <BsFillBellFill />
                </span>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <span className="text-2xl">
                  <FaShoppingCart />
                </span>
              </Link>
            </li>
            <li>
              <Link to="/login">
                <span className="text-2xl">
                  <FaUserCircle />
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </>
    );
  }

  return (
    <>
      <nav className="bg-navbarColor font-light min-w-max p-1">
        <ul className="flex gap-6 p-1 items-center">
          <li className="ml-4 mr-4">
            <Link to="/">
              <img
                alt="Logo marca"
                src="/system.png"
                className="lg:pt-0 lg:h-20 md:h-12 sm:h-10 aspect-auto"
              />
            </Link>
          </li>
          <li className="w-max flex-1">
            <SearchBar
              placeholder="Buscar en toda la tienda..."
              inputClassName="text-lg border bg-white rounded-none drop-shadow-lg w-full"
            />
          </li>
          <li className="border-r-2 pr-6 border-r-gray-400">
            <Link to="/">
              <span className="text-lg">Inicio</span>
            </Link>
          </li>
          <li className="border-r-2 pr-6 border-r-gray-400">
            <Link to="/">
              <span className="text-lg">Sobre nosotros</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="text-2xl">
                <BsFillBellFill />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/cart">
              <span className="text-2xl">
                <FaShoppingCart />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/login">
              <span className="text-2xl">
                <FaUserCircle />
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default NavBar;
