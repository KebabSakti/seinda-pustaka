import axios from "axios";
import { getUser } from "./AuthModule";

export default function Network() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL + "/api",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (getUser() != null) {
    instance.defaults.headers.common.Authorization =
      "Bearer " + getUser().token;
  }

  return instance;
}
