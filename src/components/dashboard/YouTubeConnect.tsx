'use client';

import { useState, useEffect } from 'react';
import { Youtube } from 'lucide-react';

interface YouTubeConnectionStatus {
    connected: boolean;
    isExpired?: boolean;
    expiresAt?: string;
    scope?: string;
}

export default function YouTubeConnect() {
    const [status, setStatus] = useState<YouTubeConnectionStatus>({ connected: false });
    const [loading, setLoading] = useState(true);
    const [connecting, setConnecting] = useState(false);

    // Check connection status on mount
    useEffect(() => {
        checkConnectionStatus();
    }, []);

    const checkConnectionStatus = async () => {
        try {
            setLoading(true);
            // TODO: Get actual user ID from auth context
            const userId = 'test-user-123';

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/youtube/oauth/status?userId=${userId}`
            );
            const data = await response.json();
            setStatus(data);
        } catch (error) {
            console.error('Failed to check YouTube connection status:', error);
        } finally {
            setLoading(false);
        }
    };

    const connectYouTube = async () => {
        try {
            setConnecting(true);
            // TODO: Get actual user ID from auth context
            const userId = 'test-user-123';

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/youtube/oauth/authorize?userId=${userId}`
            );
            const data = await response.json();

            if (data.success && data.authUrl) {
                // Open OAuth consent screen in popup
                const width = 600;
                const height = 700;
                const left = window.screen.width / 2 - width / 2;
                const top = window.screen.height / 2 - height / 2;

                const popup = window.open(
                    data.authUrl,
                    'YouTube OAuth',
                    `width=${width},height=${height},left=${left},top=${top}`
                );

                // Poll for popup closure
                const pollTimer = setInterval(() => {
                    if (popup && popup.closed) {
                        clearInterval(pollTimer);
                        // Recheck connection status after popup closes
                        setTimeout(() => {
                            checkConnectionStatus();
                            setConnecting(false);
                        }, 1000);
                    }
                }, 500);
            }
        } catch (error) {
            console.error('Failed to initiate YouTube connection:', error);
            setConnecting(false);
        }
    };

    const disconnectYouTube = async () => {
        try {
            // TODO: Get actual user ID from auth context
            const userId = 'test-user-123';

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/youtube/oauth/disconnect`,
                {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId })
                }
            );

            if (response.ok) {
                setStatus({ connected: false });
            }
        } catch (error) {
            console.error('Failed to disconnect YouTube:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-6">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${status.connected ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <Youtube className={`w-6 h-6 ${status.connected ? 'text-green-600' : 'text-gray-600'}`} />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">YouTube</h3>
                        <p className="text-sm text-gray-600">
                            {status.connected
                                ? 'Connected - Fetch comments from your YouTube videos'
                                : 'Connect your YouTube account to analyze video comments'}
                        </p>
                        {status.connected && status.expiresAt && (
                            <p className="text-xs text-gray-500 mt-1">
                                Token expires: {new Date(status.expiresAt).toLocaleDateString()}
                            </p>
                        )}
                    </div>
                </div>

                <div>
                    {status.connected ? (
                        <button
                            onClick={disconnectYouTube}
                            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                        >
                            Disconnect
                        </button>
                    ) : (
                        <button
                            onClick={connectYouTube}
                            disabled={connecting}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {connecting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Connecting...
                                </>
                            ) : (
                                <>
                                    <Youtube className="w-4 h-4" />
                                    Connect YouTube
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>

            {status.connected && status.isExpired && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                        ⚠️ Your YouTube token has expired. Please reconnect to continue fetching comments.
                    </p>
                </div>
            )}
        </div>
    );
}
