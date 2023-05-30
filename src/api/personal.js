import client from "./client";

export const getPersonal = async () => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get("/personal", {
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

export const deletePersonal = async (id) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.delete(`/personal/${id}`, {
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

export const createPersonal = async (personal) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.post("/personal", personal, {
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

export const loginPersonal = async (personal) => {
  try {
    const { data } = await client.post("/personal/login", personal, {
      headers: {
        accept: "application/json",
      },
    });
    return data;
  } catch (error) {
    return { error: error.message || error };
  }
};

export const editPersonal = async (personal, personalId) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.patch("/personal/" + personalId, personal, {
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

export const getSinglePersonal = async (personalId) => {
  const token = localStorage.getItem("auth-token");
  try {
    const { data } = await client.get("/personal/" + personalId, {
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
