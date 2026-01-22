import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function Header() {
    return (
        <header className="bg-white px-7 lg:px-20 h-16 flex items-center sticky top-0 z-50 border-b border-white/5">
            <Link className="flex items-center justify-center gap-2" href="#">
                <BarChart3 className="h-6 w-6 text-blue-500" />
                <span className="font-bold text-xl tracking-tight bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                    Sentilyze
                </span>
            </Link>
            <nav className="ml-auto flex justify-center items-center gap-4 sm:gap-6">
                <Link className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="#features">
                    Features
                </Link>
                <Link className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors" href="/login">
                    Login
                </Link>
                <Link className="text-sm font-medium text-white hover:text-blue-600 transition-colors rounded-md bg-black px-7 py-3" href="/register">
                    Register
                </Link>
            </nav>
        </header>
    );
}
