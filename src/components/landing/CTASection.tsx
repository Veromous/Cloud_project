import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CTASection() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32 border-t border-white/5 text-black">
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
    );
}
