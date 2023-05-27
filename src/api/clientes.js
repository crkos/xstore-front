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

export const signUpCliente = async (userInfo) => {
  try {
    const { data } = await client.post("/cliente", userInfo, {
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

export const getClientes = async () => {
  try {
    const { data } = await client.get("/cliente", {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("auth-token"),
      },
    });
    return data;
  } catch (error) {
    const { response } = error;
    if (response?.data) return response.data;

    return { error: error.message || error };
  }
};
