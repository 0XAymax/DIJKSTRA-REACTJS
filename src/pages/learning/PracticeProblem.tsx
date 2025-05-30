import type { PracticeProblems } from "@/types";
import "@/markdown.css";
import MCQComponent from "./MCQ";
import NotFound from "./notFound";
import InteractiveGraph from "./InteractiveGraph";

function PracticeProblem({ problem }: { problem: PracticeProblems }) {
  if (!problem) {
    return <NotFound />
  }
  const parsedData = JSON.parse(problem?.data || "{}");
  const choices = parsedData.choices || [];
  const answer = parsedData.answer || 0;
  const question = problem?.question || "";
  const Problemtype = problem?.type;

  return (
    <>
      {Problemtype === "multiple_choice" && (
        <MCQComponent question={question} choices={choices} correctIndex={answer} />
      )}
      {Problemtype === "interactive_graph" && <InteractiveGraph />}
    </>
  );

}

export default PracticeProblem;
