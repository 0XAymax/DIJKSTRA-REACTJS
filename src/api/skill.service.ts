import api from "./config";

const SkillServices = {
  getAllSkills: async () => {
    const response = await api.get("/skills");
    return response.data;
  },
  getSkill: async (skill_id: string) => {
    const repsonse = await api.get(`/skills/${skill_id}`);
    return repsonse.data;
  },
  getUserSkill: async (user_id: string) => {
    const repsonse = await api.get(`/users/${user_id}/skills`);
    // console.log("User skills response:", repsonse.data);
    return repsonse.data;
  },
};
export default SkillServices;
