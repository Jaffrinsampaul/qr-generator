"use client";

import { useMemo, useRef, useState } from "react";
import QRCanvas from "../components/qrCodeRender/QRCanvas";
import FrameControls from "../components/customizer/FrameControls";
import PatternControls from "../components/customizer/PatternControls";

const TYPES = [
  { id: "url", label: "Website", icon: "↗", hint: "Share a link" },
  { id: "text", label: "Text", icon: "T", hint: "Plain text" },
  { id: "wifi", label: "Wi-Fi", icon: "⌁", hint: "Network access" },
  { id: "email", label: "Email", icon: "@", hint: "Compose an email" },
  { id: "phone", label: "Phone", icon: "⌕", hint: "Call a number" },
  { id: "sms", label: "SMS", icon: "▱", hint: "Send a message" },
  { id: "vcard", label: "Contact", icon: "○", hint: "Save a contact" },
  { id: "location", label: "Location", icon: "⌖", hint: "Open a place" },
  { id: "event", label: "Event", icon: "□", hint: "Add to calendar" },
];

const defaults = {
  url: { value: "https://example.com" },
  text: { value: "" },
  wifi: { ssid: "", password: "", security: "WPA" },
  email: { address: "", subject: "", body: "" },
  phone: { number: "" },
  sms: { number: "", message: "" },
  vcard: { name: "", phone: "", email: "", company: "" },
  location: { mapUrl: "", latitude: "", longitude: "", label: "" },
  event: { title: "", location: "", start: "", end: "" },
};

function buildValue(type, data) {
  if (type === "url" || type === "text") return data.value || "";
  if (type === "wifi") return data.ssid ? `WIFI:T:${data.security};S:${data.ssid};P:${data.password};;` : "";
  if (type === "email") return data.address ? `mailto:${data.address}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}` : "";
  if (type === "phone") return data.number ? `tel:${data.number}` : "";
  if (type === "sms") return data.number ? `SMSTO:${data.number}:${data.message}` : "";
  if (type === "vcard") return data.name ? `BEGIN:VCARD\nVERSION:3.0\nFN:${data.name}\nORG:${data.company}\nTEL:${data.phone}\nEMAIL:${data.email}\nEND:VCARD` : "";
  if (type === "location") {
    if (data.mapUrl) return data.mapUrl;
    return data.latitude && data.longitude ? `geo:${data.latitude},${data.longitude}?q=${encodeURIComponent(data.label)}` : "";
  }
  if (type === "event") return data.title ? `BEGIN:VEVENT\nSUMMARY:${data.title}\nLOCATION:${data.location}\nDTSTART:${data.start.replace(/[-:]/g, "")}\nDTEND:${data.end.replace(/[-:]/g, "")}\nEND:VEVENT` : "";
  return "";
}

function Field({ label, value, onChange, placeholder, type = "text", multiline = false }) {
  const Tag = multiline ? "textarea" : "input";
  return (
    <label className="field">
      <span>{label}</span>
      <Tag
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={multiline ? 4 : undefined}
      />
    </label>
  );
}

