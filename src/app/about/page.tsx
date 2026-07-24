import Image from 'next/image';
import Link from 'next/link';

export const metadata = {
    title: 'About Us | Mahavithana Enterprises',
    description: 'Learn more about Mahavithana Enterprises, your trusted brand-new car dealership in Welisara, Sri Lanka.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">
            {/* ── Header ── */}
            <div className="bg-[#f8f9fa] py-20 text-center border-b border-gray-100">
                <div className="max-w-3xl mx-auto px-4">
                    <div className="text-sm font-bold text-gray-500 tracking-widest uppercase mb-4">
                        OUR STORY
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-black mb-6">
                        About Mahavithana Enterprises
                    </h1>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        We are a premier brand-new car dealership located in Welisara, Sri Lanka, dedicated to providing our customers with the highest quality vehicles and exceptional service.
                    </p>
                </div>
            </div>

            {/* ── Content Section ── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Image */}
                    <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                        <Image
                            src="/hero.png"
                            alt="Mahavithana Showroom"
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Text */}
                    <div>
                        <h2 className="text-3xl font-bold text-black mb-6">
                            Excellence in Automotive Retail
                        </h2>
                        <div className="space-y-6 text-gray-600 leading-relaxed">
                            <p>
                                At Mahavithana Enterprises, we believe that purchasing a new vehicle should be an exciting and seamless experience. Since our establishment, we have built a reputation for trust, transparency, and unparalleled customer satisfaction.
                            </p>
                            <p>
                                Our showroom features a carefully curated selection of the latest brand-new vehicles from world-renowned manufacturers. Whether you are looking for a luxury sedan, a versatile SUV, or an efficient city car, our expert team is here to guide you every step of the way.
                            </p>
                            <p>
                                We do not deal in used cars. Our commitment is strictly to brand-new, pristine vehicles, ensuring that our clients receive nothing but the best in quality, performance, and reliability.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-4xl font-bold text-black mb-2">100%</div>
                                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Brand New</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-black mb-2">24/7</div>
                                <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── CTA Section ── */}
            <div className="bg-black text-white py-20 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Ready to find your dream car?</h2>
                    <p className="text-gray-400 mb-10">
                        Browse our extensive inventory of brand-new vehicles or contact us today to schedule a showroom visit.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link href="/vehicles" className="bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-gray-200 transition-colors">
                            Browse Vehicles
                        </Link>
                        <Link href="/contact" className="border border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-black transition-colors">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
