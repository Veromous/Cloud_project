"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, Mail, Lock } from "lucide-react";
import { authService } from "@/lib/auth";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await authService.register({ email, password });

            if (result.success) {
                setSuccess(true);
                // Redirect to verification page with email
                setTimeout(() => {
                    router.push(`/verify-email?email=${encodeURIComponent(email)}`);
                }, 1500);
            } else {
                setError(result.error || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Registration error:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            <div className="absolute inset-0 bg-violet-500/5 blur-[100px] rounded-full bottom-1/4 right-1/4 w-[400px] h-[400px]" />

            <div className="relative z-10 w-full max-w-md p-6">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="p-3 bg-violet-500/10 rounded-full mb-4">
                            <UserPlus className="h-6 w-6 text-violet-400" />
                        </div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Create Account
                        </h1>
                        <p className="text-sm text-muted-foreground mt-2">
                            Start analyzing sentiment today
                        </p>
                    </div>

                    {success ? (
                        <div className="text-center space-y-4">
                            <div className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                                Account created! Check your email for verification code...
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300" htmlFor="email">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-10 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300" htmlFor="password">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                    <input
                                        id="password"
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min. 8 characters"
                                        className="w-full bg-black/20 border border-white/10 rounded-lg px-10 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all"
                                    />
                                </div>
                                <p className="text-xs text-gray-500">
                                    Must contain uppercase, lowercase, and numbers
                                </p>
                            </div>

                            {error && (
                                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-violet-600 hover:bg-violet-500 text-white font-medium py-2.5 rounded-lg shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating Account..." : "Sign Up Free"}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-violet-400 hover:text-violet-300 transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
