// // fonts.js

// /**
//  * Inserts a Google Fonts link into the HTML document's head section if running in a browser environment.
//  * This function dynamically creates and appends a 'link' element to include a font stylesheet.
//  * 
//  * @param {string} url - The URL of the Google Fonts stylesheet.
//  */
// function addGoogleFontsLink(url) {
//   // Check if 'document' is defined, indicating script is running in a browser
//   if (typeof document !== "undefined") {
//     // Create a 'link' element to link external stylesheet
//     const link = document.createElement('link');
//     link.href = url; // Set the href attribute to the provided URL
//     link.rel = 'stylesheet'; // Define relationship as a stylesheet
//     document.head.appendChild(link); // Append the link element to the document's head
//   } else {
//     // Log an error if this function is not executed in a browser environment
//     console.error('This function needs to be run in a browser environment');
//   }
// }

// // Export the addGoogleFontsLink function to be used in other parts of the application
// module.exports = { addGoogleFontsLink };

const fs = require('fs');
const path = require('path');

/**
 * Inserts a Google Fonts link into the HTML document's head section if running in a browser environment.
 * This function dynamically creates and appends a 'link' element to include a font stylesheet.
 * 
 * @param {string} url - The URL of the Google Fonts stylesheet.
 */
function addGoogleFontsLink(url) {
  console.log("Tentativo di aggiungere il link del font:", url);
  if (typeof document !== "undefined" && url !== "No font link available") {
    const link = document.createElement('link');
    link.href = url;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  } else {
    console.error('Invalid URL for Google Fonts:', url);
  }
}


/**
 * Finds and loads a font pair configuration based on a numeric ID from a directory of JSON files.
 * Each file should be named with a leading number, e.g., "14.json".
 * 
 * @param {string} pairId - The numeric ID that identifies the font pair.
 * @returns {object|null} - Returns the font configuration object or null if not found.
 */
function findFontPairById(pairId) {
  const directoryPath = path.join(__dirname, 'pairing-list');
  try {
    const files = fs.readdirSync(directoryPath);
    const matchingFile = files.find(file => file.startsWith(pairId + '.json'));

    if (matchingFile) {
      return require(path.join(directoryPath, matchingFile));
    } else {
      console.error(`No matching font pair found for ID: ${pairId}`);
      return null;
    }
  } catch (err) {
    console.error('Failed to read the directory:', err);
    return null;
  }
}

// Export the functions to be used in other parts of the application
module.exports = { addGoogleFontsLink, findFontPairById };
