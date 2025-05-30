import type { CreateProblemRequest, UpdateProblemRequest} from "@/types";
import api from "./config";

const ProblemServices = {
  getProblem: async (id: string) => {
    const response = await api.get(`/practice-problems/${id}`);
    return response.data;
  },
  CreateProblem: async (data:CreateProblemRequest) => {
    const response = await api.post(`/practice-problems`,data);
    return response.data;
  },
  deleteProblem: async (problem_id : string) => {
    const response = await api.delete(`/practice-problems/${problem_id}`);
    return response.data;
  },
  UpdateProblem: async (
    problem_id: string,
    data: UpdateProblemRequest
  ) => {
    const response = await api.put(
      `/practice_problems/${problem_id}`,
      data
    );
    return response.data;
  },
  CompleteProblem: async (userId: string, problemId: string) => {
    console.log("Completing problem for user:", userId, "Problem ID:", problemId);
    const response = await api.post(
      `/users/${userId}/practice_problems/${problemId}/complete`
    );
    return response;
  }
};
export default ProblemServices;
