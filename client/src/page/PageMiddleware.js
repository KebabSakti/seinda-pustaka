import { useEffect, useCallback } from "react";
import { message, notification } from "antd";
import { useHistory } from "react-router-dom";
import { checkUser, getUser } from "../module/AuthModule";
import { initConfig } from "../module/ConfigModule";

export default function PageMiddleware({ children, setFullLoading }) {
  const history = useHistory();

  const init = useCallback(async () => {
    try {
      setFullLoading(true);

      await checkUser();

      await initConfig({});

      setFullLoading(false);

      message.success("Anda login sebagai " + getUser().user_profile.nama);
    } catch (e) {
      console.log(e);

      setFullLoading(false);

      notification.error({
        message: "Error",
        description: "Akses tidak di izinkan, login untuk melanjutkan",
      });

      history.push("/");
    }
  }, [history, setFullLoading]);

  useEffect(() => {
    init();
  }, [init]);

  return children;
}
