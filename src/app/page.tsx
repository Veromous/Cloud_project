"use client";

import Link from "next/link";
import { ArrowRight, BarChart3, MessageSquare, Zap, Shield, Globe } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center glass sticky top-0 z-50 border-b border-white/5">
        <Link className="flex items-center justify-center gap-2" href="#">
          <BarChart3 className="h-6 w-6 text-blue-500" />
          <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
            Sentilyze
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-blue-400 transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-blue-400 transition-colors" href="/login">
            Login
          </Link>
          <Link className="text-sm font-medium hover:text-blue-400 transition-colors" href="/register">
            Register
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden bg-amber-300 h-[94dvh]">
            <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px]" />
            <div className="container px-4 md:px-6 relative z-10 mx-auto">
              <div className="flex flex-col items-center space-y-4 text-center">
                  <div className="space-y-2">
                        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-balance">
                          Real-Time Sentiment <br className="hidden md:inline" />
                          <span className="bg-linear-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent animate-pulse">
                            Analysis for Business
                          </span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl text-balance">
                          Instantly decode customer emotions across Facebook, YouTube, and TikTok. Turn comments into actionable growth insights.
                        </p>
                  </div>
                  <div className="space-x-4">
                    <Link
                      className="inline-flex h-11 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-all hover:bg-blue-500 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700 disabled:pointer-events-none disabled:opacity-50"
                      href="/register"
                    >
                      Get Started Free
                    </Link>
                    <Link
                      className="inline-flex h-11 items-center justify-center rounded-md border border-white/10 bg-white/5 px-8 text-sm font-medium shadow-sm transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                      href="#demo"
                    >
                      Live Demo
                    </Link>
                </div>
              </div>
            </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white/5 border-t border-white/5">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Intelligent Insights</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform leverages advanced AWS AI to process thousands of comments in seconds.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/50 transition-colors">
                <div className="p-3 bg-blue-500/10 rounded-full">
                  <Zap className="h-10 w-10 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold">Real-Time Processing</h3>
                <p className="text-muted-foreground">
                  Ingest and analyze comments the moment they are posted. Never miss a critical reaction.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-xl bg-white/5 border border-white/5 hover:border-violet-500/50 transition-colors">
                <div className="p-3 bg-violet-500/10 rounded-full">
                  <Globe className="h-10 w-10 text-violet-400" />
                </div>
                <h3 className="text-xl font-bold">Multi-Platform Support</h3>
                <p className="text-muted-foreground">
                  Unified dashboard for Facebook, YouTube, and TikTok. Compare performance across channels.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-xl bg-white/5 border border-white/5 hover:border-fuchsia-500/50 transition-colors">
                <div className="p-3 bg-fuchsia-500/10 rounded-full">
                  <Shield className="h-10 w-10 text-fuchsia-400" />
                </div>
                <h3 className="text-xl font-bold">Enterprise Security</h3>
                <p className="text-muted-foreground">
                  Built on AWS with Cognito authentication and DynamoDB encryption. Your data is safe.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 border-t border-white/5">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-10 sm:px-10 md:gap-16 md:grid-cols-2">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-blue-500/10 px-3 py-1 text-sm text-blue-400">
                  Ready to scale?
                </div>
                <h2 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                  Start listening to your customers today.
                </h2>
                <Link
                  className="inline-flex h-9 items-center justify-center rounded-md bg-white text-gray-900 px-4 py-2 text-sm font-medium shadow transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50"
                  href="/register"
                >
                  Create Free Account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
              <div className="flex flex-col items-start space-y-4">
                <div className="inline-block rounded-lg bg-white/5 px-3 py-1 text-sm text-muted-foreground">
                  Powered by
                </div>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                  Our stack includes Next.js, AWS Lambda, API Gateway, and Amazon Comprehend for state-of-the-art NLP.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-white/5">
        <p className="text-xs text-muted-foreground">
          © 2026 Sentilyze Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground hover:text-white" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4 text-muted-foreground hover:text-white" href="#">
            Privacy
          </Link>
        </nav>
      </footer>
    </div>
  );
}
