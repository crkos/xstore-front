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
