import { BrowserRouter, Switch, Route } from "react-router-dom";
import routes from "./route/route";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        {routes.map((r, i) => {
          return (
            <Route
              key={i}
              exact={r.exact}
              path={r.path}
              component={() => {
                if (r.template == null) {
                  return <r.component />;
                }

                return (
                  <r.template>
                    <r.component />
                  </r.template>
                );
              }}
            />
          );
        })}
      </Switch>
    </BrowserRouter>
  );
}
