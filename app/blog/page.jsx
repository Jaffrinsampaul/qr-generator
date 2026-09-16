import Link from "next/link";

export const metadata = {
  title: "QR Code Guides, Tutorials & Tips | qrcode master studio",
  description: "Learn how to make custom QR codes for Wi-Fi, add logos, format digital contact cards, and optimize print contrast for maximum scan accuracy.",
};

const ARTICLES = [
  {
    slug: "how-to-make-qr-code-for-wifi",
    title: "How to Make a QR Code for Wi-Fi Password Sharing",
    description: "Learn how to generate an instant Wi-Fi access QR code for guests, cafes, and homes without sharing raw passwords.",
    date: "September 16, 2026",
    readTime: "4 min read",
    tag: "Wi-Fi & Networking",
  },
  {
    slug: "how-to-put-logo-in-qr-code",
    title: "How to Put a Logo in a QR Code (Without Breaking Scan Rates)",
    description: "Discover error correction levels, optimal center logo sizing, and contrast rules for high-converting branded QR codes.",
    date: "September 16, 2026",
    readTime: "5 min read",
    tag: "Design & Branding",
  },
  {
    slug: "static-vs-dynamic-qr-codes-expiration",
    title: "Static vs Dynamic QR Codes: Do Free QR Codes Expire?",
    description: "Everything you need to know about static vs dynamic QR codes, server redirections, offline privacy, and expiration risks.",
    date: "September 16, 2026",
    readTime: "6 min read",
    tag: "SEO & Technology",
  },
];

export default function BlogIndex() {
  return (
    <main className="app-shell">
      <header className="topbar">
        <Link href="/" className="brand">
          <span className="brand-mark">▦</span>
          <span>qrcode master</span>
        </Link>
        <div className="topbar-actions">
          <Link href="/" className="ghost-button">
            ← Back to Generator
          </Link>
        </div>
      </header>

      <section className="blog-container">
        <div className="blog-breadcrumbs">
          <Link href="/">Home</Link> / Guides & Tutorials
        </div>

        <div className="blog-header">
          <span className="seo-badge">KNOWLEDGE BASE</span>
          <h1>QR Code Design Guides & Tutorials</h1>
          <p className="hero-copy">
            Practical guides to help you create branded, high-contrast, permanent QR codes for print and digital media.
          </p>
        </div>

        <div className="seo-grid">
          {ARTICLES.map((article) => (
            <article key={article.slug} className="seo-card" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <span className="hero-pill" style={{ marginBottom: "12px", display: "inline-block" }}>{article.tag}</span>
                <h2 style={{ fontSize: "18px", margin: "8px 0 10px 0" }}>
                  <Link href={`/blog/${article.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {article.title}
                  </Link>
                </h2>
                <p style={{ fontSize: "14px", lineHeight: "1.5" }}>{article.description}</p>
              </div>
              <div className="blog-meta" style={{ marginTop: "20px" }}>
                <span>{article.date}</span> · <span>{article.readTime}</span>
              </div>
            </article>
          ))}
        </div>

        <div className="blog-cta-box">
          <h3>Ready to Design Your Custom QR Code?</h3>
          <p>Create free static QR codes with custom logos, frames, and high-DPI vector export 100% in your browser.</p>
          <Link href="/" className="blog-cta-btn">
            Open Free QR Generator →
          </Link>
        </div>
      </section>

      <footer>
        <div className="footer-content">
          <div>
            <strong>qrcode master studio</strong>
            <p>Private by design · Nothing leaves your browser</p>
          </div>
          <div className="footer-links">
            <Link href="/">QR Generator</Link>
            <Link href="/blog/how-to-make-qr-code-for-wifi">Wi-Fi Guide</Link>
            <Link href="/blog/how-to-put-logo-in-qr-code">Logo Guide</Link>
            <Link href="/blog/static-vs-dynamic-qr-codes-expiration">Expiration Guide</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
