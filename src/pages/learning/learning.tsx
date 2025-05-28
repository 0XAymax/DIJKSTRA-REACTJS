import LearningHeader from "./LearningHeader";
import LearningContent from "./LearningContent";
import LearningSideBar from "./LearningSideBar";
export default function LearningPage() {

  return (
    <div className="flex flex-col h-screen bg-white text-slate-900">
      {/* Top Navigation Bar */}
      <LearningHeader />
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Course Units */}
        <LearningSideBar />
        {/* Main Content */}
        <LearningContent />
      </div>
    </div>
  );
}


