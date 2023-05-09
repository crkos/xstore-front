import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="min-w-max">
      <ul className="flex gap-2 items-center justify-evenly p-2 pt-5 pb-5 flex-wrap font-light text-lg bg-categoriesColor min-w-full">
        <li>
          <Link to="/">
            <span>Todos los productos</span>
          </Link>
        </li>
        <li>
          <Link to="/computadoras">
            <span>Computadoras de escritorio</span>
          </Link>
        </li>
        <li>
          <Link to="/laptops">
            <span>Laptops</span>
          </Link>
        </li>
        <li>
          <Link to="/celulares">
            <span>Celulares</span>
          </Link>
        </li>
        <li>
          <Link to="/accesorios">
            <span>Accesorios</span>
          </Link>
        </li>
        <li>
          <Link to="/licencias-software">
            <span>Licencias de software</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Categories;
