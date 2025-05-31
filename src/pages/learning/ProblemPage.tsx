import { useCourse } from "@/context/CourseContext";
import { Link, useSearchParams } from "react-router-dom";
import "@/markdown.css";
import { Button } from "@/components/ui/button";
import PracticeProblem from "./PracticeProblem";

export default function ProblemPage() {
  const [searchParams] = useSearchParams();
  const lessonId = searchParams.get("lessonId");
  const index = parseInt(searchParams.get("index") || "0", 10);
  const { courses } = useCourse();
  const problems = courses
    .flatMap((course) => course.units)
    .filter((unit) => unit.lesson?.id === lessonId)
    .flatMap((unit) => unit.practice_problems || []);
  const currentProblem = problems[index];
  const nextProblem = problems[index + 1];
  const prevProblem = problems[index - 1];

 
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="max-w-3xl w-full">
          <h1 className="text-3xl font-bold mb-6">Practice Problem</h1>
          <PracticeProblem problem={currentProblem} />
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-between items-center">
          {prevProblem ? (
            <Link
              to={`/learning/problem/${
                prevProblem.id
              }?lessonId=${lessonId}&index=${index - 1}`}
            >
              <Button variant="secondary" className="cursor-pointer">
                ← Back
              </Button>
            </Link>
          ) : (
            <div></div>
          )}

          {nextProblem ? (
            <Link
              to={`/learning/problem/${
                nextProblem.id
              }?lessonId=${lessonId}&index=${index + 1}`}
            >
              <Button className="bg-purple-700 hover:bg-purple-600 cursor-pointer">
                Next Problem →
              </Button>
            </Link>
          ) : (
            <Link to={`/learning/${lessonId}`}>
                <Button
                  className="bg-green-600 hover:bg-green-500 cursor-pointer"
                >
                  Finish
                </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
