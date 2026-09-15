"use client";

import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { generateQRMatrix, isFinderPattern } from "../../utils/qrcodegen";

const QRCanvas = forwardRef(function QRCanvas(
  {
    value = "https://example.com",
    size = 280,
    foreground = "#17213b",
    background = "#ffffff",
    transparent = false,
    logo = "",
    logoSizePercent = 22, // 12% to 35% of matrix size
    logoRotation = 0, // 0 to 360 degrees
    pattern = "square", // square, dots, rounded, classy, diamond, star, fluid
    eyeOuter = "square", // square, circle, rounded, diamond
    eyeInner = "square", // square, circle, diamond, rounded
    customEyeColor = false,
    eyeOuterColor = "#17213b",
    eyeInnerColor = "#17213b",
    useGradient = false,
    gradientEnd = "#f06f62",
    frameStyle = "none", // none, checkin, phone, bottom-badge, top-bottom-card, ticket, circle-ring, sleek-neon, retro-corners
    frameText = "SCAN TO CHECK IN",
    frameTitle = "ONLINE CHECK-IN",
    frameColor = "#f06f62",
    frameTextColor = "#ffffff",
  },
  ref
) {
  const canvasRef = useRef(null);
  const [loadedImg, setLoadedImg] = useState(null);

  // Preload logo image synchronously for canvas rendering
  useEffect(() => {
    if (!logo) {
      setLoadedImg(null);
      return;
    }
    let isMounted = true;
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = logo;
    img.onload = () => {
      if (isMounted) setLoadedImg(img);
    };
    img.onerror = () => {
      if (isMounted) setLoadedImg(null);
    };
    return () => {
      isMounted = false;
    };
  }, [logo]);

  useImperativeHandle(ref, () => ({
    getCanvas: () => canvasRef.current,
    downloadPNG: (filename = `qr-code.png`) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const link = document.createElement("a");
      link.download = filename;
      link.href = canvas.toDataURL("image/png");
      link.click();
    },
  }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const qrData = generateQRMatrix(value, "H");
    if (!qrData) return;

    const matrixSize = qrData.size;
    const modules = qrData.modules;

    // High DPI scaling factor for crisp output
    const dpr = 3;

    // Determine canvas frame layout dimensions
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

    const targetWidth = frameWidth;
    const targetHeight = frameHeight;

    canvas.width = targetWidth * dpr;
    canvas.height = targetHeight * dpr;
    canvas.style.width = `${targetWidth}px`;
    canvas.style.height = `${targetHeight}px`;

    ctx.save();
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, targetWidth, targetHeight);

    // 1. Draw Frame Outer Background
    if (frameStyle === "checkin") {
      drawRoundedRect(ctx, 0, 0, targetWidth, targetHeight, 22, true, false, "#ffffff", "");

      ctx.fillStyle = frameColor;
      ctx.beginPath();
      ctx.roundRect(0, 0, targetWidth, 48, [22, 22, 0, 0]);
      ctx.fill();

      ctx.fillStyle = frameTextColor;
      ctx.font = "bold 13px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`🏷️  ${(frameTitle || "ONLINE CHECK-IN").toUpperCase()}`, targetWidth / 2, 24);

      drawRoundedRect(ctx, qrX - 6, qrY - 6, size + 12, size + 12, 16, true, true, transparent ? "#ffffff" : background, "#e3e7ef");

      const ctaY = qrY + size + 12;
      ctx.fillStyle = frameColor;
      ctx.beginPath();
      ctx.roundRect(16, ctaY, targetWidth - 32, 34, 17);
      ctx.fill();

      ctx.fillStyle = frameTextColor;
      ctx.font = "bold 12px system-ui, sans-serif";
      ctx.fillText(`${frameText || "SCAN TO CHECK IN"}  →`, targetWidth / 2, ctaY + 17);

    } else if (frameStyle === "phone") {
      drawRoundedRect(ctx, 0, 0, targetWidth, targetHeight, 32, true, true, "#1e293b", frameColor);

      ctx.fillStyle = "#0f172a";
      ctx.beginPath();
      ctx.roundRect(targetWidth / 2 - 24, 12, 48, 8, 4);
      ctx.fill();

      drawRoundedRect(ctx, 12, 32, targetWidth - 24, targetHeight - 52, 20, true, false, transparent ? "#ffffff" : background, "");

      ctx.fillStyle = "#64748b";
      ctx.beginPath();
      ctx.roundRect(targetWidth / 2 - 30, targetHeight - 14, 60, 4, 2);
      ctx.fill();

      if (frameText) {
        const tagY = qrY + size + 10;
        ctx.fillStyle = frameColor;
        ctx.beginPath();
        ctx.roundRect(targetWidth / 2 - 65, tagY, 130, 24, 12);
        ctx.fill();

        ctx.fillStyle = frameTextColor;
        ctx.font = "bold 10px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(frameText, targetWidth / 2, tagY + 12);
      }

    } else if (frameStyle === "bottom-badge") {
      drawRoundedRect(ctx, 0, 0, targetWidth, targetHeight - 16, 20, true, true, transparent ? "transparent" : background, frameColor);

      const badgeY = targetHeight - 34;
      ctx.fillStyle = frameColor;
      ctx.beginPath();
      ctx.roundRect(targetWidth / 2 - 75, badgeY, 150, 32, 16);
      ctx.fill();

      ctx.fillStyle = frameTextColor;
      ctx.font = "bold 12px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`✨ ${frameText || "SCAN ME"}`, targetWidth / 2, badgeY + 16);

    } else if (frameStyle === "top-bottom-card") {
      drawRoundedRect(ctx, 0, 0, targetWidth, targetHeight, 18, true, true, "#ffffff", "#e2e8f0");

      ctx.fillStyle = "#1e293b";
      ctx.font = "bold 14px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(frameTitle || "SCAN ME", targetWidth / 2, 26);

      drawRoundedRect(ctx, qrX - 4, qrY - 4, size + 8, size + 8, 12, true, false, transparent ? "#ffffff" : background, "");

      ctx.fillStyle = "#64748b";
      ctx.font = "500 11px system-ui, sans-serif";
      ctx.fillText(frameText || "Point phone camera to scan", targetWidth / 2, qrY + size + 24);

    } else if (frameStyle === "ticket") {
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = frameColor;
      ctx.lineWidth = 3;

      ctx.beginPath();
      const notchR = 12;
      const notchY = 45;

      ctx.moveTo(16, 0);
      ctx.lineTo(targetWidth - 16, 0);
      ctx.quadraticCurveTo(targetWidth, 0, targetWidth, 16);
      ctx.lineTo(targetWidth, notchY - notchR);
      ctx.arc(targetWidth, notchY, notchR, -Math.PI / 2, Math.PI / 2, true);
      ctx.lineTo(targetWidth, targetHeight - 16);
      ctx.quadraticCurveTo(targetWidth, targetHeight, targetWidth - 16, targetHeight);
      ctx.lineTo(16, targetHeight);
      ctx.quadraticCurveTo(0, targetHeight, 0, targetHeight - 16);
      ctx.lineTo(0, notchY + notchR);
      ctx.arc(0, notchY, notchR, Math.PI / 2, -Math.PI / 2, true);
      ctx.lineTo(0, 16);
      ctx.quadraticCurveTo(0, 0, 16, 0);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = frameColor;
      ctx.font = "bold 12px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`🎟️ ${(frameTitle || "EVENT PASS").toUpperCase()}`, targetWidth / 2, 22);

      ctx.setLineDash([5, 4]);
      ctx.strokeStyle = "#cbd5e1";
      ctx.beginPath();
      ctx.moveTo(18, notchY);
      ctx.lineTo(targetWidth - 18, notchY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = "#334155";
      ctx.font = "bold 11px system-ui, sans-serif";
      ctx.fillText(frameText || "SCAN TO ENTER", targetWidth / 2, qrY + size + 22);

    } else if (frameStyle === "circle-ring") {
      const cx = targetWidth / 2;
      const cy = targetHeight / 2;

      ctx.fillStyle = transparent ? "transparent" : background;
      ctx.beginPath();
      ctx.arc(cx, cy, targetWidth / 2 - 2, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = frameColor;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, targetWidth / 2 - 6, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = frameColor;
      ctx.beginPath();
      ctx.roundRect(cx - 60, targetHeight - 30, 120, 24, 12);
      ctx.fill();

      ctx.fillStyle = frameTextColor;
      ctx.font = "bold 10px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(frameText || "SCAN HERE", cx, targetHeight - 18);

    } else if (frameStyle === "sleek-neon") {
      drawRoundedRect(ctx, 0, 0, targetWidth, targetHeight, 22, true, false, "#0f172a", "");

      const gradBorder = ctx.createLinearGradient(0, 0, targetWidth, targetHeight);
      gradBorder.addColorStop(0, frameColor);
      gradBorder.addColorStop(1, "#38bdf8");

      ctx.strokeStyle = gradBorder;
      ctx.lineWidth = 3;
      ctx.strokeRect(3, 3, targetWidth - 6, targetHeight - 6);

      drawRoundedRect(ctx, qrX - 4, qrY - 4, size + 8, size + 8, 14, true, false, background, "");

      const tagY = qrY + size + 12;
      ctx.fillStyle = gradBorder;
      ctx.beginPath();
      ctx.roundRect(targetWidth / 2 - 70, tagY, 140, 26, 13);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 11px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(`⚡ ${frameText || "CONNECT & SCAN"}`, targetWidth / 2, tagY + 13);

    } else if (frameStyle === "retro-corners") {
      drawRoundedRect(ctx, 0, 0, targetWidth, targetHeight, 16, true, false, transparent ? "transparent" : background, "");

      ctx.strokeStyle = frameColor;
      ctx.lineWidth = 4;
      const bracketL = 20;

      ctx.beginPath();
      ctx.moveTo(qrX - 8, qrY - 8 + bracketL);
      ctx.lineTo(qrX - 8, qrY - 8);
      ctx.lineTo(qrX - 8 + bracketL, qrY - 8);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(qrX + size + 8 - bracketL, qrY - 8);
      ctx.lineTo(qrX + size + 8, qrY - 8);
      ctx.lineTo(qrX + size + 8, qrY - 8 + bracketL);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(qrX - 8, qrY + size + 8 - bracketL);
      ctx.lineTo(qrX - 8, qrY + size + 8);
      ctx.lineTo(qrX - 8 + bracketL, qrY + size + 8);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(qrX + size + 8 - bracketL, qrY + size + 8);
      ctx.lineTo(qrX + size + 8, qrY + size + 8);
      ctx.lineTo(qrX + size + 8, qrY + size + 8 - bracketL);
      ctx.stroke();

      ctx.fillStyle = frameColor;
      ctx.font = "bold 12px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(frameText || "SCAN CODE", targetWidth / 2, qrY + size + 28);

    } else {
      if (!transparent) {
        drawRoundedRect(ctx, 0, 0, targetWidth, targetHeight, 16, true, false, background, "");
      }
    }

    // 2. Prepare QR Matrix Drawing
    const tileSize = size / matrixSize;

    let fillInk = foreground;
    if (useGradient) {
      const grad = ctx.createLinearGradient(qrX, qrY, qrX + size, qrY + size);
      grad.addColorStop(0, foreground);
      grad.addColorStop(1, gradientEnd || "#f06f62");
      fillInk = grad;
    }

    const outerEyeColor = customEyeColor ? eyeOuterColor : fillInk;
    const innerEyeColor = customEyeColor ? eyeInnerColor : fillInk;

    // Center Logo excavation calculations
    let excavateStart = -1;
    let excavateEnd = -1;
    if (logo) {
      const ratio = Math.max(0.1, Math.min(0.36, logoSizePercent / 100));
      const logoModules = Math.max(3, Math.floor(matrixSize * ratio));
      excavateStart = Math.floor((matrixSize - logoModules) / 2);
      excavateEnd = excavateStart + logoModules;
    }

    const isExcavated = (r, c) => {
      if (!logo) return false;
      return r >= excavateStart && r < excavateEnd && c >= excavateStart && c < excavateEnd;
    };

    // 3. Draw Body Data Modules
    ctx.fillStyle = fillInk;

    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        if (isFinderPattern(c, r, matrixSize)) continue;
        if (isExcavated(r, c)) continue;

        if (modules[r][c]) {
          const mx = qrX + c * tileSize;
          const my = qrY + r * tileSize;

          drawModulePattern(ctx, mx, my, tileSize, pattern, modules, r, c, matrixSize);
        }
      }
    }

    // 4. Draw Corner Finder Eyes
    const eyeLocations = [
      { x: qrX, y: qrY }, // TL
      { x: qrX + (matrixSize - 7) * tileSize, y: qrY }, // TR
      { x: qrX, y: qrY + (matrixSize - 7) * tileSize }, // BL
    ];

    const eye7Size = 7 * tileSize;
    const eye3Size = 3 * tileSize;

    eyeLocations.forEach(({ x, y }) => {
      ctx.fillStyle = background && !transparent ? background : "#ffffff";
      ctx.fillRect(x, y, eye7Size, eye7Size);

      ctx.fillStyle = outerEyeColor;
      drawEyeOuterShape(ctx, x, y, eye7Size, tileSize, eyeOuter);

      ctx.fillStyle = innerEyeColor;
      const innerX = x + 2 * tileSize;
      const innerY = y + 2 * tileSize;
      drawEyeInnerShape(ctx, innerX, innerY, eye3Size, tileSize, eyeInner);
    });

    // 5. Draw Center Logo Image SYNCHRONOUSLY with optional rotation
    if (logo && loadedImg) {
      const logoModules = (excavateEnd - excavateStart);
      const logoPixelSize = logoModules * tileSize;
      const logoX = qrX + excavateStart * tileSize;
      const logoY = qrY + excavateStart * tileSize;
      const centerX = logoX + logoPixelSize / 2;
      const centerY = logoY + logoPixelSize / 2;

      // Draw white background container for logo
      drawRoundedRect(ctx, logoX - 3, logoY - 3, logoPixelSize + 6, logoPixelSize + 6, 8, true, true, "#ffffff", "#cbd5e1");

      ctx.save();
      ctx.beginPath();
      ctx.roundRect(logoX, logoY, logoPixelSize, logoPixelSize, 6);
      ctx.clip();

      // Translate origin to logo center and rotate
      ctx.translate(centerX, centerY);
      if (logoRotation) {
        ctx.rotate((logoRotation * Math.PI) / 180);
      }
      ctx.drawImage(
        loadedImg,
        -logoPixelSize / 2,
        -logoPixelSize / 2,
        logoPixelSize,
        logoPixelSize
      );

      ctx.restore();
    }

    ctx.restore();
  }, [
    value,
    size,
    foreground,
    background,
    transparent,
    logo,
    logoSizePercent,
    logoRotation,
    loadedImg,
    pattern,
    eyeOuter,
    eyeInner,
    customEyeColor,
    eyeOuterColor,
    eyeInnerColor,
    useGradient,
    gradientEnd,
    frameStyle,
    frameText,
    frameTitle,
    frameColor,
    frameTextColor,
  ]);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", maxWidth: "100%", height: "auto" }}
    />
  );
});

