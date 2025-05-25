// Types d'authentification existants
export interface RegisterRequest {
  firstname: string
  lastname: string
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

// Nouveaux types pour l'IA
export interface AIChatRequest {
  user_input: string
}

export interface AIChatResponse {
  response: string
  // Ajoutez d'autres propriétés selon votre API backend
}
