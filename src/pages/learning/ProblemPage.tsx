import { useCourse } from "@/context/CourseContext";
import { Link, useSearchParams } from "react-router-dom";
import "@/markdown.css";
import { Button } from "@/components/ui/button";
import PracticeProblem from "./PracticeProblem";
import { useState } from "react";

export default function ProblemPage() {
  const [isComplete, setIsComplete] = useState(false);
  const [searchParams] = useSearchParams();
  // This is pretty bad, but it works for now
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

  const current_order = courses
    .flatMap((course) => course.units)
    .find((unit) => unit.lesson?.id === lessonId)?.order;

  const next_unit = courses
    .flatMap((course) => course.units)
    .find((unit) => unit.order === current_order + 1);

  const nextLessonId = next_unit?.lesson?.id;

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 flex justify-center px-4 py-8">
        <div className="max-w-3xl w-full">
          <h1 className="text-3xl font-bold mb-6">Practice Problem</h1>
          <PracticeProblem
            problem={currentProblem}
            setIsComplete={setIsComplete}
          />
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="px-4 py-4 flex justify-between items-center">
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
            isComplete ? (
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
              ""
            )
          ) : isComplete ? (
            <Link
              to={nextLessonId ? `/learning/${nextLessonId}` : "/dashboard"}
            >
              <Button className="bg-green-600 hover:bg-green-500 cursor-pointer">
                Finish
              </Button>
            </Link>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
