// utils/colorGenerator.js

import { Hsluv } from 'hsluv'; // Importa la classe Hsluv dalla libreria HSLuv per la gestione del colore

let lastHue = Math.floor(Math.random() * 360); // Inizializza l'ultima tonalità con un valore casuale tra 0 e 359
// Soglia di contrasto personalizzabile per la leggibilità del testo
const contrastThreshold = 7; // Imposta una soglia di contrasto (4.5:1 è il minimo raccomandato per il testo normale)

// Funzione per convertire un colore HEX in RGB
function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16); // Converte il valore HEX in un numero intero
  const r = (bigint >> 16) & 255; // Estrae il componente rosso
  const g = (bigint >> 8) & 255;  // Estrae il componente verde
  const b = bigint & 255;         // Estrae il componente blu
  return [r, g, b];
}

// Funzione per calcolare la luminanza relativa di un colore RGB
function relativeLuminance(r, g, b) {
  const [R, G, B] = [r, g, b].map((channel) => {
    const sRGB = channel / 255;
    // Conversione del canale da sRGB a linear RGB
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B; // Calcola la luminanza usando i pesi standard per RGB
  return luminance;
}

// Funzione per calcolare il rapporto di contrasto tra due luminanze
function contrastRatio(l1, l2) {
  const ratio = l1 > l2 ? (l1 + 0.05) / (l2 + 0.05) : (l2 + 0.05) / (l1 + 0.05);
  return ratio;
}

// Funzione per determinare il colore di foreground (testo) basato sul contrasto WCAG
function getForegroundColorBasedOnContrast(primaryColorHex, whiteColorHex, blackColorHex, threshold) {
  const [r1, g1, b1] = hexToRgb(primaryColorHex); // Converte il colore primario in RGB
  const primaryLuminance = relativeLuminance(r1, g1, b1); // Calcola la luminanza relativa del colore primario

  const [r2, g2, b2] = hexToRgb(whiteColorHex); // Converte il bianco simulato in RGB
  const whiteLuminance = relativeLuminance(r2, g2, b2); // Calcola la luminanza relativa del bianco simulato

  const [r3, g3, b3] = hexToRgb(blackColorHex); // Converte il nero simulato in RGB
  const blackLuminance = relativeLuminance(r3, g3, b3); // Calcola la luminanza relativa del nero simulato

  // Calcola i rapporti di contrasto con bianco e nero simulati
  const contrastWithWhite = contrastRatio(primaryLuminance, whiteLuminance);
  const contrastWithBlack = contrastRatio(primaryLuminance, blackLuminance);

  // Determina il colore di foreground migliore in base alla soglia di contrasto
  let chosenColor;
  if (contrastWithWhite >= threshold && contrastWithWhite >= contrastWithBlack) {
    chosenColor = whiteColorHex;
  } else if (contrastWithBlack >= threshold) {
    chosenColor = blackColorHex;
  } else {
    chosenColor = contrastWithWhite >= contrastWithBlack ? whiteColorHex : blackColorHex;
  }

  return chosenColor;
}

// Funzione di utilità per calcolare un valore all'interno di un range in base alla soglia di contrasto
function calculateValueBasedOnContrast(threshold, min, max) {
  const factor = threshold / 4.5; // Normalizza la soglia di contrasto rispetto al valore minimo accettabile
  const value = min + (max - min) * Math.min(1, factor); // Calcola il valore all'interno dell'intervallo
  return value;
}

// Funzione principale per generare un colore HSLuv casuale e determinare il foreground appropriato
export function getRandomHSLuvColor() {
  let hue;

  // Genera una nuova tonalità che sia sufficientemente diversa dalla precedente
  do {
    hue = Math.floor(Math.random() * 360);
  } while (Math.abs(hue - lastHue) < 30);

  lastHue = hue;

  // Genera valori di saturazione e luminosità per il colore di background
  const saturation = Math.floor(Math.random() * (90 - 35 + 1)) + 35;
  const lightness = Math.floor(Math.random() * (65 - 35 + 1)) + 35;

  const conv = new Hsluv();
  
  conv.hsluv_h = hue;
  conv.hsluv_s = saturation;
  conv.hsluv_l = lightness;
  
  conv.hsluvToHex();
  const primaryHexColor = conv.hex;

  // Calcolo deterministico della saturazione e luminosità per il foreground bianco
  conv.hsluv_s = calculateValueBasedOnContrast(contrastThreshold, 60, 80);
  conv.hsluv_l = calculateValueBasedOnContrast(contrastThreshold, 75, 95);
  conv.hsluvToHex();
  const whiteForegroundHexColor = conv.hex;

  // Calcolo deterministico della saturazione e luminosità per il foreground nero
  conv.hsluv_s = calculateValueBasedOnContrast(contrastThreshold, 80, 100);
  conv.hsluv_l = calculateValueBasedOnContrast(contrastThreshold, 10, 25);
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
  conv.hsluv_s = calculateValueBasedOnContrast(contrastThreshold, 60, 80);
  conv.hsluv_l = calculateValueBasedOnContrast(contrastThreshold, 85, 95);
  conv.hsluvToHex();
  const whiteMenuForegroundHexColor = conv.hex;

  conv.hsluv_s = calculateValueBasedOnContrast(contrastThreshold, 80, 100);
  conv.hsluv_l = calculateValueBasedOnContrast(contrastThreshold, 10, 30);
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
    .fill { fill: ${foregroundColor}; }
    .border-color { border-color: ${foregroundColor}; }
    .border-black { border-color: ${blackForegroundHexColor}; }
    .bg-secondary-color { background-color: ${foregroundColor}; }
    .bg-white-color { background-color: ${whiteForegroundHexColor}; }
    .main-text-color { color: ${primaryHexColor}; } 
    .bg-menu-color { background-color: ${complementaryHexColor}; }
    .text-menu-color { color: ${foregroundMenuColor}; }
    .border-menu-color { border-color: ${foregroundMenuColor}; }
    .bg-secondary-menu-color { background-color: ${foregroundMenuColor}; }
    .fill-black { fill: ${blackForegroundHexColor}; }
    .fill-menu { fill: ${foregroundMenuColor}; }
  `;
  document.head.appendChild(styleElement);

  return primaryHexColor;
}
