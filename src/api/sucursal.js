import client from "./client";

export const searchSucursal = async (nombre_sucursal) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get(
      `/sucursal/search/sucursal?nombre_sucursal=${nombre_sucursal}`,
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

export const getSucursales = async () => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get(`/sucursal`, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return { error: error.message || error };
  }
};

export const createSucursal = async (sucursal) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.post("/sucursal/", sucursal, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return { error: error.message || error };
  }
};

export const deleteSucursal = async (id) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.delete(`/sucursal/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    return { error: error.message || error };
  }
};
