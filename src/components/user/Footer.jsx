import { Link } from "react-router-dom";

//Aquí en el footer puede ir mt-auto o fixed dependiendo de si se quiere que se quede abajo o que se siga con el contenido
// y el bodu tenga que scrollear y que siempre se veal el footer con fixed siempre se ve footer incluso si hay mucho contenido
// y no se tiene que scrollear para verlo pero si se quiere que se quede abajo se usa mt-auto

const Footer = () => {
  return (
    <>
      <footer className="bg-navbarColor flex w-full p-4 pb-6 pt-6 h-max mt-auto bottom-0 space-x-8">
        <div className="w-2/12 ml-4 p-2">
          <p className="text-md text mb-2 font-bold">
            Tecnología pensada para ti
          </p>
          <p className="text-xs">
            Comienza a adentrarte en la tecnología de vanguardia con nuestros
            productos
          </p>
        </div>
        <div className="max-w-2/12 ml-4 p-2 ">
          <p className="text-md text mb-2 font-bold">Información</p>
          <Link to="/politicas">
            <p className="text-xs underline hover:no-underline pb-2">
              Política de privacidad
            </p>
          </Link>
          <Link to="/terminos-condiciones">
            <p className="text-xs underline hover:no-underline">
              Términos y condiciones
            </p>
          </Link>
        </div>
        <div className="max-w-2/12 ml-4 p-2">
          <p className="text-md text mb-2 font-bold">Tienda</p>
          <Link to="/">
            <p className="text-xs underline hover:no-underline">
              Sobre nosotros
            </p>
          </Link>
        </div>
        <div className="w-2/12 ml-4 p-2">
          <p className="text-md text mb-2 font-bold">Contáctenos</p>
          <p className="text-xs underline hover:no-underline pb-2">
            admin@gmail.com
          </p>
          <p className="text-xs underline hover:no-underline">
            (+34) 947 300 2171
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
