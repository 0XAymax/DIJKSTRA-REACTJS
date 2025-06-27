import type { PracticeProblems } from "@/types";
import "@/markdown.css";
import MCQComponent from "./MCQ";
import NotFound from "./notFound";
import InteractiveGraph from "./InteractiveGraph";
import ProblemServices from "@/api/problem.service";
import { useAuth } from "@/context/AuthContext";
import LessonServices from "@/api/lesson.service";
import { useCourse } from "@/context/CourseContext";

function PracticeProblem({
  problem,
  setIsComplete,
}: {
  problem: PracticeProblems;
  setIsComplete?: any;
}) {
  const { currentUser } = useAuth();
  const { fetchProgress } = useCourse();

  if (!problem) {
    return <NotFound />;
  }
  const parsedData = JSON.parse(problem?.data || "{}");
  const choices = parsedData.choices || [];
  const answer = parsedData.answer || 0;
  const question = problem?.question || "";
  const Problemtype = problem?.type;
  const problemId = problem.id;

  const isProblemCompleted = async () => {
    if (!currentUser) {
      console.error("User not authenticated");
      return;
    }
    try {
      const response = await LessonServices.getUserCompletions(currentUser.id);
      if (response) {
        if (
          response.practice_problems.some(
            (completion) => completion.problem_id === problemId
          )
        ) {
          setIsComplete(true);
          return true;
        }
      }
    } catch (error) {
      console.error("Error checking problem completion:", error);
      return false;
    }
  };

  const handleProblemComplete = async () => {
    if (!currentUser) {
      console.error("User not authenticated");
      return;
    }
    try {
      // console.log(
        "USER ID IN COMPLETE PROBLEM RQUEST:",
        currentUser.id,
        "PROBLEM ID:",
        problemId
      );
      const response = await ProblemServices.CompleteProblem(
        currentUser.id,
        problemId
      );
      if (response.status === 200) {
        // console.log("Problem completed successfully");
      }
      // console.log("Response from complete problem:", response);
    } catch (error) {
      console.error("Error completing problem:", error);
    }
    setIsComplete(true);
    await fetchProgress(currentUser.id);
  };

  return (
    <>
      {Problemtype === "multiple_choice" && (
        <MCQComponent
          key={problemId}
          question={question}
          choices={choices}
          correctIndex={answer}
          problemId={problemId}
          isProblemCompleted={isProblemCompleted}
          handleProblemComplete={handleProblemComplete}
        />
      )}
      {Problemtype === "interactive_graph" && (
        <InteractiveGraph
          key={problemId}
          problemData={parsedData}
          question={question}
          problemId={problemId}
          isProblemCompleted={isProblemCompleted}
          handleProblemComplete={handleProblemComplete}
        />
      )}
    </>
  );
}

export default PracticeProblem;
