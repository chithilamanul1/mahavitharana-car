import Image from 'next/image';
import Link from 'next/link';

const brands = [
  { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
  { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Honda.svg' },
  { name: 'Nissan', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Nissan_logo.png' },
  { name: 'Suzuki', logo: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Suzuki_logo_2.svg' },
  { name: 'Mitsubishi', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Mitsubishi-logo.png' },
  { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative bg-[#f0f2f5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20 pb-32">
            {/* Text Content */}
            <div>
              <div className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-4">
                TRUSTED DEALER, RENTAL
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold text-black leading-tight mb-6">
                Premium Car <br />
                Collection..
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md">
                Car Is Where Early Adopters And Innovation Seekers Find Lively Imaginative Tech Before It Hits The Mainstream.
              </p>
              <div className="flex items-center gap-6">
                <Link href="/vehicles" className="btn-primary">
                  Go To Listing
                </Link>
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow">
                  <span className="text-black ml-1">▶</span>
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[400px] lg:h-[500px]">
              <Image
                src="/hero.png"
                alt="Mahavithana car showroom"
                fill
                className="object-contain object-right"
                priority
              />
              {/* Floating Badge */}
              <div className="absolute top-10 right-10 bg-black text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-xl">
                <span className="text-xl font-bold">40%</span>
                <span className="text-[10px] uppercase">OFF</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search Bar (Floating) */}
        <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col md:flex-row gap-4 items-center border border-gray-100">
              <select className="input-field flex-1">
                <option>Make</option>
                <option>Toyota</option>
                <option>Honda</option>
              </select>
              <select className="input-field flex-1">
                <option>Models</option>
                <option>Camry</option>
                <option>Civic</option>
              </select>
              <div className="flex-1 px-4 w-full flex items-center justify-center">
                <span className="text-sm font-semibold text-gray-500">All vehicles are brand new</span>
              </div>
              <button className="btn-primary w-full md:w-auto py-3 px-8 flex items-center justify-center gap-2">
                <span>🔍</span> Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer for floating search bar */}
      <div className="h-32"></div>

      {/* ── Browse By Brands ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-2">
            FIND YOUR CAR BY CAR BRAND
          </div>
          <h2 className="text-3xl font-bold text-black mb-12">Browse By Brands</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {brands.map((brand) => (
              <div key={brand.name} className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col items-center justify-center gap-4 hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="relative w-16 h-16 grayscale group-hover:grayscale-0 transition-all">
                  <Image src={brand.logo} alt={brand.name} fill className="object-contain" />
                </div>
                <span className="font-semibold text-gray-800">{brand.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore All Vehicles ── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#f8f9fa]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <div className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-2">
                TRUSTED CAR DEALER SERVICE
              </div>
              <h2 className="text-3xl font-bold text-black">Explore All Vehicles</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Dummy Cards to match design */}
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow group">
                <div className="relative h-56 bg-gray-200">
                  <Image src="/hero.png" alt="Car" fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">Featured</span>
                    <span className="bg-black/50 text-white text-xs font-bold px-2 py-1 rounded flex items-center gap-1">📷 5</span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">2023</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs text-gray-500 mb-1">Mini Cooper 3 Similar</div>
                  <h3 className="text-lg font-bold text-black mb-2">Chevrolet Suburban 2021 mo</h3>
                  <div className="text-sm font-bold text-gray-500 mb-6">Inquire for Price</div>

                  <div className="grid grid-cols-3 gap-4 border-t border-b border-gray-100 py-4 mb-4">
                    <div className="flex flex-col items-center text-center">
                      <span className="text-gray-400 text-sm mb-1">⛽</span>
                      <span className="text-xs text-gray-500">Fuel type</span>
                      <span className="text-sm font-semibold text-black">Petrol</span>
                    </div>
                    <div className="flex flex-col items-center text-center border-l border-r border-gray-100">
                      <span className="text-gray-400 text-sm mb-1">⏱</span>
                      <span className="text-xs text-gray-500">Mileage</span>
                      <span className="text-sm font-semibold text-black">90k.m</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-gray-400 text-sm mb-1">⚙️</span>
                      <span className="text-xs text-gray-500">Transmission</span>
                      <span className="text-sm font-semibold text-black">Auto</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <Link href="/vehicles" className="text-sm font-bold text-black hover:underline flex items-center gap-1">
                      VIEW DETAILS <span>→</span>
                    </Link>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors">
                        ⇄
                      </button>
                      <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors">
                        ♡
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/vehicles" className="btn-outline">View All Vehicles</Link>
          </div>
        </div>
      </section>
    </>
  );
}
