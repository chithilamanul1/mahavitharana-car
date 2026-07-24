import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-[#2a2a2a] py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <Image src="/logo.png" alt="Mahavithana Logo" width={48} height={48} className="rounded-full object-cover" />
                            <div>
                                <div className="text-[#c9a84c] font-bold tracking-widest text-sm uppercase" style={{ fontFamily: 'Playfair Display, serif' }}>
                                    Mahavithana
                                </div>
                                <div className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">Enterprises</div>
                            </div>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed">
                            Your trusted brand-new car dealership in Welisara, Sri Lanka. Quality vehicles at competitive prices.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-[#c9a84c] font-semibold mb-4 text-sm tracking-widest uppercase">Quick Links</h4>
                        <ul className="space-y-2">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/vehicles', label: 'Browse Vehicles' },
                                { href: '/contact', label: 'Contact Us' },
                            ].map((l) => (
                                <li key={l.href}>
                                    <Link href={l.href} className="text-gray-400 hover:text-[#c9a84c] text-sm transition-colors">
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-[#c9a84c] font-semibold mb-4 text-sm tracking-widest uppercase">Contact</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="flex items-start gap-2">
                                <span className="text-[#c9a84c] mt-0.5">📍</span>
                                330, Negombo Road, Welisara, Sri Lanka 11300
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#c9a84c]">📞</span>
                                <a href="tel:+94779098813" className="hover:text-[#c9a84c] transition-colors">077 90 98 813</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <span className="text-[#c9a84c]">📞</span>
                                <a href="tel:+94777760437" className="hover:text-[#c9a84c] transition-colors">07777 60 437</a>
                            </li>
                            <li className="mt-3">
                                <a
                                    href="https://wa.me/94779098813"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                                >
                                    💬 WhatsApp Us
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-[#1a1a1a] mt-10 pt-6 text-center text-gray-600 text-xs">
                    © {new Date().getFullYear()} Mahavithana Enterprises. All rights reserved. | Welisara, Sri Lanka
                </div>
            </div>
        </footer>
    );
}
