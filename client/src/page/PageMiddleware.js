import { useEffect, useCallback } from "react";
import { message, notification } from "antd";
import { useHistory } from "react-router-dom";
import { checkUser, getUser } from "../module/AuthModule";

export default function PageMiddleware({ children, setFullLoading }) {
  const history = useHistory();

  const check = useCallback(async () => {
    try {
      setFullLoading(true);

      await checkUser();

      setFullLoading(false);

      message.success("Anda login sebagai " + getUser().user_profile.nama);
    } catch (e) {
      notification.error({
        message: "Error",
        description: "Akses tidak di izinkan, login untuk melanjutkan",
      });

      history.push("/");
    }
  }, [history, setFullLoading]);

  useEffect(() => {
    check();
  }, [check]);

  return children;
}
