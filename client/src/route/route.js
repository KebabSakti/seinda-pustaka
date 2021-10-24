import Template from "../component/Template";
import BookPage from "../page/BookPage";
import HomePage from "../page/HomePage";
import LoginPage from "../page/LoginPage";

const routes = [
  {
    path: "/",
    component: LoginPage,
    template: null,
    exact: true,
  },
  {
    path: "/home",
    component: HomePage,
    template: Template,
    exact: false,
  },
  {
    path: "/book",
    component: BookPage,
    template: null,
    exact: false,
  },
];

export default routes;
