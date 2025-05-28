import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, ChevronLeft, Play } from "lucide-react";
import GraphoAssistant from "./llm";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function LearningContent() {
    const [selectedUnit, setSelectedUnit] = useState<number | null>(2);

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
        <div className="flex-1 flex overflow-hidden bg-white">
            {selectedUnit !== null ? (
                <div className="flex-1 flex flex-col overflow-hidden">
                    <Tabs
                        defaultValue="overview"
                        className="flex-1 flex flex-col overflow-hidden"
                    >
                        <div className="border-b border-purple-700">
                            <TabsList className="bg-transparent border-b-0 p-0">
                                <TabsTrigger
                                    value="overview"
                                    className="relative px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors data-[state=active]:text-purple-700 data-[state=active]:font-medium data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-purple-700"
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="lessons"
                                    className="relative px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors data-[state=active]:text-purple-700 data-[state=active]:font-medium data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-purple-700"
                                >
                                    Lessons
                                </TabsTrigger>
                                <TabsTrigger
                                    value="exercises"
                                    className="relative px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors data-[state=active]:text-purple-700 data-[state=active]:font-medium data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-purple-700"
                                >
                                    Exercises
                                </TabsTrigger>
                                <TabsTrigger
                                    value="quiz"
                                    className="relative px-6 py-3 text-slate-600 hover:text-slate-900 transition-colors data-[state=active]:text-purple-700 data-[state=active]:font-medium data-[state=active]:after:absolute data-[state=active]:after:bottom-0 data-[state=active]:after:left-0 data-[state=active]:after:right-0 data-[state=active]:after:h-0.5 data-[state=active]:after:bg-purple-700"
                                >
                                    Quiz
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="flex-1 overflow-hidden">
                            <TabsContent
                                value="overview"
                                className="h-full m-0 p-0 data-[state=active]:flex data-[state=active]:flex-col"
                            >
                                <ScrollArea className="flex-1">
                                    <div className="p-8 max-w-4xl mx-auto">
                                        <h1 className="text-3xl font-bold mb-2 text-slate-900">
                                            Unit {selectedUnit}: {units[selectedUnit].title}
                                        </h1>
                                        <p className="text-lg text-slate-600 mb-6">
                                            {units[selectedUnit].description}
                                        </p>

                                        <div className="bg-slate-50 rounded-lg p-6 mb-8 border border-slate-200">
                                            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                                <div className="mb-4 md:mb-0">
                                                    <h2 className="text-lg font-bold text-slate-900">
                                                        Prefer to watch and learn?
                                                    </h2>
                                                    <p className="text-sm text-slate-600">
                                                        I can turn this into a video for you!
                                                    </p>
                                                </div>
                                                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                                    <Play className="h-4 w-4 mr-2" />
                                                    View video
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="prose max-w-none">
                                            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900">
                                                What You'll Learn
                                            </h2>
                                            <ul className="space-y-2">
                                                {units[selectedUnit].lessons.map(
                                                    (lesson, index) => (
                                                        <li key={index} className="flex items-start">
                                                            <span className="inline-block bg-blue-600 rounded-full w-6 h-6 flex items-center justify-center text-xs text-white mr-3 mt-0.5">
                                                                {index + 1}
                                                            </span>
                                                            <span className="text-slate-700">{lesson}</span>
                                                        </li>
                                                    )
                                                )}
                                            </ul>

                                            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900">
                                                Prerequisites
                                            </h2>
                                            <p className="text-slate-700">
                                                Before starting this unit, you should have a basic
                                                understanding of:
                                            </p>
                                            <ul className="space-y-1 text-slate-700">
                                                <li>Basic programming concepts</li>
                                                {selectedUnit > 0 && (
                                                    <li>Content from Unit {selectedUnit - 1}</li>
                                                )}
                                                {selectedUnit > 1 && (
                                                    <li>Graph representation in code</li>
                                                )}
                                                {selectedUnit > 2 && (
                                                    <li>Greedy algorithm principles</li>
                                                )}
                                            </ul>

                                            <h2 className="text-2xl font-bold mt-8 mb-4 text-slate-900">
                                                Unit Overview
                                            </h2>
                                            <p className="text-slate-700">
                                                {selectedUnit === 0 &&
                                                    "This unit introduces the fundamental concepts of graph theory that form the foundation for understanding Dijkstra's algorithm. You'll learn about nodes, edges, and basic traversal techniques."}
                                                {selectedUnit === 1 &&
                                                    "This unit explores the shortest path problem that Dijkstra's algorithm was designed to solve. You'll understand the scope of the problem and its various real-world applications."}
                                                {selectedUnit === 2 &&
                                                    "This unit dives into the design principles behind Dijkstra's algorithm, focusing on its greedy approach and the core principles that make it work efficiently."}
                                                {selectedUnit === 3 &&
                                                    "This unit covers the essential data structures that make Dijkstra's algorithm efficient, including priority queues, heaps, and different graph representations."}
                                                {selectedUnit === 4 &&
                                                    "This unit walks you through the complete execution of Dijkstra's algorithm, from initialization to completion, with detailed explanations of each step."}
                                                {selectedUnit === 5 &&
                                                    "This unit applies Dijkstra's algorithm to real-world problems through case studies and teaches debugging techniques for common implementation issues."}
                                                {selectedUnit === 6 &&
                                                    "This final unit challenges you with a comprehensive project to demonstrate mastery of Dijkstra's algorithm and introduces variations like A* and bidirectional search."}
                                            </p>
                                        </div>

                                        <div className="mt-8 flex justify-between">
                                            <Button
                                                variant="outline"
                                                className="border-slate-300 text-slate-700 hover:bg-slate-50"
                                                disabled={selectedUnit === 0}
                                            >
                                                <ChevronLeft className="h-4 w-4 mr-2" />
                                                Previous Unit
                                            </Button>
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                                Start Learning
                                                <ArrowRight className="h-4 w-4 ml-2" />
                                            </Button>
                                        </div>
                                    </div>
                                </ScrollArea>
                            </TabsContent>

                            <TabsContent
                                value="lessons"
                                className="h-full m-0 p-0 data-[state=active]:flex data-[state=active]:flex-col"
                            >
                                <ScrollArea className="flex-1">
                                    <div className="p-8 max-w-4xl mx-auto">
                                        <h1 className="text-3xl font-bold mb-6 text-slate-900">Lessons</h1>

                                        <div className="space-y-6">
                                            {units[selectedUnit].lessons.map((lesson, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200"
                                                >
                                                    <div className="p-6">
                                                        <div className="flex items-center justify-between mb-4">
                                                            <h2 className="text-xl font-bold text-slate-900">
                                                                {index + 1}. {lesson}
                                                            </h2>
                                                            {units[selectedUnit].progress >
                                                                (index / units[selectedUnit].lessons.length) *
                                                                100 ? (
                                                                <Badge className="bg-green-600 text-white">
                                                                    Completed
                                                                </Badge>
                                                            ) : (
                                                                <Badge variant="outline" className="border-slate-300 text-slate-700">Not Started</Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-slate-600 mb-4">
                                                            Learn about {lesson.toLowerCase()} and how it
                                                            relates to Dijkstra's algorithm.
                                                        </p>
                                                        <div className="flex items-center text-sm text-slate-500">
                                                            <span>Estimated time: 15-20 min</span>
                                                            <span className="mx-2">•</span>
                                                            <span>
                                                                Includes: Video, Text, Interactive Examples
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-white border-t border-slate-200 p-4 flex justify-between items-center">
                                                        <div className="flex items-center">
                                                            <Play className="h-4 w-4 mr-2 text-blue-600" />
                                                            <span className="text-sm text-blue-600">
                                                                Watch Introduction
                                                            </span>
                                                        </div>
                                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                                            {units[selectedUnit].progress >
                                                                (index / units[selectedUnit].lessons.length) *
                                                                100
                                                                ? "Review Lesson"
                                                                : "Start Lesson"}
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </ScrollArea>
                            </TabsContent>

                            <TabsContent
                                value="exercises"
                                className="h-full m-0 p-0 data-[state=active]:flex data-[state=active]:flex-col"
                            >
                                <ScrollArea className="flex-1">
                                    <div className="p-8 max-w-4xl mx-auto">
                                        <h1 className="text-3xl font-bold mb-6 text-slate-900">
                                            Practical Exercises
                                        </h1>
                                        <p className="text-lg text-slate-600 mb-8">
                                            Apply what you've learned in Unit {selectedUnit} with
                                            these hands-on exercises.
                                        </p>

                                        <div className="space-y-6">
                                            <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                                                <div className="p-6">
                                                    <h2 className="text-xl font-bold mb-2 text-slate-900">
                                                        Exercise 1: Implementation Challenge
                                                    </h2>
                                                    <p className="text-slate-600 mb-4">
                                                        Implement the core functionality discussed in
                                                        this unit and test it with provided examples.
                                                    </p>
                                                    <Badge className="bg-yellow-600 text-white">
                                                        Intermediate
                                                    </Badge>
                                                </div>
                                                <div className="bg-white border-t border-slate-200 p-4 flex justify-end">
                                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                                        Start Exercise
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                                                <div className="p-6">
                                                    <h2 className="text-xl font-bold mb-2 text-slate-900">
                                                        Exercise 2: Debugging Challenge
                                                    </h2>
                                                    <p className="text-slate-600 mb-4">
                                                        Find and fix bugs in a provided implementation
                                                        related to this unit's concepts.
                                                    </p>
                                                    <Badge className="bg-red-600 text-white">Advanced</Badge>
                                                </div>
                                                <div className="bg-white border-t border-slate-200 p-4 flex justify-end">
                                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                                        Start Exercise
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200">
                                                <div className="p-6">
                                                    <h2 className="text-xl font-bold mb-2 text-slate-900">
                                                        Exercise 3: Visualization Task
                                                    </h2>
                                                    <p className="text-slate-600 mb-4">
                                                        Create a visual representation of the concepts
                                                        learned in this unit.
                                                    </p>
                                                    <Badge className="bg-green-600 text-white">Beginner</Badge>
                                                </div>
                                                <div className="bg-white border-t border-slate-200 p-4 flex justify-end">
                                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                                                        Start Exercise
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ScrollArea>
                            </TabsContent>

                            <TabsContent
                                value="quiz"
                                className="h-full m-0 p-0 data-[state=active]:flex data-[state=active]:flex-col"
                            >
                                <ScrollArea className="flex-1">
                                    <div className="p-8 max-w-4xl mx-auto">
                                        <h1 className="text-3xl font-bold mb-6 text-slate-900">
                                            Knowledge Check
                                        </h1>
                                        <p className="text-lg text-slate-600 mb-8">
                                            Test your understanding of Unit {selectedUnit} with
                                            this quiz.
                                        </p>

                                        <div className="bg-slate-50 rounded-lg p-6 mb-6 border border-slate-200">
                                            <div className="flex justify-between items-center mb-4">
                                                <h2 className="text-xl font-bold text-slate-900">
                                                    Unit {selectedUnit} Quiz
                                                </h2>
                                                <div className="flex items-center">
                                                    <span className="text-sm text-slate-600 mr-2">
                                                        10 questions
                                                    </span>
                                                    <span className="text-sm text-slate-600">•</span>
                                                    <span className="text-sm text-slate-600 ml-2">
                                                        15 minutes
                                                    </span>
                                                </div>
                                            </div>
                                            <p className="text-slate-600 mb-6">
                                                This quiz covers all the key concepts from Unit{" "}
                                                {selectedUnit}. You need to score at least 70% to
                                                pass.
                                            </p>
                                            <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full">
                                                Start Quiz
                                            </Button>
                                        </div>

                                        <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                                            <h2 className="text-xl font-bold mb-4 text-slate-900">Quiz Rules</h2>
                                            <ul className="space-y-2 text-slate-600">
                                                <li>You have 15 minutes to complete the quiz</li>
                                                <li>You can retake the quiz up to 3 times</li>
                                                <li>
                                                    Questions will be randomized from a larger pool
                                                </li>
                                                <li>You need 70% or higher to pass</li>
                                                <li>Passing the quiz unlocks the next unit</li>
                                            </ul>
                                        </div>
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                        </div>
                    </Tabs>
                </div>
            ) : (
                <div className="flex-1 overflow-auto">
                    <div className="p-8 max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold mb-6 text-slate-900">
                            Welcome to Dijkstra's Algorithm Course
                        </h1>

                        <div className="bg-slate-50 rounded-lg p-6 mb-8 border border-slate-200">
                            <div className="flex items-start">
                                <Avatar className="h-12 w-12 mr-4">
                                    <AvatarImage
                                        src="/placeholder.svg?height=48&width=48"
                                        alt="Grapho"
                                    />
                                    <AvatarFallback className="bg-blue-600 text-white">G</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-semibold mb-1 text-slate-900">
                                        Grapho{" "}
                                        <span className="text-slate-500 text-xs">Just now</span>
                                    </p>
                                    <p className="text-sm text-slate-600">
                                        👋 Welcome to the Dijkstra's Algorithm learning path!
                                        I'm Grapho, your AI learning assistant. This course will
                                        take you from the basics of graph theory all the way to
                                        mastering Dijkstra's algorithm and its variations.
                                        Select a unit from the sidebar to begin your journey!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-4 text-slate-900">Course Overview</h2>
                        <p className="text-lg text-slate-600 mb-6">
                            This comprehensive course on Dijkstra's algorithm is
                            structured into 7 units, each building upon the previous one:
                        </p>

                        <div className="space-y-6 mb-8">
                            {units.map((unit) => (
                                <div key={unit.id} className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                                    <div className="flex items-start">
                                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-4 mt-1">
                                            {unit.id}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2 text-slate-900">
                                                {unit.title}
                                            </h3>
                                            <p className="text-slate-600 mb-3">
                                                {unit.description}
                                            </p>
                                            <div className="flex items-center">
                                                <Progress
                                                    value={unit.progress}
                                                    className="w-32 h-2 mr-3 bg-slate-200"
                                                />
                                                <span className="text-sm text-slate-500">
                                                    {unit.progress}% complete
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-bold mb-1 text-slate-900">Your Progress</h3>
                                <p className="text-sm text-slate-500">
                                    Continue where you left off
                                </p>
                            </div>
                            <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white"
                                onClick={() => selectUnit(2)}
                            >
                                Continue Unit 2
                                <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Right Sidebar - AI Assistant */}
            <GraphoAssistant />
        </div>
    );
}