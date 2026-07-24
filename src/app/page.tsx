import Image from 'next/image';
import Link from 'next/link';

const features = [
  {
    icon: '🏆',
    title: 'Brand New Vehicles',
    desc: 'Every car in our inventory is 100% brand new, directly sourced from authorized distributors.',
  },
  {
    icon: '💰',
    title: 'Competitive Pricing',
    desc: 'We offer the best market prices with flexible payment options to fit your budget.',
  },
  {
    icon: '🤝',
    title: 'Trusted Dealer',
    desc: 'With years of experience in Welisara, we are your most trusted local car dealer.',
  },
  {
    icon: '🔧',
    title: 'After-Sale Support',
    desc: 'Our team is always available to assist you even after your purchase.',
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <Image
          src="/hero.png"
          alt="Mahavithana car showroom"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.75) 100%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-8 max-w-4xl mx-auto">
          <span
            className="inline-block text-xs tracking-[0.3em] uppercase mb-6 py-1.5 px-5 rounded-full border"
            style={{ borderColor: 'rgba(201,168,76,0.4)', color: '#c9a84c', background: 'rgba(201,168,76,0.08)' }}
          >
            Welisara's Premier Car Dealership
          </span>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Drive Your{' '}
            <span style={{ color: '#c9a84c' }}>Dream</span>
            <br />
            Brand New Car
          </h1>

          <p className="text-gray-300 text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Mahavithana Enterprises brings you the finest brand-new vehicles at unbeatable prices.
            Located in the heart of Welisara, Sri Lanka.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/vehicles" className="btn-gold text-base">
              🚗 Browse Our Fleet
            </Link>
            <Link href="/contact" className="btn-outline text-base">
              📞 Contact Us
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
            {[
              { num: '100%', label: 'Brand New' },
              { num: '24/7', label: 'Support' },
              { num: '★★★★★', label: 'Rated' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-[#c9a84c] font-bold text-xl" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {s.num}
                </div>
                <div className="text-gray-400 text-xs tracking-widest uppercase mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs tracking-widest uppercase">
          <span>Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-[#c9a84c] to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── Why Choose Us ── */}
      <section className="py-24 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="section-title">Why Choose <span className="gold">Mahavithana?</span></h2>
            <div className="gold-divider" />
            <p className="section-subtitle text-gray-400">
              We&apos;re more than just a dealership — we&apos;re your partner in finding the perfect vehicle.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="glass-card p-6 text-center">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {f.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Location Banner ── */}
      <section
        className="py-16 px-4 sm:px-8"
        style={{ background: 'linear-gradient(135deg, #0f0f0f 0%, #141414 100%)' }}
      >
        <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden" style={{ border: '1px solid #2a2a2a' }}>
          <div className="grid md:grid-cols-2">
            <div className="p-10 flex flex-col justify-center">
              <h2 className="section-title mb-3">
                Visit Our <span className="gold">Showroom</span>
              </h2>
              <div className="gold-divider" style={{ margin: '0.5rem 0 1.5rem' }} />
              <ul className="space-y-4 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a84c] text-xl mt-0.5">📍</span>
                  <span>330, Negombo Road, Welisara, Sri Lanka 11300</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#c9a84c] text-xl">📞</span>
                  <div>
                    <a href="tel:+94779098813" className="hover:text-[#c9a84c] transition-colors block">077 90 98 813</a>
                    <a href="tel:+94777760437" className="hover:text-[#c9a84c] transition-colors block">07777 60 437</a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-[#c9a84c] text-xl">🕐</span>
                  <span>Mon – Sat: 8:00 AM – 7:00 PM</span>
                </li>
              </ul>
              <div className="mt-8 flex gap-4">
                <Link href="/contact" className="btn-gold">Get Directions</Link>
                <a href="https://wa.me/94779098813" target="_blank" rel="noopener noreferrer" className="btn-outline">
                  WhatsApp
                </a>
              </div>
            </div>
            <div className="h-72 md:h-auto">
              <iframe
                title="Mahavithana Enterprises Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.9!2d79.9!3d7.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2f9!2sMahavithana%20Enterprises!5e0!3m2!1sen!2slk!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '280px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="section-title mb-4">
            Ready to Find Your <span className="gold">Perfect Car?</span>
          </h2>
          <div className="gold-divider" />
          <p className="text-gray-400 mb-8">
            Browse our full inventory of brand-new vehicles. Every car is certified, priced fairly, and ready to drive.
          </p>
          <Link href="/vehicles" className="btn-gold text-lg px-10 py-4">
            View All Vehicles
          </Link>
        </div>
      </section>
    </>
  );
}
