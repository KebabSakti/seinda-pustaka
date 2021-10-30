export function user() {
  const user = {
    id: sessionStorage.getItem("id"),
    nama: sessionStorage.getItem("nama"),
    role: sessionStorage.getItem("role"),
    username: sessionStorage.getItem("username"),
    token: sessionStorage.getItem("token"),
  };

  return user;
}
