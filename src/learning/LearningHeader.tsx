import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookOpen, ChevronLeft } from "lucide-react";

export default function LearningHeader() {
    return (
        <header className="border-b border-slate-700 bg-[#1e293b] px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-white"
                >
                    <ChevronLeft className="h-5 w-5" />
                </Button>
                <div className="flex items-center space-x-2">
                    <div className="bg-blue-600 text-white p-1 rounded">
                        <span className="text-xs">D</span>
                    </div>
                    <span className="text-sm font-medium">
                        dijkstra-learning.com/learning
                    </span>
                </div>
            </div>
            <div className="flex items-center space-x-2">
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white"
                >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Documentation
                </Button>
                <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                    <AvatarFallback>U</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}