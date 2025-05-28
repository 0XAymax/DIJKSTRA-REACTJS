import CoursesService from "@/api/courses.service";
import UnitServices from "@/api/unit.service";
import type { Course, Progress } from "@/types";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useAuth } from "./AuthContext";

export interface CourseContextType {
  courses: Course[];
  setCourses: (course: Course[]) => void;
  unitsProgress: Progress[];
  setUnitsProgress: (unitsProgress: Progress[]) => void;
  getCourseById: (id: string) => Course | undefined;
  loading: boolean;
  getUserUnitProgress: (userId: string, unitId: string) => Promise<any>;
}
const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
}

export const CourseProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [unitsProgress, setUnitsProgress] = useState<Progress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await CoursesService.getCourses();
        if (response) {
          setCourses(response);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, []);

  useEffect(() => {
    const fetchProgress = async (userId: string) => {
      try {
        const response = await UnitServices.getUserProgress(userId);
        setUnitsProgress(response);
      } catch (e: any) {
        console.error(e);
      }
    };

    if (currentUser) fetchProgress(currentUser.id);
  }, [currentUser]);

  const getCourseById = (id: string) => {
    return courses?.find((course) => course.id === id);
  };
  const getUserUnitProgress = async (userId: string, unitId: string) => {
    try {
      const response = await CoursesService.getUserUnitProgress(userId, unitId);
      return response;
    } catch (error) {
      console.error("Error fetching user unit progress:", error);
    }
  };
  const value = {
    courses,
    setCourses,
    getCourseById,
    loading,
    getUserUnitProgress,
  };

  return (
    <CourseContext.Provider value={value}>{children}</CourseContext.Provider>
  );
};
