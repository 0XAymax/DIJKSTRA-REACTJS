import type { UpdateUserUnitProgressRequest } from "@/types";
import api from "./config";

const UnitServices = {
  getUnit: async (id: string) => {
    const response = await api.get(`/units/${id}`);
    return response.data;
  },
  getUserProgress: async (user_id: string) => {
    const response = await api.get(`/users/${user_id}/units`);
    return response.data;
  },
  getUserUnitProgress: async (user_id: string, unit_id:string) => {
    const response = await api.get(
      `/users/${user_id}/units/${unit_id}/progress`
    );
    return response.data;
  },
  UpdateUserUnitProgress: async (user_id: string, unit_id:string,data : UpdateUserUnitProgressRequest) => {
    const response = await api.post(
        `/users/${user_id}/units/${unit_id}/progress`,
        data
    );
    return response.data;
  },
};
export default UnitServices;
