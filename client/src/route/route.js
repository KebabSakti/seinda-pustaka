import LoginPage from "../page/LoginPage";
import AdminApp from "../page/admin/AdminApp";
import PerpusApp from "../page/perpus/PerpusApp";
import PublicApp from "../page/public/PublicApp";

const routes = [
  {
    path: "/",
    exact: true,
    page: <LoginPage />,
  },
  {
    path: "/admin",
    exact: false,
    page: <AdminApp />,
  },
  {
    path: "/perpus",
    exact: false,
    page: <PerpusApp />,
  },
  {
    path: "/public",
    exact: false,
    page: <PublicApp />,
  },
];

export default routes;
