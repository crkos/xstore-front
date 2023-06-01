// Obtiene los datos de los proveedores y los muestra en el componente de autocompletado de liveSearch
export const renderItemProveedor = (result) => {
  return (
    <div
      key={result.clave_proveedor}
      className="flex space-x-2 rounded overflow-hidden"
    >
      <img
        src="/proveedores.png"
        alt={result.nombre_proveedor}
        className="w-16 h-16 object-cover"
      />
      <div>
        <p className="dark:text-white font-semibold">
          {result.clave_proveedor}
        </p>
        <p className="dark:text-white font-semibold">
          {result.nombre_proveedor}
        </p>
      </div>
    </div>
  );
};
