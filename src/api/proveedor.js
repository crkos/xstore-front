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
