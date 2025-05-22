import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Dashboard from "../page/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
        {
            path:'/',
            element:<Dashboard/>
        }
    ]
  }
]);

export default router;
