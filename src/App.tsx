import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Profile from "./routes/profile/Profile";
import ErrorPage from "./routes/errorPage";
import Root from "./routes/root/Root";
import BoardList from "./routes/boardList/BoardList";
import SingleBoard from "./routes/singleBoard/SingleBoard";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
          {
            index: true,
            element: <BoardList />,
          },
          {
            path: "boardlist/singleboard/:id",
            element: <SingleBoard />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
    {
      basename: "/kanbanboard",
    },
  );

  return <RouterProvider router={router} />;
}

export default App;
