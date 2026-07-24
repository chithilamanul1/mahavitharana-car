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
        <div className="min-h-screen" style={{ background: '#0a0a0a' }}>
            {/* Header */}
            <div
                className="py-16 text-center"
                style={{ background: 'linear-gradient(180deg, #111 0%, #0a0a0a 100%)' }}
            >
                <h1 className="section-title mb-3">
                    Get In <span className="gold">Touch</span>
                </h1>
                <div className="gold-divider" />
                <p className="section-subtitle text-gray-400 mx-auto px-4">
                    We&apos;d love to hear from you. Reach out and let us help you find your perfect car.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                    {/* Contact Form */}
                    <div className="glass-card p-8">
                        <h2
                            className="text-white text-2xl font-bold mb-6"
                            style={{ fontFamily: 'Playfair Display, serif' }}
                        >
                            Send a Message
                        </h2>

                        {sent && (
                            <div
                                className="mb-5 p-4 rounded-xl text-green-300 text-sm"
                                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
                            >
                                ✅ Message sent via WhatsApp! We&apos;ll reply shortly.
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-gray-400 text-xs uppercase tracking-widest mb-1 block">
                                    Full Name *
                                </label>
                                <input
                                    required
                                    className="input-dark"
                                    placeholder="Your name"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-1 block">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="input-dark"
                                        placeholder="your@email.com"
                                        value={form.email}
                                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="text-gray-400 text-xs uppercase tracking-widest mb-1 block">
                                        Phone
                                    </label>
                                    <input
                                        type="tel"
                                        className="input-dark"
                                        placeholder="+94 77 XXX XXXX"
                                        value={form.phone}
                                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-gray-400 text-xs uppercase tracking-widest mb-1 block">
                                    Message *
                                </label>
                                <textarea
                                    required
                                    className="input-dark resize-none h-32"
                                    placeholder="Tell us which vehicle you're interested in, or ask any question…"
                                    value={form.message}
                                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn-gold w-full py-3 text-base">
                                💬 Send via WhatsApp
                            </button>
                        </form>
                    </div>

                    {/* Info + Map */}
                    <div className="flex flex-col gap-6">
                        {/* Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    className="glass-card p-5"
                                >
                                    <div className="text-2xl mb-3">{c.icon}</div>
                                    <h3
                                        className="text-white font-semibold text-sm mb-2"
                                        style={{ fontFamily: 'Playfair Display, serif' }}
                                    >
                                        {c.title}
                                    </h3>
                                    {c.lines.map((l) => (
                                        <p key={l} className="text-gray-400 text-sm">{l}</p>
                                    ))}
                                    {c.link && (
                                        <a
                                            href={c.link}
                                            target={c.link.startsWith('http') ? '_blank' : undefined}
                                            rel="noopener noreferrer"
                                            className="text-[#c9a84c] text-xs mt-2 inline-block hover:underline"
                                        >
                                            {c.linkLabel}
                                        </a>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Map */}
                        <div className="rounded-2xl overflow-hidden flex-1 min-h-[250px]" style={{ border: '1px solid #2a2a2a' }}>
                            <iframe
                                title="Mahavithana Enterprises Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.8!2d79.9!3d7.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f!2sWelisara!5e0!3m2!1sen!2slk!4v1"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '250px', filter: 'invert(90%) hue-rotate(180deg)' }}
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
