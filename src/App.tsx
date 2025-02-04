import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { Builder, Layout } from "./pages";

/**
 * The main application component that sets up the routing for the dashboard builder.
 *
 * @returns {JSX.Element} The RouterProvider component with the defined routes.
 *
 * The routes are defined using `createBrowserRouter` with the following structure:
 * - The root path (`""`) renders the `Layout` component.
 * - The child path (`"/"`) renders the `Builder` component.
 */
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
