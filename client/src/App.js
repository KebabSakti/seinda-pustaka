import { BrowserRouter, Switch, Route } from "react-router-dom";
import PageNotFound from "./page/PageNotFound";
import routes from "./route/route";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((r, i) => {
          return (
            <Route key={i} exact={r.exact} path={r.path}>
              <r.page />
            </Route>
          );
        })}
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
