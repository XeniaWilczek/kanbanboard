import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./routes/profile/Profile";
import ErrorPage from "./routes/errorPage";
import Root from "./routes/root/Root";
import BoardList from "./routes/boardList/BoardList";
import BoardCard from "./components/BoardCard/BoardCard";
import DetailView from "./routes/DetailView/DetailView";

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
            path: "boardlist/:id",
            element: <DetailView />,
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
