import type { PracticeProblems } from "@/types";
import "@/markdown.css";
import "@/components/ui/mcq.css";
import MCQComponent from "./MCQ";

function PracticeProblem({ problem }: { problem: PracticeProblems }) {
  const parsedData = JSON.parse(problem?.data || "{}");
  const choices = parsedData.choices || [];
  const answer = parsedData.answer || 0;
  const question = problem?.question || "";
 

  return (
        <MCQComponent question={question} choices={choices} correctIndex={answer} />
  );
}

export default PracticeProblem;
