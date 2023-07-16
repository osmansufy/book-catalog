import App from "@/App";
import AllBooks from "@/pages/AllBooks/AllBooks";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Login/Login";
import NewBook from "@/pages/NewBook/NewBook";
import Register from "@/pages/Register/Register";
import { createBrowserRouter } from "react-router-dom";

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
        element: <AllBooks />,
      },
      {
        path: "/books/:id/edit",
        element: <AllBooks />,
      },
      {
        path: "books/new",
        element: <NewBook />,
      }
    ],
  },


]);

export default routes;
