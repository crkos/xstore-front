export const renderItemProveedor = (result) => {
  return (
    <div
      key={result.clave_proveedor}
      className="flex space-x-2 rounded overflow-hidden"
    >
      <img
        src={result.avatar}
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
