import Network from "../module/NetworkModule";

const axios = Network();

export async function login(username, password) {
  return await axios.post("/auth/login", {
    username: username,
    password: password,
  });
}
