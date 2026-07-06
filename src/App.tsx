import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Profile from "./routes/profile/Profile";
import ErrorPage from "./routes/errorPage";
import Root from "./routes/root/Root";
import BoardList from "./routes/boardList/BoardList";
import DetailView from "./routes/DetailView/DetailView";
import { UsernameProvider } from "./context/usernameContext";

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
  return (
    <UsernameProvider>
      <RouterProvider router={router} />
    </UsernameProvider>
  );
}

export default App;
