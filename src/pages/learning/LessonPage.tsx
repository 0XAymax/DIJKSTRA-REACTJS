import { useCourse } from "@/context/CourseContext";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "@/markdown.css";
import { Button } from "@/components/ui/button";
import NotFound from "./notFound";
export default function LessonPage() {
  const { lessonId } = useParams();
  const { courses } = useCourse();
  const lesson = courses
    .flatMap((course) => course.units)
    .map((unit) => unit.lesson)
    .find((lesson) => lesson.id === lessonId);

  if (!lesson) {
    return <NotFound />;
  }

  const problems = courses
    .flatMap((course) => course.units)
    .filter((unit) => unit.lesson?.id === lessonId)
    .flatMap((unit) => unit.practice_problems || []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 max-w-3xl mx-auto px-4 py-8">
        <div className="markdown">
          <ReactMarkdown>{lesson?.content || ""}</ReactMarkdown>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="max-w-3xl mx-auto px-4 py-4 flex justify-end">
          <Link
            to={`/learning/problem/${problems[0]?.id}?lessonId=${lessonId}&index=0`}
          >
            <Button className="bg-purple-700 hover:bg-purple-600 cursor-pointer">
              Start Practice →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
