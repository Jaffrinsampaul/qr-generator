"use client";

import { useMemo, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

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
  return <label className="field"><span>{label}</span><Tag type={type} value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} rows={multiline ? 4 : undefined} /></label>;
}

export default function Home() {
  const [active, setActive] = useState("url");
  const [data, setData] = useState(defaults);
  const [foreground, setForeground] = useState("#17213b");
  const [background, setBackground] = useState("#ffffff");
  const [size, setSize] = useState(280);
  const [transparent, setTransparent] = useState(false);
  const [logo, setLogo] = useState("");
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

  function download() {
    const canvas = canvasRef.current?.querySelector("canvas");
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `qr-${active}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return <main className="app-shell">
    <header className="topbar"><div className="brand"><span className="brand-mark">▦</span><span>qraft</span></div><div className="topbar-actions"><span className="status-dot" /> Ready to create <button className="ghost-button" onClick={() => { setData(defaults); setActive("url"); }}>Start over</button></div></header>
    <section className="hero"><div><p className="eyebrow">QR CODE STUDIO</p><h1>Make a QR code<br /><em>that connects.</em></h1><p className="hero-copy">Choose a format, add your details, and export a polished QR code in seconds.</p></div><div className="hero-orbit"><span>9 formats</span><span>∞ possibilities</span></div></section>
    <section className="workspace">
      <aside className="type-panel"><div className="panel-heading"><span className="step">01</span><div><h2>Choose a format</h2><p>What should your QR code do?</p></div></div><div className="type-grid">{TYPES.map((item) => <button key={item.id} className={`type-card ${active === item.id ? "active" : ""}`} onClick={() => setActive(item.id)}><span className="type-icon">{item.icon}</span><span><strong>{item.label}</strong><small>{item.hint}</small></span>{active === item.id && <b>●</b>}</button>)}</div></aside>
      <section className="editor-panel"><div className="panel-heading"><span className="step">02</span><div><h2>Add your details</h2><p>Your information stays in your browser.</p></div></div><div className="fields">
        {active === "url" && <Field label="Website URL" value={current.value} onChange={(v) => update("value", v)} placeholder="https://yourwebsite.com" type="url" />}
        {active === "text" && <Field label="Your message" value={current.value} onChange={(v) => update("value", v)} placeholder="Type anything you want to share..." multiline />}
        {active === "wifi" && <><Field label="Network name (SSID)" value={current.ssid} onChange={(v) => update("ssid", v)} placeholder="My Wi-Fi" /><div className="field-row"><Field label="Password" value={current.password} onChange={(v) => update("password", v)} placeholder="••••••••" type="password" /><label className="field"><span>Security</span><select value={current.security} onChange={(e) => update("security", e.target.value)}><option>WPA</option><option>WEP</option><option>nopass</option></select></label></div></>}
        {active === "email" && <><Field label="Email address" value={current.address} onChange={(v) => update("address", v)} placeholder="hello@example.com" type="email" /><Field label="Subject" value={current.subject} onChange={(v) => update("subject", v)} placeholder="Let's connect" /><Field label="Message" value={current.body} onChange={(v) => update("body", v)} placeholder="Write a message..." multiline /></>}
        {active === "phone" && <Field label="Phone number" value={current.number} onChange={(v) => update("number", v)} placeholder="+1 555 123 4567" type="tel" />}
        {active === "sms" && <><Field label="Phone number" value={current.number} onChange={(v) => update("number", v)} placeholder="+1 555 123 4567" type="tel" /><Field label="Message" value={current.message} onChange={(v) => update("message", v)} placeholder="Your message..." multiline /></>}
        {active === "vcard" && <><Field label="Full name" value={current.name} onChange={(v) => update("name", v)} placeholder="Alex Morgan" /><div className="field-row"><Field label="Phone" value={current.phone} onChange={(v) => update("phone", v)} placeholder="+1 555 123 4567" /><Field label="Email" value={current.email} onChange={(v) => update("email", v)} placeholder="alex@example.com" /></div><Field label="Company" value={current.company} onChange={(v) => update("company", v)} placeholder="Acme Studio" /></>}
        {active === "location" && <><Field label="Google Maps link" value={current.mapUrl} onChange={(v) => update("mapUrl", v)} placeholder="Paste a Google Maps URL" type="url" /><p className="field-help">Open Google Maps, choose a place, tap Share, then paste the link here.</p><div className="field-row"><Field label="Latitude (optional)" value={current.latitude} onChange={(v) => update("latitude", v)} placeholder="40.7128" /><Field label="Longitude (optional)" value={current.longitude} onChange={(v) => update("longitude", v)} placeholder="-74.0060" /></div><Field label="Place name" value={current.label} onChange={(v) => update("label", v)} placeholder="New York City" /></>}
        {active === "event" && <><Field label="Event title" value={current.title} onChange={(v) => update("title", v)} placeholder="Team dinner" /><Field label="Location" value={current.location} onChange={(v) => update("location", v)} placeholder="The Studio" /><div className="field-row"><Field label="Starts" value={current.start} onChange={(v) => update("start", v)} type="datetime-local" /><Field label="Ends" value={current.end} onChange={(v) => update("end", v)} type="datetime-local" /></div></>}
      </div></section>
      <section className="preview-panel"><div className="panel-heading"><span className="step">03</span><div><h2>Make it yours</h2><p>Style and download your code.</p></div></div><div className="qr-stage" ref={canvasRef}>{value ? <QRCodeCanvas value={value} size={size} bgColor={transparent ? "#00000000" : background} fgColor={foreground} level="H" includeMargin imageSettings={logo ? { src: logo, height: size * 0.2, width: size * 0.2, excavate: true } : undefined} /> : <div className="empty-qr"><span>▦</span><p>Your QR preview<br />will appear here</p></div>}</div><div className="style-controls"><label>Ink <input type="color" value={foreground} onChange={(e) => setForeground(e.target.value)} /></label><label>Paper <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} /></label><label className="size-control">Size <input type="range" min="180" max="320" value={size} onChange={(e) => setSize(Number(e.target.value))} /></label></div><div className="logo-controls"><label className="upload-button">{logo ? "Change center image" : "Add center image"}<input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" onChange={handleLogoUpload} /></label>{logo && <button className="remove-logo" type="button" onClick={() => setLogo("")}>Remove image</button>}<label className="transparent-toggle"><input type="checkbox" checked={transparent} onChange={(e) => setTransparent(e.target.checked)} /> Transparent QR</label></div><button className="download-button" disabled={!value} onClick={download}>Download PNG <span>↓</span></button><p className="safe-note">High contrast recommended for reliable scanning.</p></section>
    </section>
    <footer><span>qraft studio</span><span>Private by design · Nothing leaves your browser</span></footer>
  </main>;
}
