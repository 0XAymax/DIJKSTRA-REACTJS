import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/login/login.tsx";
import SignUp from "../pages/auth/signup/signup.tsx";
import NotFound from "../pages/notFound.tsx";
import LearningPage from "../pages/learning/learning.tsx";
import Home from "../pages/marketing/page.tsx";
import Dashboard from "@/pages/dashboard/dashboard.tsx";
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
    element: (
      <AuthGuard>
        <Dashboard />
      </AuthGuard>
    ),
  },
  {
    path: "/learning",
    element: (
      <AuthGuard>
        <LearningPage />
      </AuthGuard>
    ),
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
