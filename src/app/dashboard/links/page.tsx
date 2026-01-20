"use client";

import { useState, useEffect } from "react";
import { Plus, Facebook, Youtube, Video, Trash2, ExternalLink, Music2 } from "lucide-react";

export default function LinksPage() {
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch links from backend
    const fetchLinks = async () => {
        try {
            const res = await fetch("http://localhost:3001/api/links");
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
            const res = await fetch("http://localhost:3001/api/links", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ platform, url: newUrl })
            });
            if (res.ok) {
                fetchLinks(); // Refresh list
            }
        } catch (err) {
            alert("Failed to add link");
        }
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
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Social Media Links</h1>
                    <p className="text-muted-foreground">Manage the sources for your sentiment analysis.</p>
                </div>
                <button
                    onClick={handleAddLink}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-blue-500/20"
                >
                    <Plus className="h-4 w-4" />
                    Add New Link
                </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-white/5 text-muted-foreground uppercase text-xs font-semibold">
                            <tr>
                                <th className="px-6 py-4">Platform</th>
                                <th className="px-6 py-4">URL</th>
                                <th className="px-6 py-4">Date Added</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {loading ? (
                                <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Loading specific links...</td></tr>
                            ) : links.map((link) => (
                                <tr key={link.id} className="hover:bg-white/5 transition-colors">
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
                                        <button className="p-2 hover:bg-red-500/10 hover:text-red-400 rounded-lg transition-colors text-gray-500">
                                            <Trash2 className="h-4 w-4" />
                                        </button>
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
