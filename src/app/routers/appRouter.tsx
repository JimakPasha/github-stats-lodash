import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Error } from "../../pages";
import { Layout } from "../layout";

export const AppRouter = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <Error type={"unknownError"} />,
      children: [{ path: "/", element: <Home /> }],
    },
    {
      path: "*",
      element: <Error type={"notFound"} />,
    },
  ]);

  return <RouterProvider router={router} />;
};
