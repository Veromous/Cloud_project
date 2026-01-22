"use client";

import { useState, useEffect } from "react";
import { User, Mail, Bell, Shield, Save, Eye, EyeOff } from "lucide-react";
import { authService } from "@/lib/auth";
import { updatePassword } from 'aws-amplify/auth';
import toast, { Toaster } from 'react-hot-toast';

export default function SettingsPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [passwordData, setPasswordData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [showPasswords, setShowPasswords] = useState({
        old: false,
        new: false,
        confirm: false
    });
    const [notifications, setNotifications] = useState({
        emailAlerts: true,
        weeklyReports: false,
        negativeAlerts: true,
    });

    useEffect(() => {
        const fetchUserData = async () => {
            const result = await authService.getCurrentUser();
            if (result.success) {
                setName(result.name || result.email?.split('@')[0] || "");
                setEmail(result.email || "");
            }
            setLoading(false);
        };
        fetchUserData();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSaving(false);
        toast.success("Settings saved successfully!");
    };

    const handlePasswordChange = async (e: React.FormEvent) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords don't match!");
            return;
        }

        if (passwordData.newPassword.length < 8) {
            toast.error("Password must be at least 8 characters!");
            return;
        }

        try {
            await updatePassword({
                oldPassword: passwordData.oldPassword,
                newPassword: passwordData.newPassword
            });

            toast.success("Password changed successfully!");
            setShowPasswordForm(false);
            setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error: any) {
            console.error("Password change error:", error);
            toast.error(error.message || "Failed to change password");
        }
    };

    if (loading) {
        return <div className="text-center p-12 text-muted-foreground">Loading settings...</div>;
    }

    return (
        <div className="space-y-6 max-w-3xl">
            <Toaster position="top-right" />
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Account Settings</h1>
                <p className="text-muted-foreground">Manage your account preferences and notifications.</p>
            </div>

            {/* Profile Section */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-blue-500/10">
                        <User className="h-5 w-5 text-blue-400" />
                    </div>
                    <h2 className="text-lg font-semibold">Profile Information</h2>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-gray-300 block mb-2">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-300 block mb-2">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="w-full bg-black/20 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-400 placeholder-gray-500 cursor-not-allowed"
                            />
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                    </div>
                </div>
            </div>

            {/* Notifications Section */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-violet-500/10">
                        <Bell className="h-5 w-5 text-violet-400" />
                    </div>
                    <h2 className="text-lg font-semibold">Notification Preferences</h2>
                </div>

                <div className="space-y-3">
                    <label className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                        <div>
                            <div className="font-medium text-sm">Email Alerts</div>
                            <div className="text-xs text-muted-foreground">Receive alerts for new comments</div>
                        </div>
                        <input
                            type="checkbox"
                            checked={notifications.emailAlerts}
                            onChange={(e) => setNotifications({ ...notifications, emailAlerts: e.target.checked })}
                            className="w-4 h-4 rounded border-white/10 bg-black/20 text-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                        <div>
                            <div className="font-medium text-sm">Weekly Reports</div>
                            <div className="text-xs text-muted-foreground">Get weekly sentiment summaries</div>
                        </div>
                        <input
                            type="checkbox"
                            checked={notifications.weeklyReports}
                            onChange={(e) => setNotifications({ ...notifications, weeklyReports: e.target.checked })}
                            className="w-4 h-4 rounded border-white/10 bg-black/20 text-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        />
                    </label>

                    <label className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-colors">
                        <div>
                            <div className="font-medium text-sm">Negative Sentiment Alerts</div>
                            <div className="text-xs text-muted-foreground">Instant alerts for negative feedback</div>
                        </div>
                        <input
                            type="checkbox"
                            checked={notifications.negativeAlerts}
                            onChange={(e) => setNotifications({ ...notifications, negativeAlerts: e.target.checked })}
                            className="w-4 h-4 rounded border-white/10 bg-black/20 text-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        />
                    </label>
                </div>
            </div>

            {/* Security Section */}
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-green-500/10">
                        <Shield className="h-5 w-5 text-green-400" />
                    </div>
                    <h2 className="text-lg font-semibold">Security</h2>
                </div>

                {!showPasswordForm ? (
                    <button
                        onClick={() => setShowPasswordForm(true)}
                        className="w-full text-left p-3 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
                    >
                        <div className="font-medium text-sm">Change Password</div>
                        <div className="text-xs text-muted-foreground">Update your password</div>
                    </button>
                ) : (
                    <form onSubmit={handlePasswordChange} className="space-y-4 border border-white/10 rounded-lg p-4">
                        <div>
                            <label className="text-sm font-medium text-gray-300 block mb-2">Current Password</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.old ? "text" : "password"}
                                    value={passwordData.oldPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
                                    required
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords({ ...showPasswords, old: !showPasswords.old })}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                                >
                                    {showPasswords.old ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-300 block mb-2">New Password</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.new ? "text" : "password"}
                                    value={passwordData.newPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                    required
                                    minLength={8}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                                >
                                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-gray-300 block mb-2">Confirm New Password</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.confirm ? "text" : "password"}
                                    value={passwordData.confirmPassword}
                                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                    required
                                    minLength={8}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-white"
                                >
                                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                type="submit"
                                className="flex-1 bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-lg font-medium transition-all"
                            >
                                Change Password
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setShowPasswordForm(false);
                                    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
                                }}
                                className="flex-1 bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg font-medium transition-all"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Save Button */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <Save className="h-4 w-4" />
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </div>
    );
}
