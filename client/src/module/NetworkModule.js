import axios from "axios";
import { user } from "./AuthModule";

export default function Network() {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (user["token"] != null) {
    instance.defaults.headers = {
      Authorization: "Bearer " + user["token"],
    };
  }

  return instance;
}
