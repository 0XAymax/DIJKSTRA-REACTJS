import { useCourse } from "@/context/CourseContext";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import "@/markdown.css";
import { Button } from "@/components/ui/button";
import NotFound from "./notFound";
import { useAuth } from "@/context/AuthContext";
import LessonServices from "@/api/lesson.service";
export default function LessonPage() {
  const { currentUser } = useAuth();
  const { lessonId } = useParams();
  const { courses, fetchProgress } = useCourse();
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
  const isLessonCompleted = async () => {
    if (!currentUser) {
      console.error("User not authenticated");
      return;
    }
    try {
      const response = await LessonServices.getUserCompletions(currentUser.id);
      if (response) {
        return response.lessons.some(
          (completion) => completion.lesson_id === lessonId
        );
      }
    } catch (error) {
      console.error("Error checking lesson completion:", error);
      return false;
    }
  };

  const handleCompleteLesson = async () => {
    if (!currentUser) {
      console.error("User not authenticated");
      return;
    }
    if (!lessonId) {
      console.error("Lesson ID is not provided");
      return;
    }
    const completed = await isLessonCompleted();
    if (!completed) {
      try {
        const response = await LessonServices.CompleteLesson(
          currentUser.id,
          lessonId
        );
        if (response.status === 200) {
          console.log("Lesson completed successfully");
        }
      } catch (error) {
        console.error("Error completing lesson:", error);
      }
    }
    await fetchProgress(currentUser.id);
  };
  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 max-w-6xl mx-auto px-4 py-8">
        <div className="markdown">
          <ReactMarkdown>{lesson?.content || ""}</ReactMarkdown>
        </div>
      </div>

      <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="px-4 py-4 flex justify-end">
          <Link
            to={`/learning/problem/${problems[0]?.id}?lessonId=${lessonId}&index=0`}
          >
            <Button
              className="bg-purple-700 hover:bg-purple-600 cursor-pointer"
              onClick={handleCompleteLesson}
            >
              Start Practice →
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
