'use client';

import { useState, FormEvent } from 'react';

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [sent, setSent] = useState(false);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        // Compose WhatsApp message
        const msg = `Hello Mahavithana Enterprises!

Name: ${form.name}
Email: ${form.email}
Phone: ${form.phone}

Message: ${form.message}`;
        window.open(`https://wa.me/94779098813?text=${encodeURIComponent(msg)}`, '_blank');
        setSent(true);
        setForm({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSent(false), 5000);
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            {/* Header */}
            <div className="bg-white py-16 text-center border-b border-gray-200">
                <div className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-2">
                    GET IN TOUCH
                </div>
                <h1 className="text-4xl font-bold text-black mb-4">
                    Contact Us
                </h1>
                <p className="text-gray-600 max-w-2xl mx-auto px-4">
                    We&apos;d love to hear from you. Reach out and let us help you find your perfect car.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Contact Form */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                        <h2 className="text-black text-2xl font-bold mb-8">
                            Send a Message
                        </h2>

                        {sent && (
                            <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-800 border border-green-200 text-sm font-semibold flex items-center gap-2">
                                <span>✅</span> Message sent via WhatsApp! We&apos;ll reply shortly.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2 block">
                                    Full Name *
                                </label>
                                <input
                                    required
                                    className="input-field"
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2 block">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="input-field"
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2 block">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        className="input-field"
                                        placeholder="+94 77 XXX XXXX"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-600 text-xs font-bold uppercase tracking-widest mb-2 block">
                                    Message *
                                </label>
                                <textarea
                                    required
                                    className="input-field resize-none h-40"
                                    placeholder="Tell us which vehicle you're interested in, or ask any question…"
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn-primary w-full py-4 text-base flex justify-center items-center gap-2">
                                <span className="text-xl">💬</span> Send via WhatsApp
                            </button>
                        </form>
                    </div>

                    {/* Info + Map */}
                    <div className="flex flex-col gap-8">
                        {/* Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                {
                                    icon: '📍',
                                    title: 'Our Location',
                                    lines: ['330, Negombo Road,', 'Welisara, Sri Lanka 11300'],
                                    link: 'https://maps.google.com/?q=330+Negombo+Road+Welisara',
                                    linkLabel: 'Get Directions →',
                                },
                                {
                                    icon: '🕐',
                                    title: 'Business Hours',
                                    lines: ['Mon – Sat: 8:00 AM – 7:00 PM', 'Sunday: 9:00 AM – 4:00 PM'],
                                    link: null,
                                    linkLabel: null,
                                },
                                {
                                    icon: '📞',
                                    title: 'Phone Numbers',
                                    lines: ['077 90 98 813', '07777 60 437'],
                                    link: 'tel:+94779098813',
                                    linkLabel: 'Call Now →',
                                },
                                {
                                    icon: '💬',
                                    title: 'WhatsApp',
                                    lines: ['Chat with us instantly', 'Quick responses guaranteed'],
                                    link: 'https://wa.me/94779098813',
                                    linkLabel: 'Open WhatsApp →',
                                },
                            ].map((c) => (
                                <div
                                    key={c.title}
                                    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                                >
                                    <div className="text-3xl mb-4">{c.icon}</div>
                                    <h3 className="text-black font-bold text-lg mb-2">
                                        {c.title}
                                    </h3>
                                    {c.lines.map((l) => (
                                        <p key={l} className="text-gray-600 text-sm mb-1">{l}</p>
                                    ))}
                                    {c.link && (
                                        <a
                                            href={c.link}
                                            target={c.link.startsWith('http') ? '_blank' : undefined}
                                            rel="noopener noreferrer"
                                            className="text-black font-bold text-xs mt-4 inline-block hover:underline uppercase tracking-wider"
                                        >
                                            {c.linkLabel}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Map */}
                        <div className="rounded-2xl overflow-hidden flex-1 min-h-[300px] shadow-sm border border-gray-100 bg-gray-200">
                            <iframe
                                title="Mahavithana Enterprises Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.8!2d79.9!3d7.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f!2sWelisara!5e0!3m2!1sen!2slk!4v1"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '300px' }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
