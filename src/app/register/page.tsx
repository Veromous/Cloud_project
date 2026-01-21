"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, UserPlus, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { authService } from "@/lib/auth";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Validate passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        // Validate password strength
        if (password.length < 8) {
            setError("Password must be at least 8 characters");
            setLoading(false);
            return;
        }

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
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">

            <div className="absolute inset-0 bg-white blur-[100px] rounded-full bottom-1/4 right-1/4 w-[300px] h-[300px]" />

            <div className="relative z-10 w-full max-w-md p-6">
                <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Home
                </Link>

                <div className="bg-white w-[450px] border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
                    <div className="flex flex-col items-center mb-8">
                        <h1 className="text-2xl font-bold text-black">
                            Create Account
                        </h1>
                        <p className="text-xl text-muted-foreground mt-2 text-black">
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
                                <div className="flex flex-col">
                                    <label className="text-gray-900 font-semibold">Full Name</label>
                                </div>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-black" />
                                    <input
                                        id="name"
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="John Doe"
                                        className="w-full bg-white border border-gray-400 rounded-lg px-10 py-2.5 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-col">
                                    <label className="text-gray-900 font-semibold">Email</label>
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-black" />
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="name@example.com"
                                        className="w-full bg-white border border-gray-400 rounded-lg px-10 py-2.5 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-col">
                                    <label className="text-black font-semibold">Password</label>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-black" />
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min. 8 characters"
                                        className="w-full bg-white border border-gray-400 rounded-lg px-10 py-2.5 pr-10 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-900" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-900" />
                                        )}
                                    </button>
                                </div>
                                <p className="text-sm text-blue-400">
                                    Must contain uppercase, lowercase, and numbers
                                </p>
                            </div>

                            <div className="space-y-2">
                                <div className="flex flex-col">
                                    <label className="text-black font-semibold">Confirm Password</label>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-4 w-4 text-black" />
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Re-enter password"
                                        className="w-full bg-white border border-gray-400 rounded-lg px-10 py-2.5 pr-10 text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-3 text-gray-500 hover:text-gray-300 transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-900" />
                                        ) : (
                                            <Eye className="h-4 w-4 text-gray-900" />
                                        )}
                                    </button>
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
                                className="w-full mb-2.5 bg-gray-900 hover:bg-blue-500 text-white font-medium py-2.5 rounded-lg shadow-lg shadow-violet-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Creating Account..." : "Sign Up Free"}
                            </button>
                        </form>
                    )}

                    <div className="mt-6 text-center text-sm text-black">
                        Already have an account?{" "}
                        <Link href="/login" className="text-blue-600 hover:text-blue-500 transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
