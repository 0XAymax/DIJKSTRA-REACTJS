import api from "./config";

export interface AIChatRequest {
  user_input: string;
}

export interface AIChatResponse {
  response: string;
}

const AIService = {
  sendMessage: async (
    userInput: string,
    context?: string
  ): Promise<AIChatResponse> => {
    try {
      // console.log("Sending message to AI:", userInput)
      const response = await api.post("/api/ai-chat", {
        user_input: userInput,
        additional_context: context,
      });

      // console.log("AI Response received:", response.data)

      if (response.data.response) {
        // console.log("Found response.response:", response.data.response)
        return { response: response.data.response };
      } else if (response.data.message) {
        // console.log("Found response.message:", response.data.message)
        return { response: response.data.message };
      } else if (response.data.answer) {
        // console.log("Found response.answer:", response.data.answer)
        return { response: response.data.answer };
      } else if (response.data.text) {
        // console.log("Found response.text:", response.data.text)
        return { response: response.data.text };
      } else if (typeof response.data === "string") {
        // console.log("Response is a string:", response.data)
        return { response: response.data };
      } else {
        // console.log("Unknown response structure, using first property")
        const firstKey = Object.keys(response.data)[0];
        // console.log("First key:", firstKey, "Value:", response.data[firstKey])
        return {
          response:
            response.data[firstKey] || "Réponse reçue mais format inconnu",
        };
      }
    } catch (error) {
      console.error("AI Service Error:", error);
      throw error;
    }
  },
  getPromptsLogs: async (user_id: string) => {
    const repsonse = await api.get(`/users/${user_id}/prompt_logs`);
    return repsonse.data;
  },
};

export default AIService;
