"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Link as LinkIcon, BarChart3, Settings, LogOut, MessageSquare, User } from "lucide-react";
import { clsx } from "clsx";
import { authService } from "@/lib/auth";
import { useEffect, useState } from "react";

const sidebarItems = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/links", label: "Social Links", icon: LinkIcon },
    { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
    { href: "/dashboard/comments", label: "Live Data", icon: MessageSquare },
    { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<{ name?: string; email?: string }>({});

    useEffect(() => {
        const fetchUserData = async () => {
            const result = await authService.getCurrentUser();
            if (result.success) {
                setUserInfo({
                    name: result.name || result.email?.split('@')[0],
                    email: result.email
                });
            }
        };
        fetchUserData();
    }, []);

    const handleSignOut = async () => {
        try {
            await authService.logout();
            router.push("/");
        } catch (error) {
            console.error("Sign out error:", error);
            alert("Failed to sign out. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex bg-black/95 text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/10 bg-white/5 backdrop-blur-xl flex flex-col h-screen sticky top-0">
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <BarChart3 className="h-6 w-6 text-blue-500" />
                        <span className="bg-linear-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                            Sentilyze
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1">
                    {sidebarItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group relative overflow-hidden",
                                    isActive
                                        ? "text-white bg-linear-to-r from-blue-500/20 to-violet-500/20 border border-white/10"
                                        : "text-muted-foreground hover:text-white hover:bg-white/5"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r-full" />
                                )}
                                <Icon className={clsx("h-5 w-5", isActive ? "text-blue-400" : "text-gray-500 group-hover:text-gray-300")} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="h-5 w-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-10">
                    <h2 className="text-lg font-medium text-white">
                        {sidebarItems.find(i => i.href === pathname)?.label || "Dashboard"}
                    </h2>
                    <div className="flex items-center gap-3">
                        <div className="text-right">
                            <div className="text-sm font-medium text-white">{userInfo.name || 'User'}</div>
                            <div className="text-xs text-muted-foreground">{userInfo.email || ''}</div>
                        </div>
                        <div className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold">
                            {(userInfo.name || userInfo.email || 'U')[0].toUpperCase()}
                        </div>
                    </div>
                </header>
                <div className="p-8 pb-20">
                    {children}
                </div>
            </main>
        </div>
    );
}
