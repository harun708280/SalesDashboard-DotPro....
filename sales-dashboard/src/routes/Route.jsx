import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Dashboard from "../page/Dashboard";
import FAQSettings from "../page/FAQSettings";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
        {
            path:'/',
            element:<Dashboard/>
        },

        {
          path:'/faq',
          element:<FAQSettings/>
        }
    ]
  }
]);

export default router;