export default QRCanvas;

// Helper: draw rounded rect
function drawRoundedRect(ctx, x, y, width, height, radius, fill = true, stroke = false, fillColor = "#ffffff", strokeColor = "#000000") {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  if (fill && fillColor) {
    ctx.fillStyle = fillColor;
    ctx.fill();
  }
  if (stroke && strokeColor) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

// Helper: draw body module pattern
function drawModulePattern(ctx, x, y, tileSize, pattern, modules, r, c, size) {
  const pad = tileSize * 0.05;
  const w = tileSize - pad * 2;

  if (pattern === "dots") {
    ctx.beginPath();
    ctx.arc(x + tileSize / 2, y + tileSize / 2, w / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (pattern === "rounded") {
    ctx.beginPath();
    ctx.roundRect(x + pad, y + pad, w, w, w * 0.4);
    ctx.fill();
  } else if (pattern === "classy") {
    ctx.beginPath();
    ctx.roundRect(x + pad, y + pad, w, w, [w * 0.45, 0, w * 0.45, 0]);
    ctx.fill();
  } else if (pattern === "diamond") {
    const cx = x + tileSize / 2;
    const cy = y + tileSize / 2;
    ctx.beginPath();
    ctx.moveTo(cx, y + pad);
    ctx.lineTo(x + tileSize - pad, cy);
    ctx.lineTo(cx, y + tileSize - pad);
    ctx.lineTo(x + pad, cy);
    ctx.closePath();
    ctx.fill();
  } else if (pattern === "star") {
    const cx = x + tileSize / 2;
    const cy = y + tileSize / 2;
    const rOuter = w * 0.5;
    const rInner = w * 0.2;
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const rad = (i * Math.PI) / 4;
      const radius = i % 2 === 0 ? rOuter : rInner;
      const px = cx + Math.cos(rad) * radius;
      const py = cy + Math.sin(rad) * radius;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fill();
  } else if (pattern === "fluid") {
    const top = r > 0 && modules[r - 1][c] && !isFinderPattern(c, r - 1, size);
    const bottom = r < size - 1 && modules[r + 1][c] && !isFinderPattern(c, r + 1, size);
    const left = c > 0 && modules[r][c - 1] && !isFinderPattern(c - 1, r, size);
    const right = c < size - 1 && modules[r][c + 1] && !isFinderPattern(c + 1, r, size);

    const radTL = !top && !left ? w * 0.45 : 0;
    const radTR = !top && !right ? w * 0.45 : 0;
    const radBR = !bottom && !right ? w * 0.45 : 0;
    const radBL = !bottom && !left ? w * 0.45 : 0;

    ctx.beginPath();
    ctx.roundRect(x, y, tileSize, tileSize, [radTL, radTR, radBR, radBL]);
    ctx.fill();
  } else {
    ctx.fillRect(x, y, tileSize, tileSize);
  }
}

// Helper: draw outer 7x7 finder eye frame
function drawEyeOuterShape(ctx, x, y, size, tileSize, eyeOuter) {
  const outerW = size;
  const innerW = 5 * tileSize;
  const innerOffset = 1 * tileSize;

  if (eyeOuter === "circle") {
    ctx.beginPath();
    ctx.arc(x + outerW / 2, y + outerW / 2, outerW / 2, 0, Math.PI * 2);
    ctx.arc(x + outerW / 2, y + outerW / 2, innerW / 2, 0, Math.PI * 2, true);
    ctx.fill();
  } else if (eyeOuter === "rounded") {
    ctx.beginPath();
    ctx.roundRect(x, y, outerW, outerW, outerW * 0.25);
    ctx.roundRect(x + innerOffset, y + innerOffset, innerW, innerW, innerW * 0.2);
    ctx.fill("evenodd");
  } else if (eyeOuter === "diamond") {
    const cx = x + outerW / 2;
    const cy = y + outerW / 2;

    ctx.beginPath();
    ctx.moveTo(cx, y);
    ctx.lineTo(x + outerW, cy);
    ctx.lineTo(cx, y + outerW);
    ctx.lineTo(x, cy);
    ctx.closePath();

    ctx.moveTo(cx, y + innerOffset);
    ctx.lineTo(x + innerOffset + innerW, cy);
    ctx.lineTo(cx, y + innerOffset + innerW);
    ctx.lineTo(x + innerOffset, cy);
    ctx.closePath();

    ctx.fill("evenodd");
  } else {
    ctx.fillRect(x, y, outerW, outerW);
    ctx.clearRect(x + innerOffset, y + innerOffset, innerW, innerW);
  }
}

// Helper: draw inner 3x3 finder eye ball
function drawEyeInnerShape(ctx, x, y, size, tileSize, eyeInner) {
  const cx = x + size / 2;
  const cy = y + size / 2;

  if (eyeInner === "circle") {
    ctx.beginPath();
    ctx.arc(cx, cy, size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (eyeInner === "diamond") {
    ctx.beginPath();
    ctx.moveTo(cx, y);
    ctx.lineTo(x + size, cy);
    ctx.lineTo(cx, y + size);
    ctx.lineTo(x, cy);
    ctx.closePath();
    ctx.fill();
  } else if (eyeInner === "rounded") {
    ctx.beginPath();
    ctx.roundRect(x, y, size, size, size * 0.35);
    ctx.fill();
  } else {
    ctx.fillRect(x, y, size, size);
  }
}
