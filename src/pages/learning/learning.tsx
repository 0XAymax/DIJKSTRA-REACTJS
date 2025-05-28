import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import LearningHeader from "./LearningHeader";
import LearningContent from "./LearningContent";
import { useCourse } from "@/context/CourseContext";
export default function LearningPage() {
  const { courses, unitsProgress } = useCourse();
  const [selectedUnit, setSelectedUnit] = useState<string | null>();
  const [expandedUnits, setExpandedUnits] = useState<Record<string, boolean>>({
    0: true,
    2: true,
  });
  const Allunits = courses.flatMap((course) => course.units);
  console.log("Allunits", Allunits);
  const toggleUnit = (unitIndex: string) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitIndex]: !prev[unitIndex],
    }));
  };

  const selectUnit = (unitIndex: string) => {
    setSelectedUnit(unitIndex);
  };

  return (
    <div className="flex flex-col h-screen bg-white text-slate-900">
      {/* Top Navigation Bar */}
      <LearningHeader />
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Course Units */}
        <div className="w-80 bg-slate-50 border-r border-purple-700 flex flex-col">
          <div className="p-4 border-b border-purple-700">
            <h2 className="font-bold text-xl mb-1 text-slate-900">
              Dijkstra's Algorithm
            </h2>
            <p className="text-sm text-slate-600">
              Master the fundamentals of pathfinding
            </p>
          </div>
          {/* Fix: Ensure ScrollArea takes the available height and scrolls properly */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-2">
                {Allunits.map((unit) => (
                  <div key={unit.id} className="mb-2">
                    <div
                      className={`flex items-center p-2 hover:bg-slate-100 rounded-md cursor-pointer ${
                        !unit.unlocked ? "opacity-60" : ""
                      } ${selectedUnit === unit.id ? "bg-slate-100" : ""}`}
                      onClick={() => toggleUnit(unit.id)}
                    >
                      {expandedUnits[unit.id] ? (
                        <ChevronDown className="h-4 w-4 mr-2 text-slate-500" />
                      ) : (
                        <ChevronRight className="h-4 w-4 mr-2 text-slate-500" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-medium text-slate-900">
                            Unit : {unit.name}
                          </span>
                        </div>
                        <Progress
                          value={unitsProgress.find(p => p.unit_id === unit.id)?.completion_percentage || 0}
                          className="h-1 mt-1 bg-slate-200"
                        />
                      </div>
                    </div>
                    {expandedUnits[unit.id] && (
                      <div className="ml-6 border-l pl-2 mt-1 border-purple-700">
                        <div className="flex items-center">
                          <span className="text-sm text-slate-700">
                            {unit.lesson.title}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="p-4 border-t border-purple-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-900">
                  Overall Progress
                </div>
                <div className="text-xs text-slate-500">
                  3 of 7 units started
                </div>
              </div>
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-purple-700"
              >
                34%
              </Badge>
            </div>
            <Progress value={34} className="mt-2 bg-slate-200" />
          </div>
        </div>
        <LearningContent />
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
