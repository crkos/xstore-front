import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <>
      <ul className="flex gap-2 items-center justify-evenly p-2 pt-5 pb-5 flex-wrap font-light text-lg bg-categoriesColor">
        <li>
          <Link to="/">
            <span>Todos los productos</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <span>Computadoras de escritorio</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <span>Laptops</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <span>Celulares</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <span>Accesorios</span>
          </Link>
        </li>
        <li>
          <Link to="/">
            <span>Licencias de software</span>
          </Link>
        </li>
      </ul>
    </>
  );
};

export default Categories;
