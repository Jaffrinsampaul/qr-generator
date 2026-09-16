/**
 * Utility for calculating color contrast ratios and scannability scores based on WCAG 2.1 specifications.
 */

function getLuminance(hexColor) {
  if (!hexColor || typeof hexColor !== "string") return 0;
  let color = hexColor.replace("#", "");
  if (color.length === 3) {
    color = color.split("").map((c) => c + c).join("");
  }
  if (color.length !== 6) return 0;
  
  const num = parseInt(color, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;

  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

export function calculateContrastRatio(fgHex, bgHex) {
  try {
    const l1 = getLuminance(fgHex);
    const l2 = getLuminance(bgHex);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    const ratio = (lighter + 0.05) / (darker + 0.05);
    return parseFloat(ratio.toFixed(2));
  } catch (err) {
    return 21.0;
  }
}

export function getScannabilityStatus(fgHex, bgHex, transparent = false) {
  if (transparent) {
    return {
      status: "info",
      badge: "ℹ️ Transparent Background",
      message: "Ensure you place this QR code on a high-contrast background when printing or embedding.",
      ratio: null,
    };
  }

  const ratio = calculateContrastRatio(fgHex, bgHex);
  if (ratio >= 4.5) {
    return {
      status: "optimal",
      badge: "✓ Optimal Contrast",
      message: `Excellent color contrast (${ratio}:1). Scans reliably across all cameras & light conditions.`,
      ratio,
    };
  } else if (ratio >= 3.0) {
    return {
      status: "good",
      badge: "✓ Good Contrast",
      message: `Moderate contrast (${ratio}:1). Scannable under standard lighting conditions.`,
      ratio,
    };
  } else {
    return {
      status: "warning",
      badge: "⚠️ Low Contrast Warning",
      message: `Low contrast ratio (${ratio}:1). Increase ink/paper contrast so phone cameras can scan.`,
      ratio,
    };
  }
}
