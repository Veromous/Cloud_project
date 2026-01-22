import Link from "next/link";

export default function Footer() {
    return (
        <footer className="flex flex-col gap-2 sm:flex-row text-black py-6 w-full shrink-0 items-center px-7 md:px-11 border-t border-white/5">
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
    );
}
