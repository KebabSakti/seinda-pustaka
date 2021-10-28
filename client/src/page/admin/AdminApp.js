import { Switch } from "antd";
import { useRouteMatch } from "react-router-dom";
import { adminRoutes } from "../../route/admin_route";

export default function AdminApp() {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      {adminRoutes.map((r, i) => {
        return (
          <Route key={i} exact={r.exact} path={path + "/" + r.path}>
            {<r.page />}
          </Route>
        );
      })}
      <Route path={path + "/*"}>
        <PageNotFound />
      </Route>
    </Switch>
  );
}
