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
import { Divider, Modal, Spin } from "antd";
import AdminHome from "./page/admin/AdminHome";
import PerpusHome from "./page/perpus/PerpusHome";
import PublicBook from "./page/public/PublicBook";
import AdminPerpustakaan from "./page/admin/AdminPerpustakan";
import { getPath } from "./module/HelperModule";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import AdminBuku from "./page/admin/AdminBuku";
import AdminUser from "./page/admin/AdminUser";
import AdminJenisPerpus from "./page/admin/AdminJenisPerpus";
import AdminKabupaten from "./page/admin/AdminKabupaten";
import AdminKecamatan from "./page/admin/AdminKecamatan";
import AdminKelurahan from "./page/admin/AdminKelurahan";
import AdminProvinsi from "./page/admin/AdminProvinsi";
import AdminKonfigurasi from "./page/admin/AdminKonfigurasi";
import AdminPinjamBuku from "./page/admin/AdminPinjamBuku";
import PerpusPerpustakaan from "./page/perpus/PerpusPerpustakaan";
import PerpusBuku from "./page/perpus/PerpusBuku";
import PerpusPinjamBuku from "./page/perpus/PerpusPinjamBuku";
import PerpusUser from "./page/perpus/PerpusUser";

export default function App() {
  const history = useHistory();
  const loader = <LoadingOutlined style={{ fontSize: 40 }} spin />;

  let location = useLocation();

  const [fullLoading, setFullLoading] = useState(false);

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
      setFullLoading(true);

      await logoutUser();

      setFullLoading(false);

      toLoginPage();
    } catch (e) {
      setFullLoading(false);

      toLoginPage();
    }
  }

  function toLoginPage() {
    history.push("/");
  }

  return (
    <div>
      <Modal
        centered
        width={150}
        footer={null}
        closable={false}
        maskClosable={false}
        keyboard={false}
        visible={fullLoading}
        style={{ textAlign: "center" }}
      >
        <Spin size="large" tip="Loading.." indicator={loader} />
      </Modal>
      <Switch>
        <Route exact path="/">
          <LoginPage />
        </Route>
        <PageMiddleware setFullLoading={setFullLoading}>
          <Route path="/admin">
            <Template
              // notif={notif}
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
                <Route path="/admin/buku">
                  <AdminBuku />
                </Route>
                <Route path="/admin/pinjam">
                  <AdminPinjamBuku />
                </Route>
                <Route path="/admin/user">
                  <AdminUser />
                </Route>
                <Route path="/admin/kabupaten">
                  <AdminKabupaten />
                </Route>
                <Route path="/admin/kecamatan">
                  <AdminKecamatan />
                </Route>
                <Route path="/admin/kelurahan">
                  <AdminKelurahan />
                </Route>
                <Route path="/admin/provinsi">
                  <AdminProvinsi />
                </Route>
                <Route path="/admin/jenis_perpus">
                  <AdminJenisPerpus />
                </Route>
                <Route path="/admin/config">
                  <AdminKonfigurasi />
                </Route>
                <Route path="*">
                  <Redirect to="/admin/home" />
                </Route>
              </Switch>
            </Template>
          </Route>
          <Route path="/perpus">
            <Template
              notif={notif}
              menu={
                <PerpusMenu logout={logout} path={getPath(location.pathname)} />
              }
            >
              <Switch>
                <Route path="/perpus/home">
                  <PerpusHome />
                </Route>
                <Route path="/perpus/perpus">
                  <PerpusPerpustakaan />
                </Route>
                <Route path="/perpus/buku">
                  <PerpusBuku />
                </Route>
                <Route path="/perpus/pinjam">
                  <PerpusPinjamBuku />
                </Route>
                <Route path="/perpus/user">
                  <PerpusUser />
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
    </div>
  );
}
