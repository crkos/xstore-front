import client from "./client";

export const getProductos = async () => {
  try {
    const { data } = await client.get("/producto", {
      headers: {
        accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const getSingleProducto = async (productoId) => {
  try {
    const { data } = await client.get(`/producto/${productoId}`, {
      headers: {
        accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};

export const searchProducto = async (search) => {
  try {
    const { data } = await client.get(
      `/producto/search/producto?producto=${search}`,
      {
        headers: {
          accept: "application/json",
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

export const deleteProducto = async (productoId) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.delete(`/producto/${productoId}`, {
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

export const editCantidadProducto = async (productoId, existencia) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.patch(
      `/producto/edit/edit?productoId=${productoId}&existencia=${existencia}`,
      {},
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

export const editProducto = async (productoId, formData) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.patch(`/producto/${productoId}`, formData, {
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

export const createProducto = async (formData) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.post("/producto", formData, {
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

export const getProductosBySucursal = async () => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get("/producto/productos/sucursal", {
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
