import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./router"; 
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from 'sonner';
import { CourseProvider } from "./context/CourseContext";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CourseProvider>
        <Toaster richColors />
        <RouterProvider router={router} />
      </CourseProvider>
    </AuthProvider>
  </React.StrictMode>
);
