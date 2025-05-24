import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/login/login.tsx";
import SignUp from "../auth/signup/signup.tsx";
import NotFound from "../pages/notFound.tsx";
import LearningPage from "../learning/learning.tsx";
import Home from "../marketing/page";
import Dashboard from "@/dashboard/dashboard.tsx";
import AuthGuard from "@/lib/AuthGuard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/dashboard",
    element: <AuthGuard><Dashboard /></AuthGuard>,
  },
  {
    path: "/learning",
    element: <AuthGuard><LearningPage /></AuthGuard>,
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
