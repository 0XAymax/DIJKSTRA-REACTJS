import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCourse } from "@/context/CourseContext";
import { ChevronRight, Lock } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LearningSideBar() {
  const { courses, unitsProgress } = useCourse();
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    0: true,
    2: true,
  });
  const Allunits = courses.flatMap((course) => course.units);
  const toggleUnit = (unitIndex: string) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitIndex]: !prev[unitIndex],
    }));
  };

  return (
    <div className="w-[280px] md:w-80 bg-slate-50 border-r border-purple-700 flex flex-col h-full">
      <div className="p-3 md:p-4 border-b border-purple-700">
        <h2 className="font-bold text-lg md:text-xl mb-1 text-slate-900">
          Dijkstra's Algorithm
        </h2>
        <p className="text-xs md:text-sm text-slate-600">
          Master the fundamentals of pathfinding
        </p>
      </div>
      <div className="flex-1 overflow-hidden pr-4">
        <ScrollArea className="h-full">
          {Allunits.map((unit, index) => {
            const currentProgress =
              unitsProgress.find((p) => p.unit_id === unit.id)
                ?.completion_percentage || 0;

            const prevUnit = Allunits[index - 1];
            const prevCompleted =
              !prevUnit ||
              (unitsProgress.find((p) => p.unit_id === prevUnit.id)
                ?.completion_percentage || 0) === 100;

            const isLocked = !prevCompleted;

            return (
              <div key={unit.id} className="mb-2">
                <div
                  className={`flex items-center p-2 ${
                    isLocked
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-slate-100 cursor-pointer"
                  } rounded-md`}
                  onClick={() => !isLocked && toggleUnit(unit.id)}
                >
                  {expandedUnits[unit.id] ? (
                    <ChevronDown className="h-4 w-4 mr-2 text-slate-500" />
                  ) : (
                    <ChevronRight className="h-4 w-4 mr-2 text-slate-500" />
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center">
                      <span className="font-medium text-slate-900 text-sm md:text-base truncate">
                        Unit: {unit.name}
                      </span>
                      {isLocked && (
                        <span className="ml-2 flex-shrink-0">
                          <Lock size={14} />
                        </span>
                      )}
                    </div>
                    <Progress
                      value={currentProgress}
                      className="h-1 mt-1 bg-slate-200"
                    />
                  </div>
                </div>

                {!isLocked && expandedUnits[unit.id] && (
                  <div className="ml-6 border-l pl-2 mt-1 border-purple-700">
                    <Link to={`/learning/${unit.lesson.id}`}>
                      <div className="flex items-center">
                        <span className="text-xs md:text-sm text-slate-700 truncate">
                          {unit.lesson.title}
                        </span>
                      </div>
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </ScrollArea>
      </div>
    </div>
  );
}
function ChevronDown(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
