import { useRoutes } from "react-router-dom";
import App from "./App";
import Regist from "./pages/Regist";
import Search from "./pages/Search";

const Routes = () => {
  return useRoutes([
    { path: "/", element: <App /> },
    { path: "/search", element: <Search /> },
    { path: "/regist", element: <Regist /> },
  ]);
};

export default Routes;
