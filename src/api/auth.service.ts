import type { LoginRequest, RegisterRequest } from "@/types";
import api from "./config";

const AuthService = {
  login: async (data: LoginRequest) => {
    const response = await api.post("/auth/login", data);
    return response;
  },
  register: async (data: RegisterRequest) => {
    // console.log("Registering user:", data);
    const response = await api.post("/auth/register", data);
    return response;
  },
  logout: () => {
    localStorage.removeItem("token");
  },
  verifyToken: async (token: string) => {
    const response = await api.post("/auth/verify", { token });
    return response;
  },
};

export default AuthService;
