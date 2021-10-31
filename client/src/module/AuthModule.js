import { check, login, logout } from "../api/AuthApi";

export function getUser() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return user;
}

export function saveUser(user) {
  sessionStorage.setItem("user", JSON.stringify(user));

  return getUser();
}

export function deleteUser() {
  sessionStorage.removeItem("user");
}

export async function checkUser() {
  await check();
}

export async function loginUser(username, password) {
  let response = await login(username, password);

  let user = saveUser(response.data);

  return user;
}

export async function logoutUser() {
  await logout();

  deleteUser();
}
