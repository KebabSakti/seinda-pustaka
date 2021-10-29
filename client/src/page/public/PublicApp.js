import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import publicRoutes from "../../route/public_route";

export default function PublicPage() {
  const { path, url } = useRouteMatch();

  return (
    <Switch>
      {publicRoutes.map((r, i) => {
        return (
          <Route key={i} exact={r.exact} path={path + r.path}>
            {<r.page />}
          </Route>
        );
      })}
      <Route path={"*"}>
        <Redirect to={url + "/book"} />
      </Route>
    </Switch>
  );
}
