// utils/colorGenerator.js

import { Hsluv } from 'hsluv'; // Importa la classe Hsluv dalla libreria

let lastHue = Math.floor(Math.random() * 360); // Inizializza con un valore casuale di hue

// Soglia di contrasto personalizzabile
const contrastThreshold = 4.5; // Imposta una soglia molto bassa per debug

// Funzione per convertire HEX in RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return [r, g, b];
}

// Funzione per calcolare la luminanza relativa
function relativeLuminance(r, g, b) {
  const [R, G, B] = [r, g, b].map((channel) => {
    const sRGB = channel / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

// Funzione per calcolare il rapporto di contrasto
function contrastRatio(l1, l2) {
  return l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
}

// Funzione per determinare il colore foreground basato su WCAG e soglia di contrasto
function getForegroundColorBasedOnContrast(primaryColorHex, whiteColorHex, blackColorHex, threshold) {
  const [r1, g1, b1] = hexToRgb(primaryColorHex);
  const primaryLuminance = relativeLuminance(r1, g1, b1);
  const [r2, g2, b2] = hexToRgb(whiteColorHex);
  const whiteLuminance = relativeLuminance(r2, g2, b2);
  const [r3, g3, b3] = hexToRgb(blackColorHex);
  const blackLuminance = relativeLuminance(r3, g3, b3);

  const contrastWithWhite = contrastRatio(primaryLuminance, whiteLuminance);
  const contrastWithBlack = contrastRatio(primaryLuminance, blackLuminance);

  if (contrastWithWhite >= threshold && contrastWithWhite >= contrastWithBlack) {
    return whiteColorHex;
  } else if (contrastWithBlack >= threshold) {
    return blackColorHex;
  } else {
    return contrastWithWhite >= contrastWithBlack ? whiteColorHex : blackColorHex;
  }
}

// Funzione per generare un valore HSLuv con le specifiche richieste
export function getRandomHSLuvColor() {
  let hue;

  do {
    hue = Math.floor(Math.random() * 360);
  } while (Math.abs(hue - lastHue) < 30);

  lastHue = hue;

  const saturation = Math.floor(Math.random() * (90 - 35 + 1)) + 35;
  const lightness = Math.floor(Math.random() * (65 - 45 + 1)) + 35;

  const conv = new Hsluv();
  
  conv.hsluv_h = hue;
  conv.hsluv_s = saturation;
  conv.hsluv_l = lightness;
  
  conv.hsluvToHex();
  const primaryHexColor = conv.hex;

  conv.hsluv_s = saturation * 0.70;
  conv.hsluv_l = 85;
  conv.hsluvToHex();
  const whiteForegroundHexColor = conv.hex;

  conv.hsluv_s = saturation * 0.90;
  conv.hsluv_l = 20;
  conv.hsluvToHex();
  const blackForegroundHexColor = conv.hex;

  const foregroundColor = getForegroundColorBasedOnContrast(
    primaryHexColor,
    whiteForegroundHexColor,
    blackForegroundHexColor,
    contrastThreshold
  );

  // Calcola il colore complementare
  const complementaryHue = (hue + 180) % 360;
  conv.hsluv_h = complementaryHue;
  conv.hsluv_s = saturation;
  conv.hsluv_l = lightness;
  conv.hsluvToHex();
  const complementaryHexColor = conv.hex;

  // Genera colori foreground simulati per il colore complementare
  conv.hsluv_s = saturation * 0.70;
  conv.hsluv_l = 85;
  conv.hsluvToHex();
  const whiteMenuForegroundHexColor = conv.hex;

  conv.hsluv_s = saturation * 0.90;
  conv.hsluv_l = 20;
  conv.hsluvToHex();
  const blackMenuForegroundHexColor = conv.hex;

  const foregroundMenuColor = getForegroundColorBasedOnContrast(
    complementaryHexColor,
    whiteMenuForegroundHexColor,
    blackMenuForegroundHexColor,
    contrastThreshold
  );

  // Imposta il colore di sfondo e del testo del body
  document.body.style.backgroundColor = primaryHexColor;
  document.body.style.color = foregroundColor;

  // Crea un elemento di stile per aggiungere dinamicamente le classi
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
    .text-color { color: ${foregroundColor}; }
    .border-color { border-color: ${foregroundColor}; }
    .bg-secondary-color { background-color: ${foregroundColor}; }
    .main-text-color { color: ${primaryHexColor}; } 
    .bg-menu-color { background-color: ${complementaryHexColor}; }
    .text-menu-color { color: ${foregroundMenuColor}; }
    .border-menu-color { border-color: ${foregroundMenuColor}; }
    .bg-secondary-menu-color { background-color: ${foregroundMenuColor}; }
    .fill { fill: ${blackForegroundHexColor}; }
  `;
  document.head.appendChild(styleElement);

  // Aggiungi un console.log per verificare i colori e il CSS generato
  console.log('Generated CSS classes and their colors:', {
    primaryHexColor,
    foregroundColor,
    complementaryHexColor,
    foregroundMenuColor,
    blackForegroundHexColor
  });

  // Debug: verifica se la classe è stata applicata correttamente
  console.log('Style element content:', styleElement.innerHTML);

  return primaryHexColor;
}
