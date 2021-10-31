import Network from "../module/NetworkModule";

export async function check() {
  await Network().post("/auth/check");
}

export async function login(username, password) {
  return await Network().post("/auth/login", {
    username: username,
    password: password,
  });
}

export async function logout(userId) {
  await Network().post("/auth/logout", { id: userId });
}
