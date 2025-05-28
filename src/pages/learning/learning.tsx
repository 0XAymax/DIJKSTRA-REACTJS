import LearningHeader from "./LearningHeader";
import LearningSideBar from "./LearningSideBar";
import { Outlet } from "react-router-dom";
import GraphoAssistant from "./llm";
export default function LearningPage() {

  return (
    <div className="flex flex-col h-screen bg-white text-slate-900">
      {/* Top Navigation Bar */}
      <LearningHeader />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Course Units */}
        <LearningSideBar />
        {/* Main Content */}
        <div className="flex-1 flex bg-white">
          <Outlet />
          <GraphoAssistant />
        </div>
      </div>
    </div>
  );
}


