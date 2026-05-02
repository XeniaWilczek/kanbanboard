import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Boards from "./routes/boards/Boards";
import Details from "./routes/details/Details";
import Profile from "./routes/profile/Profile";
import ErrorPage from "./routes/errorPage";
import Root from "./routes/root/Root";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: "boards", // Boards als Child von Root
            children: [
              {
                index: true,
                element: <Boards />,
              },
              {
                path: "details/:id", // Details als Child von Boards
                element: <Details />,
              },
            ],
          },
          {
            path: "profile", // Profile als Child von Root
            element: <Profile />,
          },
        ],
      },
    ],
    {
      basename: "/kanbanboard",
    },
  );
  return <RouterProvider router={router}></RouterProvider>;
}
export default App;
