import SearchBar from "../form/SearchBar.jsx";
import { BsFillBellFill } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/index.js";
import { useState } from "react";

function NavBar() {
  const { authInfo, handleLogOut } = useAuth();
  const { isLoggedIn } = authInfo;
  const [showMenu, setShowMenu] = useState(false); // Agrega estado para controlar la visibilidad del menú

  const handleUserClick = () => {
    setShowMenu(!showMenu); // Cambia el estado para mostrar u ocultar el menú al hacer clic en el icono de usuario
  };

  const handleLogoutUser = () => {
    handleLogOut(); // Llama al método 'logout' para desloguearse
    setShowMenu(false); // Oculta el menú después de desloguearse
  };

  const navigate = useNavigate();
  const handleSearchSubmit = (searchTerm) => {
    navigate(`/search?producto=${searchTerm.trim()}`);
  };

  if (
    isLoggedIn &&
    (authInfo.profile?.role === "Administrador" ||
      authInfo.profile?.role === "Gerente")
  ) {
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
              <Link to="/consultas">
                <span className="text-lg">Consultas</span>
              </Link>
            </li>
            <li>
              <div className="relative">
                <span className="text-2xl" onClick={handleUserClick}>
                  <FaUserCircle />
                </span>
                {showMenu && ( // Renderiza el menú solo cuando showMenu es true
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded shadow-xl">
                    <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={handleLogoutUser}
                    >
                      Desloguearse
                    </button>
                  </div>
                )}
              </div>
            </li>
          </ul>
        </nav>
      </>
    );
  }

  if (isLoggedIn && authInfo.profile.role !== "Administrador") {
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
              <div className="relative">
                <span className="text-2xl" onClick={handleUserClick}>
                  <FaUserCircle />
                </span>
                {showMenu && ( // Renderiza el menú solo cuando showMenu es true
                  <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded shadow-xl">
                    <button
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={handleLogoutUser}
                    >
                      Desloguearse
                    </button>
                  </div>
                )}
              </div>
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
              onSubmit={handleSearchSubmit}
            />
          </li>
          <li className="border-r-2 pr-6 border-r-gray-400">
            <Link to="/">
              <span className="text-lg">Inicio</span>
            </Link>
          </li>
          <li className="border-r-2 pr-6 border-r-gray-400">
            <Link to="/sobre-nosotros">
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
