import Link from "next/link";
import { Twitter, Linkedin, Facebook } from "lucide-react";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-6 lg:px-20 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-8">
                    {/* Logo/Brand Column */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-600 rounded"></div>
                            <span className="font-bold text-lg text-gray-900">Sentilyze</span>
                        </Link>
                    </div>

                    {/* Solutions Column */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-sm">Solutions</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/solutions/small-business" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Small Business
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions/freelancers" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Freelancers
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions/customers" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Customers
                                </Link>
                            </li>
                            <li>
                                <Link href="/solutions/teams" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Teams
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-sm">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/careers" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Learn Column */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-sm">Learn</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/blog" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link href="/ebooks" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Ebooks
                                </Link>
                            </li>
                            <li>
                                <Link href="/guides" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Guides
                                </Link>
                            </li>
                            <li>
                                <Link href="/templates" className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                                    Templates
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Column */}
                    <div>
                        <h3 className="font-semibold text-gray-900 mb-4 text-sm">Follow us on</h3>
                        <div className="flex gap-4">
                            <Link
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-blue-500 transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter className="w-5 h-5" />
                            </Link>
                            <Link
                                href="https://linkedin.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-blue-700 transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-blue-600 transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-gray-200">
                    <p className="text-xs text-gray-500 text-center">
                        ©Sentilyze {currentYear}. All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
