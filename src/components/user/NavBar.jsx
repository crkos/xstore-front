import SearchBar from "../form/SearchBar.jsx";
import { BsFillBellFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <nav className="bg-navbarColor font-light w-full">
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
          <li className="border-r-2 pr-6 border-r-gray-400">
            <Link to="/">
              <span className="text-lg">Mis compras</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="text-lg">
                <BsFillBellFill />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span className="text-lg">
                <FaShoppingCart />
              </span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <span>
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