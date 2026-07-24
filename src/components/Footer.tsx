import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-200 py-16 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="relative w-14 h-14 rounded-full overflow-hidden bg-black flex-shrink-0">
                                <Image
                                    src="/logo.png"
                                    alt="Mahavithana Enterprises Logo"
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <div className="text-black font-bold tracking-wide text-lg uppercase">
                                    MAHAVITHANA
                                </div>
                                <div className="text-[10px] tracking-[0.15em] text-gray-500 uppercase font-semibold">
                                    Enterprises
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-6">
                            Your trusted brand-new car dealership in Welisara, Sri Lanka. Quality vehicles at competitive prices.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-colors">
                                f
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-colors">
                                t
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-black hover:text-white transition-colors">
                                in
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-black font-bold mb-6 text-lg">Quick Links</h4>
                        <ul className="space-y-3">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/vehicles', label: 'Browse Vehicles' },
                                { href: '/contact', label: 'Contact Us' },
                            ].map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className="text-gray-600 hover:text-black font-medium text-sm transition-colors flex items-center gap-2">
                                        <span className="text-gray-300">›</span> {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-black font-bold mb-6 text-lg">Contact Info</h4>
                        <ul className="space-y-4 text-sm text-gray-600">
                            <li className="flex items-start gap-3">
                                <span className="text-xl">📍</span>
                                <span className="mt-1">330, Negombo Road, Welisara, Sri Lanka 11300</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-xl">📞</span>
                                <a href="tel:+94779098813" className="hover:text-black font-medium transition-colors">077 90 98 813</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="text-xl">✉️</span>
                                <a href="mailto:mahavithana@gmail.com" className="hover:text-black font-medium transition-colors">mahavithana@gmail.com</a>
                            </li>
                            <li className="mt-6">
                                <a
                                    href="https://wa.me/94779098813"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm font-bold px-6 py-3 rounded-lg transition-colors shadow-sm"
                                >
                                    <span className="text-lg">💬</span> WhatsApp Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm font-medium">
                    <div>
                        © {new Date().getFullYear()} Mahavithana Enterprises. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-black">Privacy Policy</a>
                        <a href="#" className="hover:text-black">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
