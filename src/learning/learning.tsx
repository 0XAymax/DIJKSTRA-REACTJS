import { useState } from "react";
import {
  ChevronRight,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import LearningHeader from "./LearningHeader";
import LearningContent from "./LearningContent";

export default function LearningPage() {
  const [selectedUnit, setSelectedUnit] = useState<number | null>(2);
  const [expandedUnits, setExpandedUnits] = useState<Record<number, boolean>>({
    0: true,
    2: true,
  });

  const toggleUnit = (unitIndex: number) => {
    setExpandedUnits((prev) => ({
      ...prev,
      [unitIndex]: !prev[unitIndex],
    }));
  };

  const selectUnit = (unitIndex: number) => {
    setSelectedUnit(unitIndex);
  };

  const units = [
    {
      id: 0,
      title: "Graph Fundamentals: Nodes, Edges, and Traversal",
      description:
        "Learn the basic concepts of graph theory essential for understanding Dijkstra's algorithm.",
      lessons: [
        "Introduction to Graph Theory",
        "Representing Graphs in Code",
        "Basic Graph Traversal Techniques",
        "Weighted Graphs and Their Applications",
      ],
      progress: 100,
      unlocked: true,
    },
    {
      id: 1,
      title: "The Shortest Path Problem: Scope and Applications",
      description:
        "Understand the problem that Dijkstra's algorithm solves and its real-world applications.",
      lessons: [
        "Defining the Shortest Path Problem",
        "Real-world Applications",
        "Problem Constraints and Edge Cases",
        "Comparing Pathfinding Approaches",
      ],
      progress: 75,
      unlocked: true,
    },
    {
      id: 2,
      title: "Algorithm Design: Greedy Strategy and Core Principles",
      description:
        "Explore the greedy approach and the core principles behind Dijkstra's algorithm.",
      lessons: [
        "Greedy Algorithms: Concept and Examples",
        "Dijkstra's Core Principles",
        "Optimality and Correctness Proof",
        "Algorithm Limitations",
      ],
      progress: 30,
      unlocked: true,
    },
    {
      id: 3,
      title: "Data Structures for Efficient Pathfinding",
      description:
        "Learn about the data structures that make Dijkstra's algorithm efficient.",
      lessons: [
        "Priority Queues and Heaps",
        "Adjacency Lists vs. Matrices",
        "Optimizing Data Structures",
        "Memory Considerations",
      ],
      progress: 0,
      unlocked: true,
    },
    {
      id: 4,
      title: "Algorithm Execution: From Initialization to Completion",
      description:
        "Walk through the complete execution of Dijkstra's algorithm step by step.",
      lessons: [
        "Initialization Phase",
        "Main Loop Execution",
        "Path Reconstruction",
        "Termination Conditions",
      ],
      progress: 0,
      unlocked: false,
    },
    {
      id: 5,
      title: "Applied Problem Solving: Case Studies and Debugging",
      description:
        "Apply Dijkstra's algorithm to solve real problems and learn debugging techniques.",
      lessons: [
        "Network Routing Case Study",
        "GPS Navigation Systems",
        "Common Implementation Errors",
        "Performance Optimization",
      ],
      progress: 0,
      unlocked: false,
    },
    {
      id: 6,
      title: "Mastery Project: Complex Networks and Algorithm Variations",
      description:
        "Master Dijkstra's algorithm through a comprehensive project and explore variations.",
      lessons: [
        "Building a City Navigation System",
        "Handling Dynamic Graph Changes",
        "A* and Bidirectional Dijkstra",
        "Final Assessment and Certification",
      ],
      progress: 0,
      unlocked: false,
    },
  ];

  return (
    <div className="flex flex-col h-screen bg-[#0f172a] text-white">
      {/* Top Navigation Bar */}
      <LearningHeader />
      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Course Units */}
        <div className="w-80 bg-[#1e293b] border-r border-slate-700 flex flex-col">
          <div className="p-4 border-b border-slate-700">
            <h2 className="font-bold text-xl mb-1">Dijkstra's Algorithm</h2>
            <p className="text-sm text-slate-300">
              Master the fundamentals of pathfinding
            </p>
          </div>
          {/* Fix: Ensure ScrollArea takes the available height and scrolls properly */}
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-2">
                {units.map((unit) => (
                  <div key={unit.id} className="mb-2">
                    <div
                      className={`flex items-center p-2 hover:bg-slate-700 rounded-md cursor-pointer ${
                        !unit.unlocked ? "opacity-60" : ""
                      } ${selectedUnit === unit.id ? "bg-slate-700/50" : ""}`}
                      onClick={() => unit.unlocked && toggleUnit(unit.id)}
                    >
                      {expandedUnits[unit.id] ? (
                        <ChevronDown className="h-4 w-4 mr-2 text-slate-400" />
                      ) : (
                        <ChevronRight className="h-4 w-4 mr-2 text-slate-400" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center">
                          <span className="font-medium">
                            Unit {unit.id}: {unit.title}
                          </span>
                          {!unit.unlocked && (
                            <Lock className="h-3 w-3 ml-2 text-slate-400" />
                          )}
                        </div>
                        <Progress
                          value={unit.progress}
                          className="h-1 mt-1 bg-slate-700"
                        />
                      </div>
                    </div>
                    {expandedUnits[unit.id] && unit.unlocked && (
                      <div className="ml-6 border-l pl-2 mt-1 border-slate-700">
                        {unit.lessons.map((lesson, index) => (
                          <div
                            key={index}
                            className={`flex items-center justify-between p-2 hover:bg-slate-700 rounded-md cursor-pointer ${
                              selectedUnit === unit.id && index === 0
                                ? "bg-slate-700"
                                : ""
                            }`}
                            onClick={() => selectUnit(unit.id)}
                          >
                            <div className="flex items-center">
                              <span className="text-sm">{lesson}</span>
                            </div>
                            {unit.progress >
                              (index / unit.lessons.length) * 100 && (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
          <div className="p-4 border-t border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium">Overall Progress</div>
                <div className="text-xs text-slate-400">
                  3 of 7 units started
                </div>
              </div>
              <Badge variant="outline" className="bg-blue-900/30">
                34%
              </Badge>
            </div>
            <Progress value={34} className="mt-2 bg-slate-700" />
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
