import { useRoutes } from "react-router-dom";
import App from "./App";
import Regist from "./pages/Regist";
import Search from "./pages/Search";
import TableForm from "./pages/Table";

const Routes = () => {
  return useRoutes([
    { path: "/", element: <App /> },
    { path: "/search", element: <Search /> },
    { path: "/regist", element: <Regist /> },
    { path: "/table", element: <TableForm /> },
  ]);
};

export default Routes;
