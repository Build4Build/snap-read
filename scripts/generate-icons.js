const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Paths
const assetsDir = path.join(__dirname, '../assets');
const svgPath = path.join(assetsDir, 'icon.svg');
const adaptiveSvgPath = path.join(assetsDir, 'adaptive-icon.svg');
const splashSvgPath = path.join(assetsDir, 'splash.svg');
const faviconSvgPath = path.join(assetsDir, 'favicon.svg');

const iconPath = path.join(assetsDir, 'icon.png');
const adaptiveIconPath = path.join(assetsDir, 'adaptive-icon.png');
const splashPath = path.join(assetsDir, 'splash.png');
const faviconPath = path.join(assetsDir, 'favicon.png');

// Read the SVG files
const svgBuffer = fs.readFileSync(svgPath);
const adaptiveSvgBuffer = fs.readFileSync(adaptiveSvgPath);
const splashSvgBuffer = fs.readFileSync(splashSvgPath);
const faviconSvgBuffer = fs.readFileSync(faviconSvgPath);

// Convert SVG to PNG for iOS icon (1024x1024)
sharp(svgBuffer)
  .resize(1024, 1024)
  .png()
  .toFile(iconPath)
  .then(() => {
    console.log(`Created iOS icon: ${iconPath}`);
  })
  .catch(err => {
    console.error('Error creating iOS icon:', err);
  });

// Convert SVG to PNG for Android adaptive icon (1024x1024)
sharp(adaptiveSvgBuffer)
  .resize(1024, 1024)
  .png()
  .toFile(adaptiveIconPath)
  .then(() => {
    console.log(`Created Android adaptive icon: ${adaptiveIconPath}`);
  })
  .catch(err => {
    console.error('Error creating Android adaptive icon:', err);
  });

// Convert SVG to PNG for splash screen (2048x2048 or larger for tablets)
sharp(splashSvgBuffer)
  .resize(2436, 2436, {
    fit: 'contain',
    background: { r: 98, g: 0, b: 238, alpha: 1 } // #6200EE
  })
  .png()
  .toFile(splashPath)
  .then(() => {
    console.log(`Created splash screen: ${splashPath}`);
  })
  .catch(err => {
    console.error('Error creating splash screen:', err);
  });

// Convert SVG to PNG for favicon (192x192)
sharp(faviconSvgBuffer)
  .resize(192, 192)
  .png()
  .toFile(faviconPath)
  .then(() => {
    console.log(`Created favicon: ${faviconPath}`);
  })
  .catch(err => {
    console.error('Error creating favicon:', err);
  });

console.log('Icon generation script running...'); 