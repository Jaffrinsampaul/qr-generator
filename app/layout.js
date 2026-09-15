import { Inter } from "next/font/google";
import "./globals.css";
import JsonLd from "../components/JsonLd";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qraft-qr.vercel.app";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark light",
};

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "qraft — Free Custom QR Code Generator with Logo & Frames",
    template: "%s | qraft studio",
  },
  description:
    "Free custom QR code generator with logo, CTA frames, check-in badges, radial gradients & custom eye shapes. Create QR codes for Wi-Fi, vCard contacts, URLs, Email, SMS, Location & Events. 100% private in-browser PNG vector export.",
  keywords: [
    // Everyday Real-World Human Search Queries (How normal people search in browser)
    "make a qr code",
    "create qr code free",
    "make qr code for link",
    "make qr code for website",
    "how to make a qr code",
    "generate qr code online free",
    "qr code for wifi password",
    "turn link into qr code",
    "convert url to qr code",
    "how to make a qr code with logo",
    "free qr code generator no signup",
    "free qr code maker that doesnt expire",
    "qr code for restaurant menu",
    "qr code for google review",
    "qr code for instagram profile",
    "qr code for business card",
    "scan to check in qr code",
    "printable qr code maker free",
    "qr code maker online free",
    "create wifi qr code for guests",
    "how to put image in center of qr code",
    "free qr code generator without payment",
    "qr code for phone number",
    "qr code for google maps location",

    // Core Product & Feature Keywords
    "QR code generator",
    "custom QR code maker",
    "free QR code generator",
    "QR code with logo",
    "Wi-Fi QR code generator",
    "vCard digital contact QR code",
    "frame QR code maker",
    "custom QR code design",
    "high resolution QR code generator",
    "SVG QR code generator",
    "private offline QR code maker",
    "QR code generator no signup",
    "restaurant check-in QR code",
    "event QR code builder",
    "location map QR code",
    "free vector QR code generator",
    "scannable QR code generator",
    "best free qr code generator with logo",
    "how to create a qr code for wifi",
    "custom qr code generator free no subscription",
    "qr code maker with scan me frame",
    "vcard contact card qr code builder",
    "high resolution png qr code generator",
    "offline browser private qr code maker",
    "custom color gradient qr code maker",
    "qr code generator without expiration",
    "hd vector svg qr code maker",
    "level h error correction qr code",
  ],
  authors: [{ name: "qraft studio", url: siteUrl }],
  creator: "qraft studio",
  publisher: "qraft studio",
  applicationName: "qraft",
  category: "Technology / Design Utility Software",
  classification: "Business & Productivity Software",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
      "en-GB": siteUrl,
      "es-ES": siteUrl,
      "fr-FR": siteUrl,
      "de-DE": siteUrl,
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "qraft — Free Custom QR Code Generator with Logo & Frames",
    description:
      "Design custom QR codes for links, Wi-Fi, vCards, emails & events. Add center logos, CTA frames, dual gradients & custom eye shapes. 100% private, free high-res PNG export.",
    url: siteUrl,
    siteName: "qraft QR Code Studio",
    images: [
      {
        url: "/og-image.png",
        secureUrl: "/og-image.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "qraft Custom QR Code Generator Studio Preview",
      },
    ],
    locale: "en_US",
    alternateLocale: ["en_GB", "es_ES", "fr_FR", "de_DE"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "qraft — Free Custom QR Code Generator with Logo & Frames",
    description:
      "Design custom QR codes for Wi-Fi, vCards & URLs with logos, frames, gradients & eye shapes. 100% private browser export.",
    images: ["/og-image.png"],
    creator: "@qraftstudio",
    site: "@qraftstudio",
  },
  icons: {
    icon: [{ url: "/favicon.ico" }],
    apple: [{ url: "/favicon.ico" }],
    shortcut: [{ url: "/favicon.ico" }],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "qraft",
    statusBarStyle: "black-translucent",
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "google-site-verification-id",
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION || "yandex-verification-id",
    other: {
      "msvalidate.01": "bing-verification-id",
      "facebook-domain-verification": "meta-verification-id",
    },
  },
  other: {
    // Dublin Core Meta Suite with Complete Features & Natural Language Search Terms
    "DC.title": "qraft — Free Custom QR Code Generator with Logo & Frames",
    "DC.creator": "qraft studio",
    "DC.subject": "Make a QR Code, Free QR Code Generator, QR Code for Link, QR Code for Wi-Fi, Center Logo Overlay, Custom CTA Frames, vCard Contact Card",
    "DC.description": "Easily make free custom QR codes for links, Wi-Fi, business cards, and menus. Add logos, frames, colors & download high-res PNGs privately.",
    "DC.publisher": "qraft studio",
    "DC.type": "InteractiveResource",
    "DC.format": "text/html",
    "DC.language": "en",
    "DC.rights": "Copyright (c) qraft studio",
    "DC.coverage": "Worldwide",

    // Social & Rich SERP Meta Extensions
    "twitter:label1": "Formats",
    "twitter:data1": "URL, Wi-Fi, vCard, Email, Phone, SMS, Maps, Event, Text",
    "twitter:label2": "Customization",
    "twitter:data2": "Logo Overlay, CTA Frames, Eye Shapes, Gradients",
    "twitter:label3": "Privacy & Export",
    "twitter:data3": "100% Private Client-Side, High-Res PNG",

    // Application Feature Metadata Tags
    "features:data_formats": "Website, Wi-Fi, vCard, Email, Phone, SMS, Geolocation, Event, Plain Text",
    "features:frame_styles": "Check-In, Phone, Bottom Badge, Polaroid Card, Event Ticket Pass, Circle Ring, Neon, Retro Corners",
    "features:patterns": "Square, Dots, Rounded, Classy Waterdrop, Diamond, Star, Fluid Wave",
    "features:eye_shapes": "Square, Circle, Rounded Square, Diamond",
    "features:branding": "Center Logo Upload, Dual Gradient Colors, Custom Eye Colors, Transparent PNG Background",
    "features:security": "100% Browser Client-Side, Zero Server Storage, Offline Compatible",

    // Search Engine Directives
    rating: "General",
    "revisit-after": "7 days",
    distribution: "Global",
    coverage: "Worldwide",
    target: "all",
    HandheldFriendly: "True",
    MobileOptimized: "320",
    subject: "Free Custom QR Code Generator with Logo & Frames",
    topic: "QR Code Generator Studio",
    summary: "Generate custom, private QR codes with logos, frames, gradients, and custom module shapes.",
    copyright: "qraft studio",
    designer: "qraft studio",
    owner: "qraft studio",
    "geo.region": "US",
    "geo.placename": "Global",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
        {/* Mobile & App Meta Hints */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="qraft" />
        <meta name="msapplication-TileColor" content="#0f172a" />
        <meta name="theme-color" content="#0f172a" />

        {/* AI Crawler Access Directives for Top AI SERP Placement */}
        <meta name="chatgpt-user" content="allow" />
        <meta name="gptbot" content="allow" />
        <meta name="claudebot" content="allow" />
        <meta name="perplexbot" content="allow" />
        <meta name="google-extended" content="allow" />
        <meta name="applebot" content="allow" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
