import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shivaayenterprises.com"),
  title: "Shivaay Enterprises - Real Estate Broker | Satish Rai | Residential & Commercial Properties",
  description: "Shivaay Enterprises, led by Satish Rai, offers expert real estate broker services. Find residential properties, commercial spaces, rental properties, plots, and farmhouse land. Property tax and MPEB connection services available.",
  keywords: "real estate broker, property dealer, Satish Rai, Shivaay Enterprises, residential properties, commercial properties, rental properties, plots, farmhouse land, property tax, MPEB connection, duplex, flats, shops, Nagar Nigam, Khasra, Khatauni, Namantaran",
  authors: [{ name: "Satish Rai - Shivaay Enterprises" }],
  openGraph: {
    title: "Shivaay Enterprises - Trusted Real Estate Broker",
    description: "Expert real estate services for residential, commercial, and rental properties. Contact Satish Rai for professional guidance.",
    url: "https://www.shivaayenterprises.com",
    siteName: "Shivaay Enterprises",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivaay Enterprises - Real Estate Broker",
    description: "Find your dream property with Shivaay Enterprises. Residential, commercial, and rental properties.",
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
  alternates: {
    canonical: "https://www.shivaayenterprises.com",
  },
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.svg",
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ea580c",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body>
        {children}
      </body>
    </html>
  );
}
