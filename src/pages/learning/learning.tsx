import LearningHeader from "./LearningHeader";
import LearningSideBar from "./LearningSideBar";
import { Outlet } from "react-router-dom";
import GraphoAssistant from "./llm";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function LearningPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-white text-slate-900">
      {/* Top Navigation Bar */}
      <LearningHeader onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Course Units */}
        <div className={`
          fixed md:static inset-0 z-40 transform transition-transform duration-200 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <div className="absolute md:relative inset-0 bg-black bg-opacity-50 md:bg-transparent md:hidden"
            onClick={() => setIsSidebarOpen(false)} />
          <div className="absolute md:relative h-full">
            <LearningSideBar />
          </div>
        </div>
        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-white relative">
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
          <GraphoAssistant />
        </div>
      </div>
    </div>
  );
}


