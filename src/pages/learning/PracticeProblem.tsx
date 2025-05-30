import type { PracticeProblems } from "@/types";

function PracticeProblem({ problem }: { problem: PracticeProblems }) {
    const rawData = problem?.data;
    const { choices, answer } = JSON.parse(rawData);
    
    return (
        <div>PracticeProblem</div>
    );
}

export default PracticeProblem