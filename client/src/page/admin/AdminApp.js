import { useRouteMatch, Redirect, Switch, Route } from "react-router-dom";
import Template from "../../component/Template";
import adminRoutes from "../../route/admin_route";
import AdminMenu from "../../component/AdminMenu";
import { Divider } from "antd";

export default function AdminApp() {
  const { path, url } = useRouteMatch();

  const notif = (
    <div style={{ width: "250px" }}>
      <Divider>22 Oktober 2024</Divider>
      <p>
        Buku <strong style={{ color: "green" }}>Mencari Cinta Sejati</strong>{" "}
        yang anda pinjam jatuh tempo pada{" "}
        <strong style={{ color: "red" }}>24 Oktober 2024</strong>
      </p>
      <Divider>24 Oktober 2024</Divider>
      <p>
        Buku <strong style={{ color: "green" }}>Mencari Cinta Sejati</strong>{" "}
        yang anda sewa telah jatuh tempo, harap segera mengembalikan buku
        tersebut
      </p>
      <Divider>
        <a href="#">Semua Notifikasi</a>
      </Divider>
    </div>
  );

  return (
    <Switch>
      {adminRoutes.map((r, i) => {
        return (
          <Route key={i} exact={r.exact} path={path + r.path}>
            {
              <Template menu={<AdminMenu />} notif={notif}>
                {r.page}
              </Template>
            }
          </Route>
        );
      })}
      <Route path={"*"}>
        <Redirect to={url + "/home"} />
      </Route>
    </Switch>
  );
}
