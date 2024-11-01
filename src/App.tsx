import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { CartDetail } from "./pages/CarsDetail";
import { Dashboard } from "./pages/Dashboard";
import { New } from "./pages/Dashboard/New";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PrivateRoute } from "./routes/Private";

export const router = createBrowserRouter([
  {
    //components with header
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/car/:id",
        element: <PrivateRoute children={<CartDetail />} />,
      },

      {
        path: "/dashboard",
        element: <PrivateRoute children={<Dashboard />} />,
      },

      {
        path: "/dashboard/new",
        element: <PrivateRoute children={<New />} />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
