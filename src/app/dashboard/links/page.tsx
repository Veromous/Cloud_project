"use client";

import { useState, useEffect } from "react";
import { Plus, Facebook, Youtube, Video, Trash2, ExternalLink, Music2, RefreshCw } from "lucide-react";
import toast, { Toaster } from 'react-hot-toast';
import YouTubeConnect from "@/components/dashboard/YouTubeConnect";

export default function LinksPage() {
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState<string | null>(null);
    const [selectedLinks, setSelectedLinks] = useState<string[]>([]);

    // Fetch links from backend
    const fetchLinks = async () => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links`);
            if (res.ok) {
                const data = await res.json();
                setLinks(data);
            }
        } catch (err) {
            console.error("Failed to fetch links", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const handleAddLink = async () => {
        // Demo logic to add a TikTok link
        const newUrl = prompt("Enter social media URL:");
        if (!newUrl) return;

        let platform = "website";
        if (newUrl.includes("facebook")) platform = "facebook";
        else if (newUrl.includes("youtube")) platform = "youtube";
        else if (newUrl.includes("tiktok")) platform = "tiktok";

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ platform, url: newUrl })
            });

            if (res.ok) {
                fetchLinks(); // Refresh list
                toast.success("Link added successfully!");
            } else {
                const errorData = await res.json();
                toast.error(`Failed to add link: ${errorData.error || 'Unknown error'}`);
            }
        } catch (err: any) {
            console.error("Add link error:", err);
            toast.error(`Failed to add link: ${err.message}`);
        }
    };

    const handleDeleteLink = async (linkId: string) => {
        const deletePromise = new Promise(async (resolve, reject) => {
            try {
                console.log('Attempting to delete link:', linkId);
                console.log('API URL:', process.env.NEXT_PUBLIC_API_URL);

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/links/${linkId}`, {
                    method: "DELETE"
                });

                console.log('Delete response status:', res.status);
                console.log('Delete response ok:', res.ok);

                if (res.ok) {
                    const data = await res.json();
                    console.log('Delete response data:', data);
                    fetchLinks(); // Refresh list
                    resolve("Link deleted successfully!");
                } else {
                    const errorText = await res.text();
                    console.error('Delete failed with status:', res.status);
                    console.error('Error response:', errorText);
                    reject(new Error(`Failed to delete link: ${res.status} - ${errorText}`));
                }
            } catch (err) {
                console.error("Delete link error:", err);
                reject(err);
            }
        });

        toast.promise(deletePromise, {
            loading: 'Deleting link...',
            success: 'Link deleted successfully!',
            error: (err) => `Failed to delete: ${err.message}`,
        });
    };

    const handleSyncComments = async (link: any) => {
        if (link.platform !== "tiktok") {
            toast.error("Comment syncing is currently only available for TikTok links");
            return;
        }

        setSyncing(link.id);

        try {
            // Extract username from TikTok URL
            const usernameMatch = link.url.match(/@([a-zA-Z0-9_.]+)/);
            const username = usernameMatch ? usernameMatch[1] : null;

            if (!username) {
                toast.error("Could not extract username from TikTok URL");
                setSyncing(null);
                return;
            }

            const syncPromise = fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/tiktok/scrape`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username,
                    videoLimit: 5,
                    commentLimit: 20
                })
            }).then(async (res) => {
                if (res.ok) {
                    const data = await res.json();
                    return `Successfully synced ${data.count} comments from @${username}!`;
                } else {
                    const errorData = await res.json();
                    throw new Error(errorData.message || 'Unknown error');
                }
            });

            await toast.promise(syncPromise, {
                loading: `Syncing comments from @${username}...`,
                success: (msg) => msg,
                error: (err) => `Failed to sync: ${err.message}`,
            });
        } catch (err: any) {
            console.error("Sync comments error:", err);
        } finally {
            setSyncing(null);
        }
    };

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedLinks(links.map(link => link.id));
        } else {
            setSelectedLinks([]);
        }
    };

    const handleSelectOne = (linkId: string) => {
        setSelectedLinks(prev =>
            prev.includes(linkId)
                ? prev.filter(id => id !== linkId)
                : [...prev, linkId]
        );
    };

    const getIcon = (platform: string) => {
        switch (platform) {
            case "facebook": return <Facebook className="h-5 w-5 text-blue-500" />;
            case "youtube": return <Youtube className="h-5 w-5 text-red-500" />;
            case "tiktok": return <Music2 className="h-5 w-5 text-pink-500" />;
            default: return <ExternalLink className="h-5 w-5 text-gray-500" />;
        }
    };

    return (
        <div className="space-y-6">
            <Toaster position="top-right" />
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Social Media Links</h1>
                    <p className="text-muted-foreground">Manage the sources for your sentiment analysis.</p>
                </div>
                <div className="flex items-center gap-2">
                    {selectedLinks.length > 0 && (
                        <button
                            onClick={() => {
                                if (confirm(`Delete ${selectedLinks.length} selected links?`)) {
                                    Promise.all(selectedLinks.map(id => handleDeleteLink(id)))
                                        .then(() => setSelectedLinks([]));
                                }
                            }}
                            className="flex items-center gap-2 bg-red-600/10 hover:bg-red-600/20 text-red-500 border border-red-600/20 px-4 py-2 rounded-lg font-medium transition-colors"
                        >
                            <Trash2 className="h-4 w-4" />
                            Delete ({selectedLinks.length})
                        </button>
                    )}
                    <button
                        onClick={handleAddLink}
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
                    >
                        <Plus className="h-4 w-4" />
                        Add New Link
                    </button>
                </div>
            </div>

            {/* YouTube OAuth Connection */}
            <YouTubeConnect />

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-muted-foreground uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4 w-4">
                                    <input
                                        type="checkbox"
                                        className="rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500/20"
                                        checked={links.length > 0 && selectedLinks.length === links.length}
                                        onChange={handleSelectAll}
                                    />
                                </th>
                                <th className="px-6 py-4">Platform</th>
                                <th className="px-6 py-4">URL</th>
                                <th className="px-6 py-4">Date Added</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">Loading links...</td></tr>
                            ) : links.map((link) => (
                                <tr key={link.id} className={`hover:bg-white/5 transition-colors ${selectedLinks.includes(link.id) ? 'bg-white/5' : ''}`}>
                                    <td className="px-6 py-4">
                                        <input
                                            type="checkbox"
                                            className="rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500/20"
                                            checked={selectedLinks.includes(link.id)}
                                            onChange={() => handleSelectOne(link.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-white/5">
                                            {getIcon(link.platform)}
                                        </div>
                                        <span className="capitalize font-medium">{link.platform}</span>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
                                        {link.url}
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground">
                                        {link.date}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {link.platform === "tiktok" && (
                                                <button
                                                    onClick={() => handleSyncComments(link)}
                                                    disabled={syncing === link.id}
                                                    className="p-2 hover:bg-blue-500/10 hover:text-blue-400 rounded-lg transition-colors text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                                    title="Sync Comments"
                                                >
                                                    <RefreshCw className={`h-4 w-4 ${syncing === link.id ? 'animate-spin' : ''}`} />
                                                </button>
                                            )}
                                            <button
                                                onClick={() => handleDeleteLink(link.id)}
                                                className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors text-gray-500"
                                                title="Delete Link"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {!loading && links.length === 0 && (
                    <div className="p-12 text-center text-muted-foreground">
                        No links added yet. Click "Add New Link" to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
