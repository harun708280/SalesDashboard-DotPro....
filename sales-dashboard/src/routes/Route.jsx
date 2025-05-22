import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";

// 🔧 এখানে Array হওয়া উচিত!
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
  }
]);

export default router;
