import client from "./client";

export const searchDepartamento = async (proveedor) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get(
      `/departamento/departamento/search?nombre_departamento=${proveedor}`,
      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    return { error: error.message || error };
  }
};
