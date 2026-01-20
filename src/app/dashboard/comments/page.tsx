"use client";

import { useState, useEffect } from "react";
import { MessageSquare, ThumbsUp, ThumbsDown, Minus, RefreshCcw } from "lucide-react";

export default function CommentsPage() {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:3001/api/comments");
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            }
        } catch (err) {
            console.error("Failed to fetch comments", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
        // Poll every 10 seconds for "live" feel
        const interval = setInterval(fetchComments, 10000);
        return () => clearInterval(interval);
    }, []);

    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment) {
            case "positive": return <ThumbsUp className="h-4 w-4 text-green-400" />;
            case "negative": return <ThumbsDown className="h-4 w-4 text-red-400" />;
            default: return <Minus className="h-4 w-4 text-gray-400" />;
        }
    };

    const getSentimentColor = (sentiment: string) => {
        switch (sentiment) {
            case "positive": return "bg-green-500/10 text-green-400 border-green-500/20";
            case "negative": return "bg-red-500/10 text-red-400 border-red-500/20";
            default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Live Comments</h1>
                    <p className="text-muted-foreground">Real-time feed of incoming customer feedback.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm text-green-400 font-medium">Live Connection Active</span>
                    <button onClick={fetchComments} className="p-2 hover:bg-white/5 rounded-full transition-colors ml-2">
                        <RefreshCcw className={`h-4 w-4 text-muted-foreground ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                {loading && comments.length === 0 ? (
                    <div className="text-center p-8 text-muted-foreground">Connecting to live feed...</div>
                ) : comments.map((comment) => (
                    <div key={comment.id} className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group animate-in fade-in slide-in-from-bottom-2 duration-500">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex gap-4">
                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center text-sm font-bold">
                                    {comment.user.charAt(0)}
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-semibold text-white">{comment.user}</span>
                                        <span className="text-xs text-muted-foreground capitalize">• {comment.platform}</span>
                                        <span className="text-xs text-muted-foreground">• {comment.time}</span>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed text-sm">{comment.content}</p>
                                </div>
                            </div>
                            <div className={`px-3 py-1.5 rounded-full border flex items-center gap-2 text-xs font-medium ${getSentimentColor(comment.sentiment)}`}>
                                {getSentimentIcon(comment.sentiment)}
                                <span className="capitalize">{comment.sentiment}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
