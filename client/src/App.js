import { logoutUser } from "./module/AuthModule";
import LoginPage from "./page/LoginPage";
import PageNotFound from "./page/PageNotFound";
import Template from "./component/Template";
import AdminMenu from "./component/AdminMenu";
import PerpusMenu from "./component/PerpusMenu";
import PageMiddleware from "./page/PageMiddleware";
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom";
import { Divider } from "antd";
import AdminHome from "./page/admin/AdminHome";
import PerpusHome from "./page/perpus/PerpusHome";
import PublicBook from "./page/public/PublicBook";
import AdminPerpustakaan from "./page/admin/AdminPerpustakan";
import { getPath } from "./module/HelperModule";

export default function App() {
  const history = useHistory();
  let location = useLocation();

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
        <span style={{ cursor: "pointer" }}>Semua Notifikasi</span>
      </Divider>
    </div>
  );

  async function logout() {
    try {
      await logoutUser();

      toLoginPage();
    } catch (e) {
      toLoginPage();
    }
  }

  function toLoginPage() {
    history.push("/");
  }

  return (
    <Switch>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <PageMiddleware>
        <Route path="/admin">
          <Template
            notif={notif}
            menu={
              <AdminMenu logout={logout} path={getPath(location.pathname)} />
            }
          >
            <Switch>
              <Route path="/admin/home">
                <AdminHome />
              </Route>
              <Route path="/admin/perpus">
                <AdminPerpustakaan />
              </Route>
              <Route path="*">
                <Redirect to="/admin/home" />
              </Route>
            </Switch>
          </Template>
        </Route>
        <Route path="/perpus">
          <Template notif={notif} menu={<PerpusMenu logout={logout} />}>
            <Switch>
              <Route path="/perpus/home">
                <PerpusHome />
              </Route>
              <Route path="*">
                <Redirect to="/perpus/home" />
              </Route>
            </Switch>
          </Template>
        </Route>
        <Route path="/public">
          <Switch>
            <Route path="/public/book">
              <PublicBook logout={logout} />
            </Route>
            <Route path="*">
              <Redirect to="/public/book" />
            </Route>
          </Switch>
        </Route>
      </PageMiddleware>
      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
}
