export interface RegisterRequest {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}
export interface LoginRequest {
  email: string;
  password: string;
}
export interface PracticeProblems {
  id: string;
  type: string;
  question: string;
  data: string;
  unit_id: string;
}
export interface Lesson {
  id: string;
  title: string;
  content: string;
  unit_id: string;
}
export interface Unit {
  id: string;
  name: string;
  course_id: string;
  lesson: Lesson;
  practice_problems: PracticeProblems[];
}
export interface Progress {
  id: string;
  unit_id: string;
  user_id: string;
  completion_percentage: number;
  last_updated: Date;
}
export interface Course {
  id: string;
  name: string;
  description: string;
  units: Unit[];
}
export interface AIChatRequest {
  user_input: string;
}

export interface AIChatResponse {
  response: string;
}
export interface UpdateLessonRequest {
  title: string;
  content: string;
  unit_id: string;
}

export interface CreateLessonRequest {
  title: string;
  content: string;
  unit_id: string;
}

export interface UpdateUserUnitProgressRequest {
  completion_precentage: number;
  last_updated: string;
}

export interface CreateProblemRequest {
  type: string;
  question: string;
  data: string;
  unit_id: string;
}

export interface UpdateProblemRequest {
  type: string;
  question: string;
  data: string;
  unit_id: string;
}
export interface Completedlesson {
  id: string;
  user_id: string;
  lesson_id: string;
  completed_at: Date;
}
export interface CompletedProblem{
  id: string;
  user_id: string;
  problem_id: string;
  completed_at: Date;
}
export interface CompletionsResponse{
  user_id: string;
  lessons: Completedlesson[];
  practice_problems: CompletedProblem[];
}