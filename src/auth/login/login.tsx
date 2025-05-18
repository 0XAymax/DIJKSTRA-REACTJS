import { LoginForm } from "./login-form";
import Logo from "@/components/ui/Logo";
export default function Login() {

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