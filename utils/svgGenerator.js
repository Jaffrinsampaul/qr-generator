import { generateQRMatrix, isFinderPattern } from "./qrcodegen";

/**
 * Generates pure vector SVG XML string representing the custom QR code.
 */
export function generateSVGString({
  value = "https://example.com",
  size = 280,
  foreground = "#17213b",
  background = "#ffffff",
  transparent = false,
  logo = "",
  logoSizePercent = 22,
  logoRotation = 0,
  pattern = "square",
  eyeOuter = "square",
  eyeInner = "square",
  customEyeColor = false,
  eyeOuterColor = "#17213b",
  eyeInnerColor = "#17213b",
  useGradient = false,
  gradientEnd = "#f06f62",
  frameStyle = "none",
  frameText = "SCAN TO CHECK IN",
  frameTitle = "ONLINE CHECK-IN",
  frameColor = "#f06f62",
  frameTextColor = "#ffffff",
}) {
  const qrData = generateQRMatrix(value, "H");
  if (!qrData) return "";

  const matrixSize = qrData.size;
  const modules = qrData.modules;

  let frameWidth = size;
  let frameHeight = size;
  let qrPadding = 20;
  let qrX = qrPadding;
  let qrY = qrPadding;

  if (frameStyle === "checkin") {
    frameWidth = size + 40;
    frameHeight = size + 110;
    qrX = 20;
    qrY = 65;
  } else if (frameStyle === "phone") {
    frameWidth = size + 48;
    frameHeight = size + 115;
    qrX = 24;
    qrY = 55;
  } else if (frameStyle === "bottom-badge") {
    frameWidth = size + 36;
    frameHeight = size + 72;
    qrX = 18;
    qrY = 18;
  } else if (frameStyle === "top-bottom-card") {
    frameWidth = size + 40;
    frameHeight = size + 100;
    qrX = 20;
    qrY = 52;
  } else if (frameStyle === "ticket") {
    frameWidth = size + 48;
    frameHeight = size + 110;
    qrX = 24;
    qrY = 55;
  } else if (frameStyle === "circle-ring") {
    frameWidth = size + 60;
    frameHeight = size + 80;
    qrX = 30;
    qrY = 40;
  } else if (frameStyle === "sleek-neon") {
    frameWidth = size + 40;
    frameHeight = size + 76;
    qrX = 20;
    qrY = 20;
  } else if (frameStyle === "retro-corners") {
    frameWidth = size + 44;
    frameHeight = size + 74;
    qrX = 22;
    qrY = 22;
  } else {
    frameWidth = size + 30;
    frameHeight = size + 30;
    qrX = 15;
    qrY = 15;
  }

  const tileSize = size / matrixSize;
  const fill = useGradient ? "url(#qr-grad)" : foreground;
  const eyeOuterFill = customEyeColor ? eyeOuterColor : fill;
  const eyeInnerFill = customEyeColor ? eyeInnerColor : fill;

  let svgElements = [];

  // Gradient Definition
  let defs = "";
  if (useGradient) {
    defs = `
    <defs>
      <linearGradient id="qr-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${foreground}" />
        <stop offset="100%" stop-color="${gradientEnd}" />
      </linearGradient>
    </defs>`;
  }

  // Frame Background & Structure
  if (frameStyle === "checkin") {
    svgElements.push(`<rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" rx="22" ry="22" fill="#ffffff" />`);
    svgElements.push(`<path d="M 0,22 A 22 22 0 0 1 22,0 L ${frameWidth - 22},0 A 22 22 0 0 1 ${frameWidth},22 L ${frameWidth},48 L 0,48 Z" fill="${frameColor}" />`);
    svgElements.push(`<text x="${frameWidth / 2}" y="28" fill="${frameTextColor}" font-family="system-ui, sans-serif" font-weight="bold" font-size="13" text-anchor="middle">🏷️  ${(frameTitle || "ONLINE CHECK-IN").toUpperCase()}</text>`);
    svgElements.push(`<rect x="${qrX - 6}" y="${qrY - 6}" width="${size + 12}" height="${size + 12}" rx="16" ry="16" fill="${transparent ? "#ffffff" : background}" stroke="#e3e7ef" stroke-width="1" />`);
    const ctaY = qrY + size + 12;
    svgElements.push(`<rect x="16" y="${ctaY}" width="${frameWidth - 32}" height="34" rx="17" ry="17" fill="${frameColor}" />`);
    svgElements.push(`<text x="${frameWidth / 2}" y="${ctaY + 21}" fill="${frameTextColor}" font-family="system-ui, sans-serif" font-weight="bold" font-size="12" text-anchor="middle">${frameText || "SCAN TO CHECK IN"}  →</text>`);
  } else if (frameStyle === "phone") {
    svgElements.push(`<rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" rx="32" ry="32" fill="#1e293b" stroke="${frameColor}" stroke-width="2" />`);
    svgElements.push(`<rect x="${frameWidth / 2 - 24}" y="12" width="48" height="8" rx="4" ry="4" fill="#0f172a" />`);
    svgElements.push(`<rect x="12" y="32" width="${frameWidth - 24}" height="${frameHeight - 52}" rx="20" ry="20" fill="${transparent ? "#ffffff" : background}" />`);
    svgElements.push(`<rect x="${frameWidth / 2 - 30}" y="${frameHeight - 14}" width="60" height="4" rx="2" ry="2" fill="#64748b" />`);
    if (frameText) {
      const tagY = qrY + size + 10;
      svgElements.push(`<rect x="${frameWidth / 2 - 65}" y="${tagY}" width="130" height="24" rx="12" ry="12" fill="${frameColor}" />`);
      svgElements.push(`<text x="${frameWidth / 2}" y="${tagY + 16}" fill="${frameTextColor}" font-family="system-ui, sans-serif" font-weight="bold" font-size="10" text-anchor="middle">${frameText}</text>`);
    }
  } else if (frameStyle === "bottom-badge") {
    svgElements.push(`<rect x="0" y="0" width="${frameWidth}" height="${frameHeight - 16}" rx="20" ry="20" fill="${transparent ? "none" : background}" stroke="${frameColor}" stroke-width="2" />`);
    const badgeY = frameHeight - 34;
    svgElements.push(`<rect x="${frameWidth / 2 - 75}" y="${badgeY}" width="150" height="32" rx="16" ry="16" fill="${frameColor}" />`);
    svgElements.push(`<text x="${frameWidth / 2}" y="${badgeY + 21}" fill="${frameTextColor}" font-family="system-ui, sans-serif" font-weight="bold" font-size="12" text-anchor="middle">✨ ${frameText || "SCAN ME"}</text>`);
  } else {
    // Default background rect
    if (!transparent) {
      svgElements.push(`<rect x="0" y="0" width="${frameWidth}" height="${frameHeight}" rx="16" ry="16" fill="${background}" stroke="#e2e8f0" stroke-width="1" />`);
    }
  }

  // QR Matrix Modules
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (isFinderPattern(c, r, matrixSize)) continue;
      if (!modules[r][c]) continue;

      const x = qrX + c * tileSize;
      const y = qrY + r * tileSize;
      const cx = x + tileSize / 2;
      const cy = y + tileSize / 2;

      if (pattern === "dots" || pattern === "circle") {
        svgElements.push(`<circle cx="${cx}" cy="${cy}" r="${tileSize * 0.425}" fill="${fill}" />`);
      } else if (pattern === "rounded") {
        svgElements.push(`<rect x="${x}" y="${y}" width="${tileSize}" height="${tileSize}" rx="${tileSize * 0.35}" ry="${tileSize * 0.35}" fill="${fill}" />`);
      } else if (pattern === "diamond") {
        svgElements.push(`<polygon points="${cx},${y} ${x + tileSize},${cy} ${cx},${y + tileSize} ${x},${cy}" fill="${fill}" />`);
      } else if (pattern === "star") {
        let pts = [];
        const rOuter = tileSize * 0.5;
        const rInner = tileSize * 0.2;
        for (let i = 0; i < 8; i++) {
          const rad = (i * Math.PI) / 4;
          const radius = i % 2 === 0 ? rOuter : rInner;
          pts.push(`${cx + Math.cos(rad) * radius},${cy + Math.sin(rad) * radius}`);
        }
        svgElements.push(`<polygon points="${pts.join(" ")}" fill="${fill}" />`);
      } else {
        svgElements.push(`<rect x="${x}" y="${y}" width="${tileSize}" height="${tileSize}" fill="${fill}" />`);
      }
    }
  }

  // Helper for Finder Eyes
  const drawEyeSVG = (cornerX, cornerY) => {
    const eyeX = qrX + cornerX * tileSize;
    const eyeY = qrY + cornerY * tileSize;
    const outerW = 7 * tileSize;
    const innerW = 3 * tileSize;
    const innerOffset = 2 * tileSize;

    // Outer Frame (7x7 minus 5x5 center)
    if (eyeOuter === "circle") {
      svgElements.push(`<path d="M ${eyeX + outerW/2},${eyeY} A ${outerW/2} ${outerW/2} 0 1 0 ${eyeX + outerW/2},${eyeY + outerW} A ${outerW/2} ${outerW/2} 0 1 0 ${eyeX + outerW/2},${eyeY} Z M ${eyeX + outerW/2},${eyeY + tileSize} A ${5*tileSize/2} ${5*tileSize/2} 0 1 1 ${eyeX + outerW/2},${eyeY + 6*tileSize} A ${5*tileSize/2} ${5*tileSize/2} 0 1 1 ${eyeX + outerW/2},${eyeY + tileSize} Z" fill="${eyeOuterFill}" fill-rule="evenodd" />`);
    } else if (eyeOuter === "rounded") {
      svgElements.push(`<rect x="${eyeX}" y="${eyeY}" width="${outerW}" height="${outerW}" rx="${outerW * 0.25}" ry="${outerW * 0.25}" fill="${eyeOuterFill}" />`);
      svgElements.push(`<rect x="${eyeX + tileSize}" y="${eyeY + tileSize}" width="${5 * tileSize}" height="${5 * tileSize}" rx="${5 * tileSize * 0.2}" ry="${5 * tileSize * 0.2}" fill="${transparent ? "#ffffff" : background}" />`);
    } else {
      svgElements.push(`<rect x="${eyeX}" y="${eyeY}" width="${outerW}" height="${outerW}" fill="${eyeOuterFill}" />`);
      svgElements.push(`<rect x="${eyeX + tileSize}" y="${eyeY + tileSize}" width="${5 * tileSize}" height="${5 * tileSize}" fill="${transparent ? "#ffffff" : background}" />`);
    }

    // Inner Ball (3x3 center)
    const ballX = eyeX + innerOffset;
    const ballY = eyeY + innerOffset;
    const ballCX = ballX + innerW / 2;
    const ballCY = ballY + innerW / 2;

    if (eyeInner === "circle") {
      svgElements.push(`<circle cx="${ballCX}" cy="${ballCY}" r="${innerW / 2}" fill="${eyeInnerFill}" />`);
    } else if (eyeInner === "rounded") {
      svgElements.push(`<rect x="${ballX}" y="${ballY}" width="${innerW}" height="${innerW}" rx="${innerW * 0.35}" ry="${innerW * 0.35}" fill="${eyeInnerFill}" />`);
    } else if (eyeInner === "diamond") {
      svgElements.push(`<polygon points="${ballCX},${ballY} ${ballX + innerW},${ballCY} ${ballCX},${ballY + innerW} ${ballX},${ballCY}" fill="${eyeInnerFill}" />`);
    } else {
      svgElements.push(`<rect x="${ballX}" y="${ballY}" width="${innerW}" height="${innerW}" fill="${eyeInnerFill}" />`);
    }
  };

  // Draw 3 Corner Eyes
  drawEyeSVG(0, 0);
  drawEyeSVG(matrixSize - 7, 0);
  drawEyeSVG(0, matrixSize - 7);

  // Logo Image Overlay
  if (logo) {
    const logoW = (size * (logoSizePercent / 100));
    const logoH = logoW;
    const logoX = qrX + (size - logoW) / 2;
    const logoY = qrY + (size - logoH) / 2;

    // Background white pad for logo readability
    svgElements.push(`<rect x="${logoX - 4}" y="${logoY - 4}" width="${logoW + 8}" height="${logoH + 8}" rx="8" ry="8" fill="#ffffff" stroke="#e2e8f0" stroke-width="1" />`);
    svgElements.push(`<image href="${logo}" x="${logoX}" y="${logoY}" width="${logoW}" height="${logoH}" preserveAspectRatio="xMidYMid meet" />`);
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${frameWidth}" height="${frameHeight}" viewBox="0 0 ${frameWidth} ${frameHeight}">
    ${defs}
    ${svgElements.join("\n    ")}
  </svg>`;
}
