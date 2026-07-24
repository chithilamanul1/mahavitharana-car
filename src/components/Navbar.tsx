'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/', label: 'Home' },
    { href: '/vehicles', label: 'Vehicles' },
    { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
            style={{
                background: scrolled
                    ? 'rgba(10,10,10,0.97)'
                    : 'rgba(10,10,10,0.80)',
                backdropFilter: 'blur(14px)',
                borderBottom: '1px solid #2a2a2a',
            }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="Mahavithana Enterprises Logo"
                            width={44}
                            height={44}
                            className="rounded-full object-cover"
                        />
                        <div className="leading-tight hidden sm:block">
                            <div
                                className="font-bold text-sm tracking-widest uppercase"
                                style={{ color: '#c9a84c', fontFamily: 'Playfair Display, serif' }}
                            >
                                Mahavithana
                            </div>
                            <div className="text-[10px] tracking-[0.2em] text-gray-400 uppercase">
                                Enterprises
                            </div>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={`text-sm font-medium tracking-wide transition-colors duration-200 ${pathname === l.href
                                        ? 'text-[#c9a84c]'
                                        : 'text-gray-300 hover:text-[#c9a84c]'
                                    }`}
                            >
                                {l.label}
                            </Link>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:block">
                        <Link href="/vehicles" className="btn-gold text-sm py-2 px-5">
                            Browse Cars
                        </Link>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2"
                        onClick={() => setOpen(!open)}
                        aria-label="Toggle menu"
                    >
                        {[0, 1, 2].map((i) => (
                            <span
                                key={i}
                                className="block w-6 h-0.5 bg-gray-300 transition-all duration-300"
                                style={{
                                    transform:
                                        open && i === 0
                                            ? 'rotate(45deg) translate(5px, 5px)'
                                            : open && i === 2
                                                ? 'rotate(-45deg) translate(5px, -5px)'
                                                : open && i === 1
                                                    ? 'opacity: 0; width: 0'
                                                    : '',
                                    opacity: open && i === 1 ? 0 : 1,
                                }}
                            />
                        ))}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className="md:hidden transition-all duration-300 overflow-hidden"
                style={{ maxHeight: open ? '300px' : '0px', borderTop: open ? '1px solid #2a2a2a' : 'none' }}
            >
                <div className="px-6 py-4 flex flex-col gap-4 bg-[#0d0d0d]">
                    {links.map((l) => (
                        <Link
                            key={l.href}
                            href={l.href}
                            onClick={() => setOpen(false)}
                            className={`text-sm font-medium tracking-wide ${pathname === l.href ? 'text-[#c9a84c]' : 'text-gray-300'
                                }`}
                        >
                            {l.label}
                        </Link>
                    ))}
                    <Link href="/vehicles" className="btn-gold text-sm text-center mt-2" onClick={() => setOpen(false)}>
                        Browse Cars
                    </Link>
                </div>
            </div>
        </nav>
    );
}
