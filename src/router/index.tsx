import { createBrowserRouter } from "react-router-dom";
import Login from "../auth/login/login.tsx";
import SignUp from "../auth/signup/signup.tsx";
import NotFound from "../pages/notFound.tsx";
import LearningPage from "../learning/learning.tsx";
import Home from "../marketing/page"; 


 const router = createBrowserRouter([
  {
    
        path: '/',
        element: <Home/>
      },
      {
        path: '/login',
        element: <Login/>
      },
      {
        path: '/sign-up',
        element: <SignUp/>
      },
      {
        path: '/learning',
        element: <LearningPage/>
      },
     
      {
        path: '*',
        element: <NotFound/>
      },

    ]
   );
export default router;