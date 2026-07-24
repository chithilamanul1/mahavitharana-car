'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const links = [
    { href: '/', label: 'Home' },
    { href: '/vehicles', label: 'Cars' },
    { href: '/contact', label: 'Contact Us' },
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
        <header className="fixed top-0 left-0 right-0 z-50 flex flex-col">
            {/* Top Bar */}
            <div className="bg-black text-white py-2 px-4 sm:px-8 text-xs font-medium flex justify-between items-center">
                <div className="flex gap-6 max-w-7xl mx-auto w-full justify-between">
                    <div className="flex gap-6">
                        <span className="flex items-center gap-2">
                            📞 Hot Line: +94 77 90 98 813
                        </span>
                        <span className="hidden sm:flex items-center gap-2">
                            ✉️ Mail Us: mahavithana@gmail.com
                        </span>
                    </div>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-gray-300">Facebook</a>
                        <a href="#" className="hover:text-gray-300">Twitter</a>
                        <a href="#" className="hover:text-gray-300">Instagram</a>
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav
                className="transition-all duration-300 bg-white"
                style={{
                    boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.05)' : 'none',
                    borderBottom: '1px solid #e5e7eb',
                }}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl">
                                M
                            </div>
                            <div className="leading-tight">
                                <div className="font-bold text-lg tracking-wide text-black">
                                    MAHAVITHANA
                                </div>
                                <div className="text-[10px] tracking-[0.15em] text-gray-500 uppercase font-semibold">
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
                                    className={`text-sm font-semibold transition-colors duration-200 ${pathname === l.href
                                            ? 'text-black'
                                            : 'text-gray-600 hover:text-black'
                                        }`}
                                >
                                    {l.label}
                                </Link>
                            ))}
                        </div>

                        {/* CTA Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <Link href="/vehicles" className="text-sm font-semibold text-gray-600 hover:text-black">
                                Register / Login
                            </Link>
                            <Link href="/vehicles" className="btn-primary text-sm py-2 px-5 rounded-md">
                                Listing Yours ⊕
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
                                    className="block w-6 h-0.5 bg-black transition-all duration-300"
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
                    className="md:hidden transition-all duration-300 overflow-hidden bg-white"
                    style={{ maxHeight: open ? '300px' : '0px', borderTop: open ? '1px solid #e5e7eb' : 'none' }}
                >
                    <div className="px-6 py-4 flex flex-col gap-4">
                        {links.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setOpen(false)}
                                className={`text-sm font-semibold ${pathname === l.href ? 'text-black' : 'text-gray-600'
                                    }`}
                            >
                                {l.label}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-3 mt-2 pt-4 border-t border-gray-100">
                            <Link href="/vehicles" className="text-sm font-semibold text-center text-gray-600" onClick={() => setOpen(false)}>
                                Register / Login
                            </Link>
                            <Link href="/vehicles" className="btn-primary text-sm text-center" onClick={() => setOpen(false)}>
                                Listing Yours ⊕
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