export default function Home() {
  const [active, setActive] = useState("url");
  const [data, setData] = useState(defaults);

  // Styling & Customizer State
  const [foreground, setForeground] = useState("#17213b");
  const [background, setBackground] = useState("#ffffff");
  const [size, setSize] = useState(260);
  const [transparent, setTransparent] = useState(false);
  const [logo, setLogo] = useState("");
  const [logoSizePercent, setLogoSizePercent] = useState(22);
  const [logoRotation, setLogoRotation] = useState(0);

  // Pattern & Eye State
  const [pattern, setPattern] = useState("square");
  const [eyeOuter, setEyeOuter] = useState("square");
  const [eyeInner, setEyeInner] = useState("square");
  const [customEyeColor, setCustomEyeColor] = useState(false);
  const [eyeOuterColor, setEyeOuterColor] = useState("#17213b");
  const [eyeInnerColor, setEyeInnerColor] = useState("#17213b");
  const [useGradient, setUseGradient] = useState(false);
  const [gradientEnd, setGradientEnd] = useState("#f06f62");

  // Frame State
  const [frameStyle, setFrameStyle] = useState("none");
  const [frameText, setFrameText] = useState("SCAN TO CHECK IN");
  const [frameTitle, setFrameTitle] = useState("ONLINE CHECK-IN");
  const [frameColor, setFrameColor] = useState("#f06f62");
  const [frameTextColor, setFrameTextColor] = useState("#ffffff");

  // Customizer Active Tab
  const [activeTab, setActiveTab] = useState("frames");

  const canvasRef = useRef(null);
  const value = useMemo(() => buildValue(active, data[active]), [active, data]);
  const current = data[active];
  const update = (key, next) => setData((old) => ({ ...old, [active]: { ...old[active], [key]: next } }));

  function handleLogoUpload(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(String(reader.result || ""));
    reader.readAsDataURL(file);
  }

  function applyPreset(preset) {
    if (preset.frameStyle) setFrameStyle(preset.frameStyle);
    if (preset.frameTitle) setFrameTitle(preset.frameTitle);
    if (preset.frameText) setFrameText(preset.frameText);
    if (preset.frameColor) setFrameColor(preset.frameColor);
    if (preset.frameTextColor) setFrameTextColor(preset.frameTextColor);
    if (preset.pattern) setPattern(preset.pattern);
    if (preset.eyeOuter) setEyeOuter(preset.eyeOuter);
    if (preset.eyeInner) setEyeInner(preset.eyeInner);
  }

  function download() {
    if (canvasRef.current) {
      canvasRef.current.downloadPNG(`qr-${active}.png`);
    }
  }

  function resetAll() {
    setData(defaults);
    setActive("url");
    setForeground("#17213b");
    setBackground("#ffffff");
    setSize(260);
    setTransparent(false);
    setLogo("");
    setLogoSizePercent(22);
    setLogoRotation(0);
    setPattern("square");
    setEyeOuter("square");
    setEyeInner("square");
    setCustomEyeColor(false);
    setUseGradient(false);
    setFrameStyle("none");
    setFrameText("SCAN TO CHECK IN");
    setFrameTitle("ONLINE CHECK-IN");
    setFrameColor("#f06f62");
    setFrameTextColor("#ffffff");
  }

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">▦</span>
          <span>qraft</span>
        </div>
        <div className="topbar-actions">
          <span className="status-dot" /> Ready to create{" "}
          <button className="ghost-button" onClick={resetAll}>
            Start over
          </button>
        </div>
      </header>

      <section className="hero">
        <div>
          <p className="eyebrow">FREE CUSTOM QR CODE GENERATOR & STUDIO</p>
          <h1>
            Create custom QR codes<br />
            <em>with logos & frames.</em>
          </h1>
          <p className="hero-copy">
            Design high-resolution, branded QR codes for websites, Wi-Fi networks, contact cards, and events. 100% free and private in your browser.
          </p>
        </div>
        <div className="hero-orbit">
          <span>9 formats</span>
          <span>∞ possibilities</span>
        </div>
      </section>

      <section className="workspace">
        {/* Step 1: Choose Format */}
        <aside className="type-panel">
          <div className="panel-heading">
            <span className="step">01</span>
            <div>
              <h2>Choose a format</h2>
              <p>What should your QR code do?</p>
            </div>
          </div>
          <div className="type-grid">
            {TYPES.map((item) => (
              <button
                key={item.id}
                className={`type-card ${active === item.id ? "active" : ""}`}
                onClick={() => setActive(item.id)}
              >
                <span className="type-icon">{item.icon}</span>
                <span>
                  <strong>{item.label}</strong>
                  <small>{item.hint}</small>
                </span>
                {active === item.id && <b>●</b>}
              </button>
            ))}
          </div>
        </aside>

        {/* Step 2: Add Details */}
        <section className="editor-panel">
          <div className="panel-heading">
            <span className="step">02</span>
            <div>
              <h2>Add your details</h2>
              <p>Your information stays in your browser.</p>
            </div>
          </div>
          <div className="fields">
            {active === "url" && (
              <Field
                label="Website URL"
                value={current.value}
                onChange={(v) => update("value", v)}
                placeholder="https://yourwebsite.com"
                type="url"
              />
            )}
            {active === "text" && (
              <Field
                label="Your message"
                value={current.value}
                onChange={(v) => update("value", v)}
                placeholder="Type anything you want to share..."
                multiline
              />
            )}
            {active === "wifi" && (
              <>
                <Field
                  label="Network name (SSID)"
                  value={current.ssid}
                  onChange={(v) => update("ssid", v)}
                  placeholder="My Wi-Fi"
                />
                <div className="field-row">
                  <Field
                    label="Password"
                    value={current.password}
                    onChange={(v) => update("password", v)}
                    placeholder="••••••••"
                    type="password"
                  />
                  <label className="field">
                    <span>Security</span>
                    <select
                      value={current.security}
                      onChange={(e) => update("security", e.target.value)}
                    >
                      <option>WPA</option>
                      <option>WEP</option>
                      <option>nopass</option>
                    </select>
                  </label>
                </div>
              </>
            )}
            {active === "email" && (
              <>
                <Field
                  label="Email address"
                  value={current.address}
                  onChange={(v) => update("address", v)}
                  placeholder="hello@example.com"
                  type="email"
                />
                <Field
                  label="Subject"
                  value={current.subject}
                  onChange={(v) => update("subject", v)}
                  placeholder="Let's connect"
                />
                <Field
                  label="Message"
                  value={current.body}
                  onChange={(v) => update("body", v)}
                  placeholder="Write a message..."
                  multiline
                />
              </>
            )}
            {active === "phone" && (
              <Field
                label="Phone number"
                value={current.number}
                onChange={(v) => update("number", v)}
                placeholder="+1 555 123 4567"
                type="tel"
              />
            )}
            {active === "sms" && (
              <>
                <Field
                  label="Phone number"
                  value={current.number}
                  onChange={(v) => update("number", v)}
                  placeholder="+1 555 123 4567"
                  type="tel"
                />
                <Field
                  label="Message"
                  value={current.message}
                  onChange={(v) => update("message", v)}
                  placeholder="Your message..."
                  multiline
                />
              </>
            )}
            {active === "vcard" && (
              <>
                <Field
                  label="Full name"
                  value={current.name}
                  onChange={(v) => update("name", v)}
                  placeholder="Alex Morgan"
                />
                <div className="field-row">
                  <Field
                    label="Phone"
                    value={current.phone}
                    onChange={(v) => update("phone", v)}
                    placeholder="+1 555 123 4567"
                  />
                  <Field
                    label="Email"
                    value={current.email}
                    onChange={(v) => update("email", v)}
                    placeholder="alex@example.com"
                  />
                </div>
                <Field
                  label="Company"
                  value={current.company}
                  onChange={(v) => update("company", v)}
                  placeholder="Acme Studio"
                />
              </>
            )}
            {active === "location" && (
              <>
                <Field
                  label="Google Maps link"
                  value={current.mapUrl}
                  onChange={(v) => update("mapUrl", v)}
                  placeholder="Paste a Google Maps URL"
                  type="url"
                />
                <p className="field-help">
                  Open Google Maps, choose a place, tap Share, then paste the link here.
                </p>
                <div className="field-row">
                  <Field
                    label="Latitude (optional)"
                    value={current.latitude}
                    onChange={(v) => update("latitude", v)}
                    placeholder="40.7128"
                  />
                  <Field
                    label="Longitude (optional)"
                    value={current.longitude}
                    onChange={(v) => update("longitude", v)}
                    placeholder="-74.0060"
                  />
                </div>
                <Field
                  label="Place name"
                  value={current.label}
                  onChange={(v) => update("label", v)}
                  placeholder="New York City"
                />
              </>
            )}
            {active === "event" && (
              <>
                <Field
                  label="Event title"
                  value={current.title}
                  onChange={(v) => update("title", v)}
                  placeholder="Team dinner"
                />
                <Field
                  label="Location"
                  value={current.location}
                  onChange={(v) => update("location", v)}
                  placeholder="The Studio"
                />
                <div className="field-row">
                  <Field
                    label="Starts"
                    value={current.start}
                    onChange={(v) => update("start", v)}
                    type="datetime-local"
                  />
                  <Field
                    label="Ends"
                    value={current.end}
                    onChange={(v) => update("end", v)}
                    type="datetime-local"
                  />
                </div>
              </>
            )}
          </div>
        </section>

        {/* Step 3: Make it Yours & Preview */}
        <section className="preview-panel">
          <div className="panel-heading">
            <span className="step">03</span>
            <div>
              <h2>Make it yours</h2>
              <p>Frames, patterns, styles & download.</p>
            </div>
          </div>

          {/* QR Canvas Stage */}
          <div className="qr-stage">
            {value ? (
              <QRCanvas
                ref={canvasRef}
                value={value}
                size={size}
                foreground={foreground}
                background={background}
                transparent={transparent}
                logo={logo}
                logoSizePercent={logoSizePercent}
                logoRotation={logoRotation}
                pattern={pattern}
                eyeOuter={eyeOuter}
                eyeInner={eyeInner}
                customEyeColor={customEyeColor}
                eyeOuterColor={eyeOuterColor}
                eyeInnerColor={eyeInnerColor}
                useGradient={useGradient}
                gradientEnd={gradientEnd}
                frameStyle={frameStyle}
                frameText={frameText}
                frameTitle={frameTitle}
                frameColor={frameColor}
                frameTextColor={frameTextColor}
              />
            ) : (
              <div className="empty-qr">
                <span>▦</span>
                <p>
                  Your QR preview<br />
                  will appear here
                </p>
              </div>
            )}
          </div>

          {/* Customizer Sub-tabs */}
          <div className="customizer-tabs">
            <button
              type="button"
              className={`tab-btn ${activeTab === "frames" ? "active" : ""}`}
              onClick={() => setActiveTab("frames")}
            >
              🖼️ Frames & Presets
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === "patterns" ? "active" : ""}`}
              onClick={() => setActiveTab("patterns")}
            >
              🎨 Patterns & Eyes
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === "colors" ? "active" : ""}`}
              onClick={() => setActiveTab("colors")}
            >
              🎛️ Colors & Logo
            </button>
          </div>

          {/* Tab Content */}
          <div className="customizer-tab-body">
            {activeTab === "frames" && (
              <FrameControls
                frameStyle={frameStyle}
                setFrameStyle={setFrameStyle}
                frameText={frameText}
                setFrameText={setFrameText}
                frameTitle={frameTitle}
                setFrameTitle={setFrameTitle}
                frameColor={frameColor}
                setFrameColor={setFrameColor}
                frameTextColor={frameTextColor}
                setFrameTextColor={setFrameTextColor}
                applyPreset={applyPreset}
              />
            )}

            {activeTab === "patterns" && (
              <PatternControls
                pattern={pattern}
                setPattern={setPattern}
                eyeOuter={eyeOuter}
                setEyeOuter={setEyeOuter}
                eyeInner={eyeInner}
                setEyeInner={setEyeInner}
                customEyeColor={customEyeColor}
                setCustomEyeColor={setCustomEyeColor}
                eyeOuterColor={eyeOuterColor}
                setEyeOuterColor={setEyeOuterColor}
                eyeInnerColor={eyeInnerColor}
                setEyeInnerColor={setEyeInnerColor}
                useGradient={useGradient}
                setUseGradient={setUseGradient}
                gradientEnd={gradientEnd}
                setGradientEnd={setGradientEnd}
                foreground={foreground}
              />
            )}

            {activeTab === "colors" && (
              <div className="customizer-section">
                <div className="style-controls">
                  <label className="color-field">
                    <span>Ink</span>
                    <input
                      type="color"
                      value={foreground}
                      onChange={(e) => setForeground(e.target.value)}
                    />
                  </label>

                  <label className="color-field">
                    <span>Paper</span>
                    <input
                      type="color"
                      value={background}
                      onChange={(e) => setBackground(e.target.value)}
                    />
                  </label>

                  <label className="size-control">
                    <span>Size</span>
                    <input
                      type="range"
                      min="180"
                      max="320"
                      value={size}
                      onChange={(e) => setSize(Number(e.target.value))}
                    />
                  </label>
                </div>

                <div className="logo-controls">
                  <label className="upload-button">
                    {logo ? "Change center image" : "Add center image"}
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/svg+xml"
                      onChange={handleLogoUpload}
                    />
                  </label>
                  {logo && (
                    <button
                      className="remove-logo"
                      type="button"
                      onClick={() => setLogo("")}
                    >
                      Remove image
                    </button>
                  )}
                  <label className="transparent-toggle">
                    <input
                      type="checkbox"
                      checked={transparent}
                      onChange={(e) => setTransparent(e.target.checked)}
                    />{" "}
                    Transparent QR
                  </label>
                </div>

                {logo && (
                  <div className="logo-adjustments margin-top">
                    <div className="logo-slider-group">
                      <label className="size-control">
                        <span>Logo Image Size ({logoSizePercent}%)</span>
                        <input
                          type="range"
                          min="12"
                          max="34"
                          step="1"
                          value={logoSizePercent}
                          onChange={(e) => setLogoSizePercent(Number(e.target.value))}
                        />
                      </label>
                    </div>

                    <div className="logo-rotation-group margin-top">
                      <div className="rotation-controls">
                        <label className="size-control">
                          <span>Logo Rotation ({logoRotation}°)</span>
                          <input
                            type="range"
                            min="0"
                            max="360"
                            step="5"
                            value={logoRotation}
                            onChange={(e) => setLogoRotation(Number(e.target.value))}
                          />
                        </label>
                        <div className="rotation-actions">
                          <button
                            type="button"
                            className="rotate-btn"
                            onClick={() => setLogoRotation((prev) => (prev + 90) % 360)}
                          >
                            🔄 Rotate 90°
                          </button>
                          {logoRotation !== 0 && (
                            <button
                              type="button"
                              className="rotate-reset-btn"
                              onClick={() => setLogoRotation(0)}
                            >
                              Reset
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Download Action */}
          <button className="download-button" disabled={!value} onClick={download}>
            Download PNG <span>↓</span>
          </button>
          <p className="safe-note">High contrast recommended for reliable scanning.</p>
        </section>
      </section>

      {/* Comprehensive SEO Content & FAQ Sections */}
      <section className="seo-container">
        {/* Features Showcase */}
        <section className="seo-section" id="features">
          <div className="seo-header">
            <span className="seo-badge">WHY QRAFT</span>
            <h2>Complete Control Over Your QR Code Design</h2>
            <p className="seo-subtitle">
              Everything you need to create professional, scannable, and beautifully branded QR codes.
            </p>
          </div>
          <div className="seo-grid">
            <div className="seo-card">
              <span className="card-icon">🖼️</span>
              <h3>Custom Frames & Call-To-Action Badges</h3>
              <p>
                Add check-in badges, &quot;Scan Me&quot; frames, and customizable call-to-action text to increase scan rates by up to 80%.
              </p>
            </div>
            <div className="seo-card">
              <span className="card-icon">🎨</span>
              <h3>Custom Colors & Radial Gradients</h3>
              <p>
                Match your exact brand palette with custom foreground and background colors, or apply vibrant gradient fills.
              </p>
            </div>
            <div className="seo-card">
              <span className="card-icon">✨</span>
              <h3>Logo & Image Center Overlay</h3>
              <p>
                Embed your company logo, app icon, or custom image directly in the middle of your QR matrix automatically centered.
              </p>
            </div>
            <div className="seo-card">
              <span className="card-icon">🔒</span>
              <h3>100% Private & Browser-Based</h3>
              <p>
                Your links, passwords, and contact cards are rendered client-side. No data is stored or logged on external servers.
              </p>
            </div>
            <div className="seo-card">
              <span className="card-icon">👁️</span>
              <h3>Custom Eye Patterns & Shapes</h3>
              <p>
                Tailor the corner finder eyes and body dot patterns (dots, rounded squares, classic matrix) for unique visual contrast.
              </p>
            </div>
            <div className="seo-card">
              <span className="card-icon">⚡</span>
              <h3>Instant High-Resolution Export</h3>
              <p>
                Export crisp PNG files formatted for high-DPI screens, printed banners, business cards, menu stands, and signage.
              </p>
            </div>
          </div>
        </section>

        {/* Supported QR Formats */}
        <section className="seo-section" id="formats">
          <div className="seo-header">
            <span className="seo-badge">VERSATILE DATA FORMATS</span>
            <h2>9 Specialized QR Code Types</h2>
            <p className="seo-subtitle">
              Generate static QR codes tailored to your specific business or personal use case.
            </p>
          </div>
          <div className="formats-grid">
            <div className="format-box">
              <h4>🌐 Website & URL</h4>
              <p>Direct users to any web page, landing page, portfolio, or online store link.</p>
            </div>
            <div className="format-box">
              <h4>📶 Wi-Fi Access</h4>
              <p>Allow guests to instantly join your Wi-Fi network without typing passwords.</p>
            </div>
            <div className="format-box">
              <h4>📇 vCard Digital Contact</h4>
              <p>Share your contact details, phone number, email, and company directly to phonebooks.</p>
            </div>
            <div className="format-box">
              <h4>✉️ Email Compose</h4>
              <p>Pre-fill recipient email addresses, subject lines, and body text for quick feedback.</p>
            </div>
            <div className="format-box">
              <h4>📞 Phone Dial</h4>
              <p>Enable one-tap phone calls directly to your support line or sales hotline.</p>
            </div>
            <div className="format-box">
              <h4>💬 SMS Message</h4>
              <p>Pre-fill SMS text messages for quick opt-in subscriptions or customer check-ins.</p>
            </div>
            <div className="format-box">
              <h4>📍 Maps & Location</h4>
              <p>Direct customers to your store address, restaurant location, or GPS coordinates.</p>
            </div>
            <div className="format-box">
              <h4>📅 Calendar Event</h4>
              <p>Prompt users to save webinars, meetups, or appointments directly to their calendar.</p>
            </div>
            <div className="format-box">
              <h4>📝 Plain Text</h4>
              <p>Encode plain text notes, serial numbers, cryptographic keys, or promo codes.</p>
            </div>
          </div>
        </section>

        {/* How It Works Guide */}
        <section className="seo-section" id="how-it-works">
          <div className="seo-header">
            <span className="seo-badge">EASY 3-STEP PROCESS</span>
            <h2>How to Make a Custom QR Code</h2>
          </div>
          <div className="steps-container">
            <div className="step-card">
              <span className="step-num">01</span>
              <h3>Choose Format & Enter Data</h3>
              <p>Select your desired format (Website, Wi-Fi, vCard) and enter your details into the field generator.</p>
            </div>
            <div className="step-card">
              <span className="step-num">02</span>
              <h3>Customize Design & Add Logo</h3>
              <p>Pick a frame style, adjust eye patterns, pick brand colors, and upload your center logo.</p>
            </div>
            <div className="step-card">
              <span className="step-num">03</span>
              <h3>Preview & Download PNG</h3>
              <p>Test your QR preview live on-screen, then download the high-resolution file for print or digital use.</p>
            </div>
          </div>
        </section>

        {/* SEO FAQ Grid */}
        <section className="seo-section" id="faq">
          <div className="seo-header">
            <span className="seo-badge">FREQUENTLY ASKED QUESTIONS</span>
            <h2>Common Questions About qraft QR Code Studio</h2>
          </div>
          <div className="faq-grid">
            <div className="faq-card">
              <h3>Is qraft QR code generator 100% free?</h3>
              <p>
                Yes! qraft is completely free to use without any hidden fees, subscriptions, or scan limits. You can generate as many QR codes as you need.
              </p>
            </div>
            <div className="faq-card">
              <h3>Do QR codes created on qraft ever expire?</h3>
              <p>
                No. All static QR codes created on qraft are permanent. The data is hardcoded into the QR pattern itself, so it will continue working forever without relying on external redirect servers.
              </p>
            </div>
            <div className="faq-card">
              <h3>Is my personal data or Wi-Fi password secure?</h3>
              <p>
                Absolutely. qraft runs entirely client-side inside your web browser. None of your entered details, passwords, or uploaded logos are sent to any remote server.
              </p>
            </div>
            <div className="faq-card">
              <h3>What image formats are recommended for logos?</h3>
              <p>
                We support PNG, SVG, WEBP, and JPEG formats. High-contrast square images or transparent PNG icons yield the cleanest look in the center of your QR code.
              </p>
            </div>
            <div className="faq-card">
              <h3>How do I ensure my custom QR code scans reliably?</h3>
              <p>
                Always maintain high contrast between the ink color and paper background. Avoid dark backgrounds with dark inks, and ensure your logo doesn&apos;t obscure the corner finder eyes.
              </p>
            </div>
          </div>
        </section>
      </section>

      <footer>
        <span>qraft studio</span>
        <span>Private by design · Nothing leaves your browser</span>
      </footer>
    </main>
  );
}
