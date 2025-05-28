import api from "./config";
import type { Course, Unit } from "@/types";
const CoursesService = {
    getCourses: async (): Promise<Course[]> => {
        const response = await api.get("/courses");
        return response.data;
    },
    getCourseById: async (id: string): Promise<Course> => {
        const response = await api.get(`/courses/${id}`);
        return response.data;
    },
    getUnitById: async (id: string): Promise<Unit> => {
        const response = await api.get(`/units/${id}`);
        return response.data;
    },
    getUserUnitProgress: async (userId: string, unitId: string) => {
        const response = await api.get(`/users/${userId}/units/${unitId}/progress`);
        return response.data;
    }
}

export default CoursesService;
