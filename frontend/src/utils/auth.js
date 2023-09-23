export const BASE_URL = "https://api.project.mesto.nomoredomainsrocks.ru";

const headers = {
  "Content-Type": "application/json",
};

const checkResponse = (response) =>
  response.ok
    ? response.json()
    : Promise.reject(
        new Error(`Ошибка ${response.status}: ${response.statusText}`)
      );

export const handleRegisterUser = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};

export const handleLoginUser = (password, email) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      password,
      email,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: { ...headers, Authorization: `Bearer ${token}` },
  }).then((res) => {
    return checkResponse(res);
  });
};
