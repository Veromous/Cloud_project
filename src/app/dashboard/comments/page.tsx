"use client";

import { useState, useEffect, useMemo } from "react";
import { MessageSquare, ThumbsUp, ThumbsDown, Minus, RefreshCcw, Filter, ChevronLeft, ChevronRight } from "lucide-react";

export default function CommentsPage() {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Filter states
    const [platformFilter, setPlatformFilter] = useState<string>("all");
    const [sentimentFilter, setSentimentFilter] = useState<string>("all");

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const fetchComments = async () => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tiktok/comments`);
            if (res.ok) {
                const data = await res.json();
                setComments(data);
            } else {
                console.error("Failed to fetch comments");
                setComments([]);
            }
        } catch (err) {
            console.error("Failed to fetch comments", err);
            setComments([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchComments();
        const interval = setInterval(fetchComments, 30000);
        return () => clearInterval(interval);
    }, []);

    // Filter and paginate comments
    const filteredComments = useMemo(() => {
        let filtered = comments;

        if (platformFilter !== "all") {
            filtered = filtered.filter(c => (c.platform || 'tiktok') === platformFilter);
        }

        if (sentimentFilter !== "all") {
            filtered = filtered.filter(c => c.sentiment === sentimentFilter);
        }

        return filtered;
    }, [comments, platformFilter, sentimentFilter]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredComments.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedComments = filteredComments.slice(startIndex, endIndex);

    // Reset to page 1 when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [platformFilter, sentimentFilter, itemsPerPage]);

    const getSentimentIcon = (sentiment: string) => {
        switch (sentiment) {
            case "positive": return <ThumbsUp className="h-4 w-4 text-green-400" />;
            case "negative": return <ThumbsDown className="h-4 w-4 text-red-400" />;
            default: return <Minus className="h-4 w-4 text-gray-400" />;
        }
    };

    const getSentimentBadge = (sentiment: string) => {
        switch (sentiment) {
            case "positive":
                return <span className="px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-medium flex items-center gap-1 w-fit">
                    <ThumbsUp className="h-3 w-3" />
                    Positive
                </span>;
            case "negative":
                return <span className="px-2 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-medium flex items-center gap-1 w-fit">
                    <ThumbsDown className="h-3 w-3" />
                    Negative
                </span>;
            default:
                return <span className="px-2 py-1 rounded-full bg-gray-500/10 text-gray-400 border border-gray-500/20 text-xs font-medium flex items-center gap-1 w-fit">
                    <Minus className="h-3 w-3" />
                    Neutral
                </span>;
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Live Data</h1>
                    <p className="text-muted-foreground">Real-time feed of incoming customer feedback.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm text-green-400 font-medium">Live</span>
                    <button onClick={fetchComments} className="p-2 hover:bg-white/5 rounded-lg transition-colors ml-2">
                        <RefreshCcw className={`h-4 w-4 text-muted-foreground ${loading ? 'animate-spin' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl">
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filters:</span>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground">Platform:</label>
                    <select
                        value={platformFilter}
                        onChange={(e) => setPlatformFilter(e.target.value)}
                        className="bg-black border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                        <option value="all">All</option>
                        <option value="youtube">YouTube</option>
                        <option value="facebook">Facebook</option>
                        <option value="tiktok">TikTok</option>
                        <option value="x">X</option>
                        <option value="instagram">Instagram</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-sm text-muted-foreground">Sentiment:</label>
                    <select
                        value={sentimentFilter}
                        onChange={(e) => setSentimentFilter(e.target.value)}
                        className="bg-black border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                        <option value="all">All Sentiments</option>
                        <option value="positive">Positive</option>
                        <option value="neutral">Neutral</option>
                        <option value="negative">Negative</option>
                    </select>
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <label className="text-sm text-muted-foreground">Show:</label>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                        className="bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                    </select>
                    <span className="text-sm text-muted-foreground">per page</span>
                </div>
            </div>

            {/* Table */}
            {loading && comments.length === 0 ? (
                <div className="text-center p-8 text-muted-foreground">Loading comments...</div>
            ) : filteredComments.length === 0 ? (
                <div className="text-center p-12 bg-white/5 border border-white/10 rounded-xl">
                    <MessageSquare className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                        {comments.length === 0 ? "No Comments Yet" : "No Matching Comments"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                        {comments.length === 0
                            ? "Add a TikTok link and click the sync button to fetch comments"
                            : "Try adjusting your filters to see more results"
                        }
                    </p>
                    {comments.length === 0 && (
                        <a
                            href="/dashboard/links"
                            className="inline-block bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            Go to Social Links
                        </a>
                    )}
                </div>
            ) : (
                <>
                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-white/5 border-b border-white/10">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Comment
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Date/Time
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Platform
                                        </th>
                                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                            Sentiment
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {paginatedComments.map((comment, index) => (
                                        <tr key={comment.id} className="hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-4 text-sm text-gray-400 font-mono">
                                                #{startIndex + index + 1}
                                            </td>
                                            <td className="px-4 py-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-linear-to-br from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold shrink-0">
                                                        {comment.user.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="min-w-0">
                                                        <div className="font-medium text-white text-sm mb-1">
                                                            {comment.user}
                                                        </div>
                                                        <p className="text-gray-300 text-sm leading-relaxed wrap-break-word">
                                                            {comment.content}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-300 whitespace-nowrap">
                                                <div>{new Date(comment.timestamp).toLocaleDateString()}</div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(comment.timestamp).toLocaleTimeString()}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                <span className="px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-medium capitalize">
                                                    {comment.platform || 'tiktok'}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-sm">
                                                {getSentimentBadge(comment.sentiment)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                        <div className="text-sm text-muted-foreground">
                            Showing <span className="font-medium text-white">{startIndex + 1}</span> to{' '}
                            <span className="font-medium text-white">{Math.min(endIndex, filteredComments.length)}</span> of{' '}
                            <span className="font-medium text-white">{filteredComments.length}</span> results
                        </div>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                disabled={currentPage === 1}
                                className="p-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>

                            <div className="flex items-center gap-1">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                                    // Show first page, last page, current page, and pages around current
                                    if (
                                        page === 1 ||
                                        page === totalPages ||
                                        (page >= currentPage - 1 && page <= currentPage + 1)
                                    ) {
                                        return (
                                            <button
                                                key={page}
                                                onClick={() => setCurrentPage(page)}
                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                                    ? 'bg-blue-600 text-white'
                                                    : 'border border-white/10 hover:bg-white/5'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    } else if (page === currentPage - 2 || page === currentPage + 2) {
                                        return <span key={page} className="px-2 text-muted-foreground">...</span>;
                                    }
                                    return null;
                                })}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                                disabled={currentPage === totalPages}
                                className="p-2 rounded-lg border border-white/10 hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
