import { useCourse } from "@/context/CourseContext";
import { Link, useSearchParams } from "react-router-dom";
import "@/markdown.css"
import { Button } from "@/components/ui/button";

export default function ProblemPage() {
    const [searchParams] = useSearchParams();
    const lessonId = searchParams.get("lessonId");
    const index = parseInt(searchParams.get("index") || "0", 10);
    const { courses } = useCourse();
    const problems = courses.flatMap(course => course.units).filter(unit => unit.lesson?.id === lessonId).flatMap(unit => unit.practice_problems || []);
    const currentProblem = problems[index];
    const nextProblem = problems[index + 1];
    const prevProblem = problems[index - 1];
    const rawData = currentProblem?.data;
    const { choices, answer } = JSON.parse(rawData);
    return (
        <div>
            <h1>Practice Problem</h1>
            <h2>{currentProblem?.question}</h2>
            <ul className="mcq">
                {choices.map((choice: string, index: number) => (
                    <li key={index} className={index === answer ? "correct" : ""}>
                        {choice}
                    </li>
                ))}
            </ul>


            <div className="flex gap-2 mt-4">
                {prevProblem && (
                    <Link to={`/learning/problem/${prevProblem.id}?lessonId=${lessonId}&index=${index - 1}`}>
                        <Button variant="secondary">Back</Button>
                    </Link>
                )}
                {nextProblem ? (
                    <Link to={`/learning/problem/${nextProblem.id}?lessonId=${lessonId}&index=${index + 1}`}>
                        <Button>NEXT</Button>
                    </Link>
                ) : (
                    <Link to={`/learning/${lessonId}`}>
                        <Button>Finish</Button>
                    </Link>
                )}
            </div>
        </div>
    )
}