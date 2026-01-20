"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Key, Mail, Lock } from "lucide-react";
import { authService } from "@/lib/auth";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const result = await authService.login({ email, password });

            if (result.success) {
                // Redirect to dashboard on successful login
                router.push("/dashboard");
            } else {
                setError(result.error || "Login failed. Please check your credentials.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="min-h-screen flex items-center justify-center relative bg-black font-sans">

            <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full top-1/4 left-1/4 w-[400px] h-[400px]" />

            <div className="relative z-10 w-full max-w-md p-6">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                <div className="flex flex-col gap-2.5 bg-white p-7.5 w-[450px] rounded-2xl">
                {/* <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl"> */}
                    <div className="flex flex-col items-center mb-8">
                        <div className="p-3 bg-blue-500/10 rounded-full mb-4">
                            <Key className="h-6 w-6 text-blue-400" />
                        </div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-muted-foreground mt-2">
                            Sign in to your Sentilyze account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                             <div className="flex flex-col">
                                 <label className="text-gray-900 font-semibold">Email</label>
                             </div>

                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
                                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" className="w-full bg-black/20 border border-white/10 rounded-lg px-10 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"/>
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
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-10 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Signing In..." : "Sign In"}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/register" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    );
}
