//Renderiza los items de los departamentos al buscarlos en liveSearch
export const renderItemDepartamento = (result) => {
  return (
    <div
      key={result.clave_departamento}
      className="flex space-x-2 rounded overflow-hidden"
    >
      <img
        src="/departamentos.png"
        alt={result.nombre_departamento}
        className="w-16 h-16 object-cover"
      />
      <div>
        <p className="dark:text-white font-semibold">
          {result.clave_departamento}
        </p>
        <p className="dark:text-white font-semibold">
          {result.nombre_departamento}
        </p>
      </div>
    </div>
  );
};
