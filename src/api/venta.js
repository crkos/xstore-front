import client from "./client";

export const createVenta = async (productos) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.post(
      "/venta",
      { productos },
      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const getVentasCliente = async () => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get("/venta/ventas/user", {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const searchVenta = async (search) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get(
      `/venta/search/venta?producto=${search}`,
      {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + token,
        },
      }
    );
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const getAllVentas = async () => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get("/venta", {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const devolverVenta = async (ventaId) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get("/venta/devolver/" + ventaId, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const cancelarVenta = async (ventaId) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get("/venta/cancelar/" + ventaId, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
