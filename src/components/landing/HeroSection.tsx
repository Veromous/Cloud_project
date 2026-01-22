"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";

// Type declaration for CSS Houdini Paint API
declare global {
    interface CSS {
        paintWorklet?: {
            addModule(moduleURL: string): Promise<void>;
        };
    }
}

export default function HeroSection() {
    const welcomeRef = useRef<HTMLElement>(null);

    useEffect(() => {
        // Register the Houdini PaintWorklet for particle ring animation
        if (typeof window !== 'undefined' && 'paintWorklet' in CSS && welcomeRef.current) {
            // Type assertion for experimental CSS Houdini API
            (CSS as any).paintWorklet.addModule('https://unpkg.com/css-houdini-ringparticles/dist/ringparticles.js');

            const welcome = welcomeRef.current;
            let isInteractive = false;

            const handlePointerMove = (e: PointerEvent) => {
                if (!isInteractive) {
                    welcome.classList.add('interactive');
                    isInteractive = true;
                }
                welcome.style.setProperty('--ring-x', String((e.clientX / window.innerWidth) * 100));
                welcome.style.setProperty('--ring-y', String((e.clientY / window.innerHeight) * 100));
                welcome.style.setProperty('--ring-interactive', '1');
            };

            const handlePointerLeave = () => {
                welcome.classList.remove('interactive');
                isInteractive = false;
                welcome.style.setProperty('--ring-x', '50');
                welcome.style.setProperty('--ring-y', '50');
                welcome.style.setProperty('--ring-interactive', '0');
            };

            welcome.addEventListener('pointermove', handlePointerMove);
            welcome.addEventListener('pointerleave', handlePointerLeave);

            return () => {
                welcome.removeEventListener('pointermove', handlePointerMove);
                welcome.removeEventListener('pointerleave', handlePointerLeave);
            };
        }
    }, []);

    return (
        <section
            ref={welcomeRef}
            id="welcome"
            className="w-full py-12 md:py-24 lg:py-32 xl:py-48 relative overflow-hidden min-h-[94vh] flex items-center justify-center particle-ring"
        >
            <div className="container px-4 md:px-6 relative z-10 mx-auto">
                <div className="flex flex-col items-center space-y-8 text-center animate-fade-in">
                    <div className="space-y-4">
                        <h1 className="text-4xl text-black font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-balance">
                             Experience lift off with Our next-generation Real-Time Sentiment <br className="hidden md:inline" />
                            <span className="bg-linear-to-r from-blue-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent animate-gradient">
                                Analysis for Business
                            </span>
                        </h1>
                        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl lg:text-2xl text-balance leading-relaxed">
                            Instantly decode customer emotions across Facebook, YouTube, and TikTok. Turn comments into actionable growth insights.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link className="inline-flex h-12 items-center justify-center rounded-full bg-[#121413] px-16 text-base font-medium text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-black hover:shadow-xl hover:shadow-blue-500/40 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700"
                            href="/register" >
                            Get Started Free
                        </Link>

                        <Link className="inline-flex h-12 items-center justify-center text-black rounded-full border border-white/20 bg-neutral-400/10 backdrop-blur-sm px-10 text-base font-medium shadow-sm transition-all hover:bg-white/20 hover:border-white/30  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                            href="#features">
                            Explore Features
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @property --ring-radius {
                    syntax: '<number>';
                    inherits: false;
                    initial-value: 100;
                }
                @property --ring-x {
                    syntax: '<number>';
                    inherits: false;
                    initial-value: 50;
                }
                @property --ring-y {
                    syntax: '<number>';
                    inherits: false;
                    initial-value: 50;
                }
                @property --animation-tick {
                    syntax: '<number>';
                    inherits: false;
                    initial-value: 0;
                }

                .particle-ring {
                    --ring-radius: 150;
                    --ring-thickness: 600;
                    --particle-count: 80;
                    --particle-rows: 25;
                    --particle-size: 2;
                    --particle-color: navy;
                    --particle-min-alpha: 0.1;
                    --particle-max-alpha: 1.0;
                    --seed: 200;
                    --ring-x: 50;
                    --ring-y: 50;
                    --ring-interactive: 0;
                }

                @supports (background: paint(ring-particles)) {
                    .particle-ring {
                        background-image: paint(ring-particles);
                        animation: ripple 6s linear infinite, ring 6s ease-in-out infinite alternate;
                        transition: --ring-x 3s ease, --ring-y 3s ease;
                    }
                }

                @keyframes ripple {
                    0% { --animation-tick: 0; }
                    100% { --animation-tick: 1; }
                }

                @keyframes ring {
                    0% { --ring-radius: 150; }
                    100% { --ring-radius: 250; }
                }

                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes gradient {
                    0%, 100% {
                        background-position: 0% 50%;
                    }
                    50% {
                        background-position: 100% 50%;
                    }
                }

                .animate-fade-in {
                    animation: fade-in 0.8s ease-out forwards;
                }

                .animate-gradient {
                    background-size: 200% 200%;
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </section>
    );
}
