import api from "./config"

export interface AIChatRequest {
  user_input: string
}

export interface AIChatResponse {
  response: string
  // Ajoutez d'autres propriétés selon votre API
}

const AIService = {
  sendMessage: async (userInput: string): Promise<AIChatResponse> => {
    try {
      console.log("Sending message to AI:", userInput)
      const response = await api.post("/api/ai-chat", {
        user_input: userInput,
      })

      // 🔍 DEBUG: Afficher la structure complète de la réponse
      console.log("AI Response received:", response.data)
      console.log("Full response structure:", JSON.stringify(response.data, null, 2))

      // 🔍 Vérifier différentes structures possibles
      if (response.data.response) {
        console.log("Found response.response:", response.data.response)
        return { response: response.data.response }
      } else if (response.data.message) {
        console.log("Found response.message:", response.data.message)
        return { response: response.data.message }
      } else if (response.data.answer) {
        console.log("Found response.answer:", response.data.answer)
        return { response: response.data.answer }
      } else if (response.data.text) {
        console.log("Found response.text:", response.data.text)
        return { response: response.data.text }
      } else if (typeof response.data === "string") {
        console.log("Response is a string:", response.data)
        return { response: response.data }
      } else {
        console.log("Unknown response structure, using first property")
        const firstKey = Object.keys(response.data)[0]
        console.log("First key:", firstKey, "Value:", response.data[firstKey])
        return { response: response.data[firstKey] || "Réponse reçue mais format inconnu" }
      }
    } catch (error) {
      console.error("AI Service Error:", error)
      throw error
    }
  },
}

export default AIService