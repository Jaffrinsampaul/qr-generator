"use client";

import React from "react";

export const PATTERNS = [
  { id: "square", label: "Square", icon: "⬛" },
  { id: "dots", label: "Dots", icon: "🔴" },
  { id: "rounded", label: "Rounded", icon: "⏹️" },
  { id: "classy", label: "Classy", icon: "💧" },
  { id: "diamond", label: "Diamond", icon: "🔷" },
  { id: "star", label: "Star", icon: "⭐" },
  { id: "fluid", label: "Fluid", icon: "🌊" },
];

export const EYE_OUTER = [
  { id: "square", label: "Square Frame", icon: "🔲" },
  { id: "circle", label: "Circle Frame", icon: "⚪" },
  { id: "rounded", label: "Rounded Frame", icon: "▢" },
  { id: "diamond", label: "Diamond Frame", icon: "◇" },
];

export const EYE_INNER = [
  { id: "square", label: "Square Ball", icon: "⬛" },
  { id: "circle", label: "Circle Ball", icon: "⚫" },
  { id: "rounded", label: "Rounded Ball", icon: "◼️" },
  { id: "diamond", label: "Diamond Ball", icon: "♦️" },
];

export default function PatternControls({
  pattern,
  setPattern,
  eyeOuter,
  setEyeOuter,
  eyeInner,
  setEyeInner,
  customEyeColor,
  setCustomEyeColor,
  eyeOuterColor,
  setEyeOuterColor,
  eyeInnerColor,
  setEyeInnerColor,
  useGradient,
  setUseGradient,
  gradientEnd,
  setGradientEnd,
  foreground,
}) {
  return (
    <div className="customizer-section">
      {/* 1. Module Body Patterns */}
      <div className="control-group">
        <label className="control-label">Body Module Pattern</label>
        <div className="pattern-grid">
          {PATTERNS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`pattern-card ${pattern === item.id ? "active" : ""}`}
              onClick={() => setPattern(item.id)}
            >
              <span className="pattern-icon">{item.icon}</span>
              <span className="pattern-name">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Corner Eye Outer Shapes */}
      <div className="control-group">
        <label className="control-label">Corner Eye Outer Shape</label>
        <div className="shape-grid">
          {EYE_OUTER.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`shape-card ${eyeOuter === item.id ? "active" : ""}`}
              onClick={() => setEyeOuter(item.id)}
            >
              <span>{item.icon}</span>
              <small>{item.label}</small>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Corner Eye Inner Ball Shapes */}
      <div className="control-group">
        <label className="control-label">Corner Eye Inner Ball</label>
        <div className="shape-grid">
          {EYE_INNER.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`shape-card ${eyeInner === item.id ? "active" : ""}`}
              onClick={() => setEyeInner(item.id)}
            >
              <span>{item.icon}</span>
              <small>{item.label}</small>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Eye Colors & Gradient options */}
      <div className="control-group border-top">
        <label className="checkbox-toggle">
          <input
            type="checkbox"
            checked={customEyeColor}
            onChange={(e) => setCustomEyeColor(e.target.checked)}
          />
          <span>Customize Corner Eye Colors</span>
        </label>

        {customEyeColor && (
          <div className="field-row margin-top">
            <label className="color-field">
              <span>Outer Eye Frame</span>
              <div className="color-picker-wrap">
                <input
                  type="color"
                  value={eyeOuterColor}
                  onChange={(e) => setEyeOuterColor(e.target.value)}
                />
                <code>{eyeOuterColor}</code>
              </div>
            </label>

            <label className="color-field">
              <span>Inner Eye Ball</span>
              <div className="color-picker-wrap">
                <input
                  type="color"
                  value={eyeInnerColor}
                  onChange={(e) => setEyeInnerColor(e.target.value)}
                />
                <code>{eyeInnerColor}</code>
              </div>
            </label>
          </div>
        )}
      </div>

      <div className="control-group border-top">
        <label className="checkbox-toggle">
          <input
            type="checkbox"
            checked={useGradient}
            onChange={(e) => setUseGradient(e.target.checked)}
          />
          <span>Apply Gradient to QR Ink</span>
        </label>

        {useGradient && (
          <div className="field-row margin-top">
            <label className="color-field">
              <span>Start Color</span>
              <div className="color-picker-wrap">
                <input type="color" value={foreground} disabled readOnly />
                <code>{foreground}</code>
              </div>
            </label>

            <label className="color-field">
              <span>End Gradient Color</span>
              <div className="color-picker-wrap">
                <input
                  type="color"
                  value={gradientEnd}
                  onChange={(e) => setGradientEnd(e.target.value)}
                />
                <code>{gradientEnd}</code>
              </div>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
