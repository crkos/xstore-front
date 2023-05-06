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
