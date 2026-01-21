"use client";

import { useState, useEffect } from "react";
import { Download, Calendar } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function AnalyticsPage() {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`)
            .then(res => res.json())
            .then(setData)
            .catch(err => console.error("Failed to fetch analytics", err));
    }, []);

    if (!data) return <div className="p-12 text-center text-muted-foreground">Loading analytics...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Analytics & Reports</h1>
                    <p className="text-muted-foreground">Deep dive into sentiment trends and performance.</p>
                </div>
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                        <Calendar className="h-4 w-4 text-gray-400" />
                        Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-500/20">
                        <Download className="h-4 w-4" />
                        Export Report
                    </button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 min-h-[350px]">
                    <h3 className="text-lg font-medium mb-4">Sentiment Over Time</h3>
                    <div className="w-full h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.trends}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                                    itemStyle={{ color: "#fff" }}
                                />
                                <Line type="monotone" dataKey="sentiment" stroke="#8b5cf6" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 min-h-[350px]">
                    <h3 className="text-lg font-medium mb-4">Sentiment by Platform</h3>
                    <div className="w-full h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.platformDistribution}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                                <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: "#1f2937", border: "none" }}
                                    itemStyle={{ color: "#fff" }}
                                    cursor={{ fill: "transparent" }}
                                />
                                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-lg font-medium mb-4">Top Keywords</h3>
                <div className="flex flex-wrap gap-2">
                    {["price", "quality", "shipping", "customer service", "fast", "broken", "amazing", "recommend"].map((word, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 cursor-default">
                            #{word}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
