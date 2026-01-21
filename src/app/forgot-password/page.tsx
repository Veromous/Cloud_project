"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";
import { resetPassword } from "aws-amplify/auth";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await resetPassword({ username: email });
            setSuccess(true);

            // Redirect to reset password page after 2 seconds
            setTimeout(() => {
                router.push(`/reset-password?email=${encodeURIComponent(email)}`);
            }, 2000);
        } catch (err: any) {
            console.error("Forgot password error:", err);
            setError(err.message || "Failed to send reset code. Please try again.");
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
                            Forgot Password?
                        </h1>
                        <p className="text-sm text-gray-600 mt-2 text-center">
                            No worries! Enter your email and we'll send you a reset code.
                        </p>
                    </div>

                    {success ? (
                        <div className="text-center space-y-4">
                            <div className="p-3 bg-green-500/10 rounded-full mx-auto w-fit mb-4">
                                <CheckCircle className="h-8 w-8 text-green-500" />
                            </div>
                            <div className="text-sm text-green-600 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                                Reset code sent! Check your email and redirecting...
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <div className="flex flex-col">
                                    <label className="text-gray-900 font-semibold">Email Address</label>
                                </div>

                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-10 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                    />
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
                                {loading ? "Sending..." : "Send Reset Code"}
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
