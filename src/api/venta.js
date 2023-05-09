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
