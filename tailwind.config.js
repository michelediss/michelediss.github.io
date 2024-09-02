// Importa i moduli necessari
const { generateResponsiveBaseFontSize, generateTypographicScale } = require('./src/swell-scales/typo-scale/typography');
const typographyConfig = require('./src/swell-scales/typo-scale/typography-controller.json');
const { addGoogleFontsLink, findFontPairById } = require('./src/swell-scales/font-pairing/fonts');
const fontChoice = require('./src/swell-scales/font-pairing/fontChoice.json');

// Trova i dati della famiglia di font
const fontFamily = findFontPairById(fontChoice.chosenPair);
console.log("Dati della famiglia di font:", fontFamily);
if (typeof document !== "undefined" && fontFamily && fontFamily.fontUrl) {
  console.log("Aggiunta del link del font:", fontFamily.fontUrl);
  addGoogleFontsLink(fontFamily.fontUrl);
} else {
  console.log("Dati della famiglia di font non disponibili o non validi.");
}



// Genera le dimensioni base dei font e la scala tipografica personalizzata
const responsiveBaseFontSize = generateResponsiveBaseFontSize(
  typographyConfig.responsiveBaseFontSize.baseSize,
  typographyConfig.responsiveBaseFontSize.incrementFactor
);
const customFontSizeScale = generateTypographicScale(
  typographyConfig.customFontSizeScale.f0,
  typographyConfig.customFontSizeScale.r,
  typographyConfig.customFontSizeScale.n,
  typographyConfig.customFontSizeScale.count
);

// Configurazione di Tailwind CSS
module.exports = {
  content: [
    './public/**/*.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: customFontSizeScale,
      fontFamily: fontFamily ? {
        'paragraph': fontFamily.paragraph.fontfamily.replace(/['"]+/g, ''),
        'paragraph-weight': fontFamily.paragraph.fontweight || 'normal',
        'paragraph-lineheight': fontFamily.paragraph.lineheight,
        'heading': fontFamily.heading.fontfamily.replace(/['"]+/g, ''),
        'heading-weight': fontFamily.heading.fontweight || 'normal',
        'heading-lineheight': fontFamily.heading.lineheight,
        'heading-transform': fontFamily.heading.texttransform || 'none',
      } : {},
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addBase }) {
      addBase(responsiveBaseFontSize);
    },
    function({ addUtilities, theme }) {
      const newFontUtilities = {
        '.font-paragraph': {
          fontFamily: theme('fontFamily.paragraph'),
          fontWeight: theme('fontFamily.paragraph-weight'),
          lineHeight: theme('fontFamily.paragraph-lineheight'),
        },
        '.font-heading': {
          fontFamily: theme('fontFamily.heading'),
          fontWeight: theme('fontFamily.heading-weight'),
          lineHeight: theme('fontFamily.heading-lineheight'),
          textTransform: theme('fontFamily.heading-transform'),
        },
      };
      addUtilities(newFontUtilities, ['responsive']);
    },
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio')
  ],
};


// // ========================================================
// // Importing required modules and configurations
// // ========================================================
// const { generateResponsiveBaseFontSize, generateTypographicScale } = require('./src/swell-scales/typo-scale/typography');
// const typographyConfig = require('./src/swell-scales/typo-scale/typography-controller.json');
// const { addGoogleFontsLink } = require('./src/swell-scales/font-pairing/fonts');
// const fontChoice = require('./src/swell-scales/font-pairing/fontChoice.json');
// const fontFamily = require(`./src/swell-scales/font-pairing/pairing-list/${fontChoice.chosenPair}`);

// // ========================================================
// // Apply Google Fonts link if in a browser environment
// // ========================================================
// if (typeof document !== "undefined") {
//   addGoogleFontsLink(fontFamily.fontUrl);
// }

// // ========================================================
// // Generate base font sizes and custom typographic scale
// // ========================================================
// const responsiveBaseFontSize = generateResponsiveBaseFontSize(
//   typographyConfig.responsiveBaseFontSize.baseSize,
//   typographyConfig.responsiveBaseFontSize.incrementFactor
// );
// const customFontSizeScale = generateTypographicScale(
//   typographyConfig.customFontSizeScale.f0,
//   typographyConfig.customFontSizeScale.r,
//   typographyConfig.customFontSizeScale.n,
//   typographyConfig.customFontSizeScale.count
// );

// // ========================================================
// // Tailwind CSS configuration module
// // ========================================================
// module.exports = {
//   content: [
//     './public/**/*.html',
//     './src/**/*.{vue,js,ts,jsx,tsx}',
//   ],
//   theme: {
//     extend: {
//       fontSize: customFontSizeScale,
//       fontFamily: {
//         'paragraph': fontFamily.paragraph.fontfamily.replace(/['"]+/g, ''),
//         'paragraph-weight': fontFamily.paragraph.fontweight || 'normal',
//         'paragraph-lineheight': fontFamily.paragraph.lineheight,
//         'heading': fontFamily.heading.fontfamily.replace(/['"]+/g, ''),
//         'heading-weight': fontFamily.heading.fontweight || 'normal',
//         'heading-lineheight': fontFamily.heading.lineheight,
//         'heading-transform': fontFamily.heading.texttransform || 'none',
//       },
//     },
//   },
//   plugins: [
//     require('@tailwindcss/forms'),
//     function({ addBase }) {
//       addBase(responsiveBaseFontSize);
//     },
//     function({ addUtilities, theme }) {
//       const newFontUtilities = {
//         '.font-paragraph': {
//           fontFamily: theme('fontFamily.paragraph'),
//           fontWeight: theme('fontFamily.paragraph-weight'),
//           lineHeight: theme('fontFamily.paragraph-lineheight'),
//         },
//         '.font-heading': {
//           fontFamily: theme('fontFamily.heading'),
//           fontWeight: theme('fontFamily.heading-weight'),
//           lineHeight: theme('fontFamily.heading-lineheight'),
//           textTransform: theme('fontFamily.heading-transform'),
//         },
//       };
//       addUtilities(newFontUtilities, ['responsive']);
//     },
//     require('@tailwindcss/typography'),
//     require('@tailwindcss/aspect-ratio')
//   ],
// };
