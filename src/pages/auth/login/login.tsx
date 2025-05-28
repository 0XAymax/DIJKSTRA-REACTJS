import { useAuth } from "@/context/AuthContext";
import { LoginForm } from "./login-form";
import Logo from "@/components/ui/Logo";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Login() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen ">
        <div className="p-8 rounded-lg shadow-lg w-96 flex flex-col items-center">
          <Logo  width={250} height={250} className="filter contrast-150 brightness-70" />
          <LoginForm />
        </div>
      </div>
    </>
  );
}