import client from "./client";

export const loginCliente = async (userInfo) => {
  try {
    const { data } = await client.post("/cliente/login", userInfo, {
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

export const getIsAuth = async (token) => {
  try {
    const { data } = await client.get("/cliente/auth/is-auth", {
      headers: {
        Authorization: "Bearer " + token,
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
