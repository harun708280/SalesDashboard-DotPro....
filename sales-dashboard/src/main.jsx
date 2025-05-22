import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { RouterProvider } from "react-router-dom";
import router from "./routes/Route.jsx";
import { FaqProvider } from "./context/FaqContext.jsx";


function MainApp() {
  return (
    <StrictMode>
      <FaqProvider>
      <RouterProvider router={router} />
      </FaqProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")).render(<MainApp />);
