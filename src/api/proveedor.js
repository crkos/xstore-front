import client from "./client";

export const searchProveedor = async (proveedor) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get(
      `/proveedor/proveedor/search?search=${proveedor}`,
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

export const getProveedores = async () => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get("/proveedor/", {
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

export const deleteProveedor = async (id) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.delete(`/proveedor/${id}`, {
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

export const createProveedor = async (proveedor) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.post("/proveedor/", proveedor, {
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
