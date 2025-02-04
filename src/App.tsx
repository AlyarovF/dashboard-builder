import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Builder, Layout } from "./pages";

function App() {
  const routes = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Builder />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
