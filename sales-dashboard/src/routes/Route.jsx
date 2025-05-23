import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Dashboard from "../page/Dashboard";
import FAQSettings from "../page/FAQSettings";
import Login from "../page/Login";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children:[
      {
        path:'/',
        element:<Login/>

      },
        {
            path:'/dashboard',
            element:<Dashboard/>
        },

        {
          path:'/faq',
          element:<FAQSettings/>
        },
        
         

    ]
  }
]);

export default router;
