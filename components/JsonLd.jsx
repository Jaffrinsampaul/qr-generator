export default function JsonLd() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://qraft-qr.vercel.app";

  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "qraft — QR code studio",
    "alternateName": ["qraft", "qraft QR Generator", "qraft studio"],
    "url": siteUrl,
    "description": "Free, instant, private QR code generator. Design custom QR codes with logos, custom frames, gradients, shapes, Wi-Fi login, vCard contacts, URLs & high-res PNG export.",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "softwareVersion": "1.0.0",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "9 QR Data Encoders (URL, Wi-Fi, vCard, Email, Phone, SMS, Location, Event, Text)",
      "Wi-Fi WPA/WPA2/WEP Network Auto-Connect QR Generator",
      "vCard 3.0 Digital Contact Card Builder",
      "Calendar VEVENT & GPS Location Map QR Generator",
      "Custom Check-In Badges & CTA Frames (Hotel, Event, Mobile, Ticket, Polaroid, Neon, Retro)",
      "7 Body Module Patterns (Square, Dots, Rounded, Classy Waterdrop, Diamond, Star, Fluid Wave)",
      "4 Corner Eye Outer Frames (Square, Circle, Rounded, Diamond)",
      "4 Corner Eye Inner Balls (Square, Circle, Rounded, Diamond)",
      "Independent Eye Color Customization (Separate Outer Frame & Inner Ball Colors)",
      "Custom Color Palettes & Linear/Radial Dual Ink Gradients",
      "Center Logo & Image Overlay Integration (PNG, SVG, WEBP, JPEG)",
      "Transparent Background Alpha PNG Output",
      "Level H High Error Correction (~30% Matrix Recovery)",
      "3x High-DPI Retina Canvas Rendering & High-Res PNG Download",
      "100% Client-Side Private Processing (Zero Server Data Retention)"
    ],
    "creator": {
      "@type": "Organization",
      "name": "qraft studio",
      "url": siteUrl
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Create a Custom QR Code with Logo and Frames",
    "description": "Step-by-step instructions for creating high-resolution, custom-branded QR codes for websites, Wi-Fi, contacts, and events.",
    "totalTime": "PT1M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "tool": [
      {
        "@type": "HowToTool",
        "name": "qraft QR Code Studio"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "position": 1,
        "name": "Choose Format & Enter Details",
        "text": "Select your data format (Website URL, Wi-Fi network, vCard, Email, Phone, Event) and fill in your details.",
        "url": `${siteUrl}/#workspace`
      },
      {
        "@type": "HowToStep",
        "position": 2,
        "name": "Customize Frames, Colors & Upload Logo",
        "text": "Pick a custom check-in frame, select brand colors or radial gradients, choose corner eye shapes, and upload your center logo.",
        "url": `${siteUrl}/#workspace`
      },
      {
        "@type": "HowToStep",
        "position": 3,
        "name": "Preview & Download PNG",
        "text": "Test your live QR code preview on-screen and click Download PNG for crisp print or digital distribution.",
        "url": `${siteUrl}/#workspace`
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "qraft — QR Code Studio",
    "alternateName": "qraft QR Generator",
    "url": siteUrl,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Is qraft QR code generator completely free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, qraft is 100% free to use. You can generate unlimited custom QR codes with frames, colors, and center logos without signing up or paying any fee."
        }
      },
      {
        "@type": "Question",
        "name": "Do QR codes generated with qraft ever expire?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, all static QR codes created on qraft are permanent and never expire. Because data is encoded directly into the matrix, your QR codes will work indefinitely."
        }
      },
      {
        "@type": "Question",
        "name": "Is my data stored or tracked on servers?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No! qraft operates entirely in your browser (client-side). Your links, Wi-Fi passwords, contact cards, and uploaded logos never leave your device."
        }
      },
      {
        "@type": "Question",
        "name": "Can I add a custom logo to my QR code?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, you can upload any image or logo (PNG, SVG, WEBP, JPEG) to embed directly in the center of your customized QR code."
        }
      },
      {
        "@type": "Question",
        "name": "What QR code types does qraft support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "qraft supports 9 rich format types: Websites (URL), Plain Text, Wi-Fi auto-connect, Email, Phone Numbers, SMS, vCard Contact Cards, Geolocation, and Calendar Events."
        }
      }
    ]
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "qraft studio",
    "url": siteUrl,
    "logo": `${siteUrl}/icon.png`,
    "sameAs": [
      "https://twitter.com/qraftstudio",
      "https://github.com/qraftstudio"
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "QR Code Generator",
        "item": `${siteUrl}/#workspace`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
