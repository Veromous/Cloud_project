"use client";

import { User, Bell, Shield, LogOut } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
                    <p className="text-muted-foreground">Manage your account and preferences.</p>
                </div>
            </div>

            <div className="grid gap-6">
                {/* Profile Section */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                            <User className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Profile Information</h3>
                            <p className="text-sm text-muted-foreground">Update your personal details.</p>
                        </div>
                    </div>
                    <form className="space-y-4 max-w-xl">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">First Name</label>
                                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white" defaultValue="John" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Last Name</label>
                                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white" defaultValue="Doe" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Email Address</label>
                            <input type="email" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm text-white" defaultValue="john@example.com" />
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                            Save Changes
                        </button>
                    </form>
                </div>

                {/* Notifications */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-2 bg-violet-500/10 rounded-lg">
                            <Bell className="h-6 w-6 text-violet-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Notifications</h3>
                            <p className="text-sm text-muted-foreground">Configure how you receive alerts.</p>
                        </div>
                    </div>
                    <div className="space-y-4 max-w-xl">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Email Alerts</span>
                            <div className="w-11 h-6 bg-blue-600 rounded-full cursor-pointer relative">
                                <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">Weekly Reports</span>
                            <div className="w-11 h-6 bg-white/10 rounded-full cursor-pointer relative">
                                <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
