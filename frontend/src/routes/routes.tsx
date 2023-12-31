import App from "@/App";
import AllBooks from "@/pages/AllBooks/AllBooks";
import EditBook from "@/pages/EditBook/EditBook";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import NewBook from "@/pages/NewBook/NewBook";
import Register from "@/pages/Register/Register";
import SingleBook from "@/pages/SingleBook/SingleBook";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/books",
        element: <AllBooks />,
      },
      {
        path: "/books/:id",
        element: <SingleBook />,
      },
      {
        path: "/books/:id/edit",
        element: <EditBook />,
      },
      {
        path: "books/new",
        element: <PrivateRoute children={<NewBook />} />,
      }
    ],
  },


]);

export default routes;
