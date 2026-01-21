"use client";

import Link from "next/link";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Mail, ShieldCheck } from "lucide-react";
import { confirmSignUp, resendSignUpCode } from "aws-amplify/auth";

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

function VerifyEmailContent() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [resending, setResending] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email") || "";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await confirmSignUp({
                username: email,
                confirmationCode: code,
            });

            setSuccess(true);
            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (err: any) {
            console.error("Verification error:", err);
            setError(err.message || "Verification failed. Please check your code.");
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setResending(true);
        setError("");

        try {
            await resendSignUpCode({ username: email });
            alert("Verification code resent! Check your email.");
        } catch (err: any) {
            console.error("Resend error:", err);
            setError(err.message || "Failed to resend code.");
        } finally {
            setResending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
            <div className="absolute inset-0 bg-green-500/5 blur-[100px] rounded-full top-1/4 left-1/4 w-[400px] h-[400px]" />

            <div className="relative z-10 w-full max-w-md p-6">
                <Link href="/register" className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Register
                </Link>

                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-xl">
                    <div className="flex flex-col items-center mb-8">
                        <div className="p-3 bg-green-500/10 rounded-full mb-4">
                            <Mail className="h-6 w-6 text-green-400" />
                        </div>
                        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-gray-400">
                            Verify Your Email
                        </h1>
                        <p className="text-sm text-muted-foreground mt-2 text-center">
                            We sent a verification code to
                        </p>
                        <p className="text-sm text-white font-medium mt-1">
                            {email}
                        </p>
                    </div>

                    {success ? (
                        <div className="text-center space-y-4">
                            <div className="p-3 bg-green-500/10 rounded-full mx-auto w-fit mb-4">
                                <ShieldCheck className="h-8 w-8 text-green-400" />
                            </div>
                            <div className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                                Email verified successfully! Redirecting to login...
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-300" htmlFor="code">
                                    Verification Code
                                </label>
                                <input
                                    id="code"
                                    type="text"
                                    required
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Enter 6-digit code"
                                    maxLength={6}
                                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all text-center tracking-widest"
                                />
                            </div>

                            {error && (
                                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading || code.length !== 6}
                                className="w-full bg-green-600 hover:bg-green-500 text-white font-medium py-2.5 rounded-lg shadow-lg shadow-green-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? "Verifying..." : "Verify Email"}
                            </button>

                            <div className="text-center">
                                <button
                                    type="button"
                                    onClick={handleResendCode}
                                    disabled={resending}
                                    className="text-sm text-gray-400 hover:text-white transition-colors disabled:opacity-50"
                                >
                                    {resending ? "Sending..." : "Didn't receive the code? Resend"}
                                </button>
                            </div>
                        </form>
                    )}

                    <div className="mt-6 text-center text-sm text-muted-foreground">
                        Already verified?{" "}
                        <Link href="/login" className="text-green-400 hover:text-green-300 transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-white">Loading...</div>
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}
