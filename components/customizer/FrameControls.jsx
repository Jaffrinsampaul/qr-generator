"use client";

import React from "react";

export const FRAME_PRESETS = [
  {
    id: "hotel-checkin",
    label: "🏨 Hotel Check-In",
    frameStyle: "checkin",
    frameTitle: "ONLINE CHECK-IN",
    frameText: "SCAN TO CHECK IN",
    frameColor: "#4f46e5",
    frameTextColor: "#ffffff",
    pattern: "dots",
    eyeOuter: "rounded",
    eyeInner: "circle",
  },
  {
    id: "event-pass",
    label: "🎟️ Event Pass",
    frameStyle: "ticket",
    frameTitle: "EVENT PASS",
    frameText: "SCAN TO ENTER PASS",
    frameColor: "#e11d48",
    frameTextColor: "#ffffff",
    pattern: "rounded",
    eyeOuter: "square",
    eyeInner: "square",
  },
  {
    id: "travel-checkin",
    label: "✈️ Travel Check-In",
    frameStyle: "checkin",
    frameTitle: "AIRPORT CHECK-IN",
    frameText: "BOARDING CHECK-IN",
    frameColor: "#0284c7",
    frameTextColor: "#ffffff",
    pattern: "classy",
    eyeOuter: "circle",
    eyeInner: "circle",
  },
  {
    id: "mobile-scan",
    label: "📲 Mobile App Scan",
    frameStyle: "phone",
    frameTitle: "MOBILE SCAN",
    frameText: "SCAN WITH CAMERA",
    frameColor: "#10b981",
    frameTextColor: "#ffffff",
    pattern: "dots",
    eyeOuter: "rounded",
    eyeInner: "circle",
  },
  {
    id: "wifi-access",
    label: "📶 Wi-Fi Access",
    frameStyle: "bottom-badge",
    frameTitle: "WI-FI CONNECT",
    frameText: "SCAN TO JOIN WI-FI",
    frameColor: "#059669",
    frameTextColor: "#ffffff",
    pattern: "rounded",
    eyeOuter: "square",
    eyeInner: "rounded",
  },
  {
    id: "cafe-menu",
    label: "☕ Cafe Menu",
    frameStyle: "top-bottom-card",
    frameTitle: "MENU & ORDER",
    frameText: "SCAN TO VIEW MENU",
    frameColor: "#d97706",
    frameTextColor: "#ffffff",
    pattern: "square",
    eyeOuter: "square",
    eyeInner: "square",
  },
];

export const FRAME_STYLES = [
  { id: "none", label: "No Frame", icon: "🔳" },
  { id: "checkin", label: "Online Check-In", icon: "🏷️", tag: "POPULAR" },
  { id: "phone", label: "Smartphone", icon: "📱" },
  { id: "bottom-badge", label: "Bottom Badge", icon: "🔖" },
  { id: "top-bottom-card", label: "Polaroid Card", icon: "🖼️" },
  { id: "ticket", label: "Event Pass Ticket", icon: "🎟️" },
  { id: "circle-ring", label: "Circular Ring", icon: "⭕" },
  { id: "sleek-neon", label: "Modern Neon", icon: "⚡" },
  { id: "retro-corners", label: "Vintage Corners", icon: "⚜️" },
];

export default function FrameControls({
  frameStyle,
  setFrameStyle,
  frameText,
  setFrameText,
  frameTitle,
  setFrameTitle,
  frameColor,
  setFrameColor,
  frameTextColor,
  setFrameTextColor,
  applyPreset,
}) {
  return (
    <div className="customizer-section">
      <div className="preset-bar">
        <span className="preset-label">Quick Presets:</span>
        <div className="preset-pills">
          {FRAME_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className="preset-pill-btn"
              onClick={() => applyPreset(preset)}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control-group">
        <label className="control-label">Choose Frame Style</label>
        <div className="frame-grid">
          {FRAME_STYLES.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`frame-card ${frameStyle === item.id ? "active" : ""}`}
              onClick={() => setFrameStyle(item.id)}
            >
              <span className="frame-card-icon">{item.icon}</span>
              <span className="frame-card-name">{item.label}</span>
              {item.tag && <span className="frame-card-tag">{item.tag}</span>}
            </button>
          ))}
        </div>
      </div>

      {frameStyle !== "none" && (
        <div className="frame-inputs">
          {(frameStyle === "checkin" || frameStyle === "top-bottom-card" || frameStyle === "ticket") && (
            <div className="field">
              <span>Header / Title Text</span>
              <input
                type="text"
                value={frameTitle}
                onChange={(e) => setFrameTitle(e.target.value)}
                placeholder="e.g. ONLINE CHECK-IN"
              />
            </div>
          )}

          <div className="field">
            <span>Call To Action (CTA) Text</span>
            <input
              type="text"
              value={frameText}
              onChange={(e) => setFrameText(e.target.value)}
              placeholder="e.g. SCAN TO CHECK IN"
            />
          </div>

          <div className="field-row">
            <label className="color-field">
              <span>Frame Accent Color</span>
              <div className="color-picker-wrap">
                <input
                  type="color"
                  value={frameColor}
                  onChange={(e) => setFrameColor(e.target.value)}
                />
                <code>{frameColor}</code>
              </div>
            </label>

            <label className="color-field">
              <span>Text / Icon Color</span>
              <div className="color-picker-wrap">
                <input
                  type="color"
                  value={frameTextColor}
                  onChange={(e) => setFrameTextColor(e.target.value)}
                />
                <code>{frameTextColor}</code>
              </div>
            </label>
          </div>
        </div>
      )}
    </div>
  );
}
