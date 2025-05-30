import type { CompletionsResponse, CreateLessonRequest, UpdateLessonRequest } from "@/types";
import api from "./config"

const LessonServices = {
  getLesson: async (id: string) => {
    const response = await api.get(`/lessons/${id}`);
    return response.data;
  },
  createLesson: async (data:CreateLessonRequest) => {
        const response = await api.post(`/lessons`, data);
        return response.data;
  },
  updateLesson: async (id: string,data : UpdateLessonRequest) => {
    const response = await api.put(`/lessons/${id}`,data);
    return response.data;
    },
  deleteLesson: async (id: string) => {
      const response = await api.delete(`/lessons/${id}`);
      return response.data;
  },
  CompleteLesson: async (userId:string,lessonId: string) => {
    const response = await api.post(`/users/${userId}/lessons/${lessonId}/complete`);
    return response.data;
  },
  getUserCompletions: async (userId: string) :Promise<CompletionsResponse> => {
    const response = await api.get(`/users/${userId}/complete`);
    return response.data;
  }
};
export default LessonServices;