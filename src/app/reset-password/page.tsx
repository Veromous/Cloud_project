"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Lock, Key, Eye, EyeOff, CheckCircle } from "lucide-react";
import { confirmResetPassword } from "aws-amplify/auth";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

function ResetPasswordContent() {
    const [code, setCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validate passwords match
        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        // Validate password strength
        if (newPassword.length < 8) {
            setError("Password must be at least 8 characters");
            setLoading(false);
            return;
        }

        try {
            await confirmResetPassword({
                username: email,
                confirmationCode: code,
                newPassword: newPassword,
            });

            setSuccess(true);

            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err: any) {
            console.error("Reset password error:", err);
            setError(err.message || "Failed to reset password. Please check your code.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative bg-black font-sans">
            <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full top-1/4 left-1/4 w-[400px] h-[400px]" />

            <div className="relative z-10 w-full max-w-md p-6">
                <Link href="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Login
                </Link>

                <div className="flex flex-col gap-2.5 bg-white p-7.5 w-[450px] rounded-2xl">
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-2xl font-bold text-black">
                            Reset Password
                        </h1>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                            Enter the code sent to <span className="font-medium">{email}</span>
                        </p>
                    </div>

                    {success ? (
                        <div className="text-center space-y-4">
                            <div className="p-3 bg-green-500/10 rounded-full mx-auto w-fit mb-4">
                                <CheckCircle className="h-8 w-8 text-green-500" />
                            </div>
                            <div className="text-sm text-green-600 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                                Password reset successfully! Redirecting to login...
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex flex-col">
                                    <label className="text-gray-900 font-semibold">Verification Code</label>
                                </div>

                                <div className="relative">
                                    <Key className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                    <input
                                        id="code"
                                        type="text"
                                        required
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="Enter 6-digit code"
                                        maxLength={6}
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-10 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-col">
                                    <label className="text-gray-900 font-semibold">New Password</label>
                                </div>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                    <input
                                        id="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Min. 8 characters"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-10 py-2.5 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500">
                                    Must contain uppercase, lowercase, and numbers
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-col">
                                    <label className="text-gray-900 font-semibold">Confirm Password</label>
                                </div>

                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Re-enter password"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-10 py-2.5 pr-10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4" />
                                        ) : (
                                            <Eye className="h-4 w-4" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            {error && (
                                <div className="text-sm text-red-600 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gray-900 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    )}

                    <div className="text-center text-black text-sm mt-4">
                        Remember your password?{" "}
                        <Link href="/login" className="text-blue-500 hover:text-blue-600 transition-colors font-medium">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-white">Loading...</div>
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
