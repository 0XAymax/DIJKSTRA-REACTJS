import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";

export default function LearningHeader() {
    const { currentUser } = useAuth();
    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase();
    };
    return (
        <header className="border-b border-purple-700 bg-white px-4 py-1.5 flex items-center justify-between">
            <div className="flex items-center space-x-3">
                <Link to="/dashboard">
                    <Logo width={140} height={140} className="filter contrast-150 brightness-70" />
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