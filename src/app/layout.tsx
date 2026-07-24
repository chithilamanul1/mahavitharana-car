import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });

export const metadata: Metadata = {
  metadataBase: new URL('https://mahavithanacars.lk'), // Replace with actual domain when available
  title: {
    default: "Mahavithana Enterprises | Brand New Cars in Welisara, Sri Lanka",
    template: "%s | Mahavithana Enterprises Sri Lanka"
  },
  description: "Mahavithana Enterprises is the premier brand-new car dealership in Welisara, Sri Lanka. We offer a wide range of luxury and family vehicles at competitive prices with excellent after-sales support.",
  keywords: ["car dealership Sri Lanka", "brand new cars Welisara", "buy cars Colombo", "Mahavithana Enterprises", "vehicle importers Sri Lanka", "Toyota Sri Lanka", "Honda Sri Lanka", "luxury cars Sri Lanka"],
  authors: [{ name: "Mahavithana Enterprises" }],
  creator: "Mahavithana Enterprises",
  publisher: "Mahavithana Enterprises",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Mahavithana Enterprises | Brand New Cars in Welisara, Sri Lanka",
    description: "The premier brand-new car dealership in Welisara, Sri Lanka. Browse our inventory of top-quality vehicles.",
    url: 'https://mahavithanacars.lk',
    siteName: 'Mahavithana Enterprises',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'Mahavithana Enterprises Showroom',
      },
    ],
    locale: 'en_LK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahavithana Enterprises | Brand New Cars Sri Lanka',
    description: 'The premier brand-new car dealership in Welisara, Sri Lanka.',
    images: ['/hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoDealer',
    name: 'Mahavithana Enterprises',
    image: 'https://mahavithanacars.lk/hero.png',
    '@id': 'https://mahavithanacars.lk',
    url: 'https://mahavithanacars.lk',
    telephone: '+94779098813',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '330, Negombo Road',
      addressLocality: 'Welisara',
      addressRegion: 'Western Province',
      postalCode: '11300',
      addressCountry: 'LK'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 7.0400,
      longitude: 79.9000
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday'
        ],
        opens: '08:00',
        closes: '19:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '16:00'
      }
    ]
  };

  return (
    <html lang="en" className={`h-full antialiased ${inter.variable} ${playfair.variable}`}>
      <body className="min-h-full flex flex-col bg-[var(--bg-main)]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="flex-1 pt-[116px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
