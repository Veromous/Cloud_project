"use client";

import { useEffect, useState } from "react";
import { BarChart3, MessageSquare, TrendingUp, Users } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, Tooltip } from "recharts";

export default function DashboardPage() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        fetch(`${apiUrl}/api/dashboard/stats`)
            .then(res => res.json())
            .then(setStats)
            .catch(err => console.error("Failed to fetch dashboard stats", err));
    }, []);

    if (!stats) return <div className="text-center p-12 text-muted-foreground">Loading dashboard...</div>;

    const statCards = [
        { label: "Total Comments", value: stats.totalComments.toLocaleString(), change: "+12.5%", icon: MessageSquare, color: "text-blue-400", bg: "bg-blue-500/10" },
        { label: "Overall Sentiment", value: stats.sentiment, change: "+4.3%", icon: TrendingUp, color: "text-green-400", bg: "bg-green-500/10" },
        { label: "Active Channels", value: stats.activeChannels, change: "Same", icon: BarChart3, color: "text-violet-400", bg: "bg-violet-500/10" },
        { label: "Analyzed Today", value: stats.analyzedToday.toLocaleString(), change: "+24%", icon: Users, color: "text-orange-400", bg: "bg-orange-500/10" },
    ];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-colors">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-2.5 rounded-lg ${stat.bg}`}>
                                    <Icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                                    {stat.change}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-2xl font-bold text-white tracking-tight">{stat.value}</h3>
                                <p className="text-sm text-muted-foreground">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Section Placeholder */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-2 p-6 rounded-2xl bg-white/5 border border-white/10 min-h-[400px]">
                    <h3 className="text-lg font-medium mb-4">Sentiment Trend</h3>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.trends}>
                                <Bar dataKey="sentiment" fill="#8884d8" radius={[4, 4, 0, 0]} />
                                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: "#1f2937", border: "none" }} itemStyle={{ color: "#fff" }} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 min-h-[400px]">
                    <h3 className="text-lg font-medium mb-4">Platform Distribution</h3>
                    <div className="flex items-center justify-center h-[300px] text-muted-foreground bg-black/20 rounded-xl">
                        {/* Simplified list for distribution in overview */}
                        <div className="w-full px-6 space-y-4">
                            {stats.platformDistribution.map((p: any) => (
                                <div key={p.name} className="flex items-center justify-between text-sm">
                                    <span className="text-gray-300">{p.name}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">{p.value}</span>
                                        <div className="w-16 h-2 bg-white/10 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500" style={{ width: `${(p.value / 1000) * 100}%` }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
