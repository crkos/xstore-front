//Función que renderiza los resultados de la búsqueda de la sucursal en liveSearch
export const renderItemSucursal = (result) => {
  return (
    <div
      key={result.clave_sucursal}
      className="flex space-x-2 rounded overflow-hidden"
    >
      <img
        src="/sucursal.png"
        alt={result.nombre}
        className="w-16 h-16 object-cover"
      />
      <div>
        <p className="dark:text-white font-semibold">{result.clave_sucursal}</p>
        <p className="dark:text-white font-semibold">
          {result.nombre_sucursal}
        </p>
      </div>
    </div>
  );
};
