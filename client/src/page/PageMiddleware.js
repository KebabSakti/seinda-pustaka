import { useEffect } from "react";
import { message, notification } from "antd";
import { useHistory } from "react-router-dom";
import { checkUser, getUser } from "../module/AuthModule";

export default function PageMiddleware({ children }) {
  const history = useHistory();

  useEffect(() => {
    check();
  }, []);

  async function check() {
    try {
      await checkUser();

      message.success("Anda login sebagai " + getUser().username);
    } catch (e) {
      notification.error({
        message: "Error",
        description: "Akses tidak di izinkan, login untuk melanjutkan",
      });

      history.push("/");
    }
  }

  return children;
}
