import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

interface LearningHeaderProps {
    onMenuClick: () => void;
}

export default function LearningHeader({ onMenuClick }: LearningHeaderProps) {
    const { currentUser } = useAuth();
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase();
    };
    return (
        <header className="border-b border-purple-700 bg-white px-4 py-2 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-1 hover:bg-slate-100 rounded-md"
                >
                    <Menu className="h-6 w-6 text-slate-700" />
                </button>
                <Link to="/dashboard">
                    <Logo width={140} height={140} className="filter contrast-150 brightness-70 " />
                </Link>
            </div>
            <div className="flex items-center space-x-2">
                <span className="hidden text-sm text-slate-600 md:block">{currentUser?.email}</span>
                <Avatar className="h-7 w-7 border border-purple-700">
                    <AvatarFallback className="bg-purple-50 text-purple-700 text-sm">{getInitials(currentUser?.name || '')}</AvatarFallback>
                </Avatar>
            </div>
        </header>
    );
}