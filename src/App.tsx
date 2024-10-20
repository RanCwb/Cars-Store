import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/home";
import { Layout } from "./components/layout";
import { CartDetail } from "./pages/CarsDetail";
import { Dashboard } from "./pages/Dashboard";
import { New } from "./pages/Dashboard/New";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";

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
        element: <CartDetail />,
      },

      {
        path: "/dashboard",
        element: <Dashboard />,
      },

      {
        path: "/dashboard/new",
        element: <New />,
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
