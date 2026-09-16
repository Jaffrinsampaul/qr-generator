import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "qrcode master — Free Custom QR Code Generator Studio Preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "60px 80px",
          fontFamily: "system-ui, sans-serif",
          color: "#ffffff",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: "600px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "8px",
                background: "#f06f62",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              ▦
            </div>
            <span style={{ fontSize: "28px", fontWeight: "bold", letterSpacing: "-0.5px" }}>qrcode master</span>
          </div>

          <h1 style={{ fontSize: "44px", fontWeight: "800", lineHeight: 1.15, margin: "0 0 20px 0", color: "#ffffff" }}>
            Create Custom QR Codes with Logos & Frames.
          </h1>

          <p style={{ fontSize: "20px", color: "#94a3b8", margin: "0 0 32px 0", lineHeight: 1.4 }}>
            Design scannable QR codes for Wi-Fi, vCards, URLs & Events. 100% free & private in-browser.
          </p>

          <div style={{ display: "flex", gap: "12px" }}>
            <span
              style={{
                background: "rgba(56, 189, 248, 0.15)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                color: "#38bdf8",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "6px 14px",
                borderRadius: "20px",
              }}
            >
              100% Free
            </span>
            <span
              style={{
                background: "rgba(56, 189, 248, 0.15)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                color: "#38bdf8",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "6px 14px",
                borderRadius: "20px",
              }}
            >
              PNG & SVG Export
            </span>
            <span
              style={{
                background: "rgba(56, 189, 248, 0.15)",
                border: "1px solid rgba(56, 189, 248, 0.3)",
                color: "#38bdf8",
                fontSize: "14px",
                fontWeight: "bold",
                padding: "6px 14px",
                borderRadius: "20px",
              }}
            >
              Zero Server Storage
            </span>
          </div>
        </div>

        <div
          style={{
            width: "340px",
            height: "340px",
            background: "#ffffff",
            borderRadius: "24px",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
            border: "4px solid #f06f62",
          }}
        >
          <div
            style={{
              width: "250px",
              height: "250px",
              background: "#0f172a",
              borderRadius: "16px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#38bdf8",
              fontSize: "100px",
            }}
          >
            ▦
          </div>
          <span style={{ marginTop: "12px", color: "#0f172a", fontWeight: "bold", fontSize: "14px" }}>
            SCAN PREVIEW
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
