import { Zap, Globe, Shield } from "lucide-react";

export default function FeaturesSection() {
    return (
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white/5 border-t border-white/5">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="flex flex-col items-center justify-center space-y-4 text-center">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Intelligent Insights</h2>
                        <p className="max-w-[900px] text-black md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                            Our platform leverages advanced AWS AI to process thousands of comments in seconds.
                        </p>
                    </div>
                </div>
                <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
                    <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-xl bg-white/5 border border-black hover:border-blue-400 transition-colors">
                        <div className="p-3 bg-blue-500/10 rounded-full">
                            <Zap className="h-10 w-10 text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-black">Real-Time Processing</h3>
                        <p className="text-black">
                            Ingest and analyze comments the moment they are posted. Never miss a critical reaction.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-xl bg-white/5 border border-black hover:border-blue-400 transition-colors">
                        <div className="p-3 bg-violet-500/10 rounded-full">
                            <Globe className="h-10 w-10 text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-black">Multi-Platform Support</h3>
                        <p className="text-black">
                            Unified dashboard for Facebook, YouTube, and TikTok. Compare performance across channels.
                        </p>
                    </div>
                    <div className="flex flex-col items-center space-y-4 text-center p-6 rounded-xl bg-white/5 border border-black hover:border-blue-400 transition-colors">
                        <div className="p-3 bg-fuchsia-500/10 rounded-full">
                            <Shield className="h-10 w-10 text-black" />
                        </div>
                        <h3 className="text-xl font-bold text-black">Enterprise Security</h3>
                        <p className="text-black">
                            Built on AWS with Cognito authentication and DynamoDB encryption. Your data is safe.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
