import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { toast } from "sonner";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";
export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const firstname = nameRef.current?.value;
    const lastname = lastnameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!firstname || !lastname || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await register({ firstname, lastname, email, password });

      if (response.data?.detail === "Email already registered") {
        toast.error("Email already registered");
        return;
      }

      if (response.status === 200 || response.status === 201) {
        toast.success("Account created successfully");
        navigate("/login");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail || "An unexpected error occurred"
      );
    }
  };


  return (
    <form
      className={cn("w-full max-w-[90%] md:max-w-md mx-auto rounded-lg border border-border p-4 md:p-6 shadow-sm", className)}
      onSubmit={handleSubmit}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center mb-4 md:mb-6">
        <Logo width={200} height={200} className="filter contrast-150 brightness-70" />
        <h1 className="text-xl md:text-2xl font-bold">Create an account</h1>
        <p className="text-muted-foreground text-xs md:text-sm text-balance">
          Enter your information below to create your account
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4">
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="name">First Name</Label>
          <Input id="name" type="text" placeholder="John" ref={nameRef} required />
        </div>
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="lastname">Last Name</Label>
          <Input id="lastname" type="text" placeholder="Doe" ref={lastnameRef} required />
        </div>
      </div>

      <div className="space-y-3 md:space-y-4">
        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="name@example.com" ref={emailRef} required />
        </div>

        <div className="space-y-1 md:space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" ref={passwordRef} required />
        </div>

        <Button type="submit" className="w-full mt-2">
          Create Account
        </Button>
      </div>

      <div className="text-center text-xs md:text-sm mt-4 md:mt-6">
        Already have an account?{" "}
        <Link to="/login" className="text-primary hover:underline underline-offset-4 font-medium">
          Sign In
        </Link>
      </div>
    </form>
  );
}