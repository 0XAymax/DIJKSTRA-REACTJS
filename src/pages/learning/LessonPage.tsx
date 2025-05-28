import { useCourse } from "@/context/CourseContext";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import '@/markdown.css'
export default function LessonPage() {
    const { lessonId } = useParams();
    console.log("lessonId", lessonId);
    const { courses } = useCourse();
    const lesson = courses.flatMap(course => course.units)
                          .map(unit => unit.lesson)
                          .find(lesson => lesson.id === lessonId);
    console.log("lesson", lesson);
    return (
        <div>
            <div className="markdown-body">
                <ReactMarkdown>{lesson?.content}</ReactMarkdown>
            </div>
        </div>
    );
}
