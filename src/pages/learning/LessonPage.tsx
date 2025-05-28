import { useCourse } from "@/context/CourseContext";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import '@/markdown.css'
import { Button } from "@/components/ui/button";
export default function LessonPage() {
    const { lessonId } = useParams();
    const { courses } = useCourse();
    const lesson = courses.flatMap(course => course.units)
        .map(unit => unit.lesson)
        .find(lesson => lesson.id === lessonId);
    const problems = courses.flatMap(course => course.units)
        .filter(unit => unit.lesson?.id === lessonId)
        .flatMap(unit => unit.practice_problems || []);

    return (
        <div>
            <div className="markdown">
                <ReactMarkdown>{lesson?.content || ''}</ReactMarkdown>
            </div>
            <Link to={`/learning/problem/${problems[0]?.id}?lessonId=${lessonId}&index=0`} >
                <Button>
                    NEXT
                </Button>
            </Link>
        </div>
    );
}
