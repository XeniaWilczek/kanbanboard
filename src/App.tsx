import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Board from "./routes/board/Board";
import Details from "./routes/details/Details";
import Profile from "./routes/profile/Profile";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",

        element: <Board />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/board/:id",
        element: <Details />,
      },
    ],
    {
      basename: "/kanbanboard",
    },
  );

  return <RouterProvider router={router} />;
}

export default App;
