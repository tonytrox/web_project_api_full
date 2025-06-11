const BASE_URL = "http://localhost:3008";

export const register = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error("Error de registro", error);
  }
};

export const authorization = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Estoy enviando JSON
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error("Error de autorización", error);
  }
};

export const getUserInfoEmail = async () => {
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error("El token provisto es inválido", error);
  }
};
