const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Paths
const assetsDir = path.join(__dirname, '../assets');
const screenshotsDir = path.join(assetsDir, 'screenshots');

// Create screenshots directory if it doesn't exist
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

// Create a screenshot template
function createScreenshotTemplate(width, height, backgroundColor) {
  return `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <!-- Background -->
      <rect width="${width}" height="${height}" fill="${backgroundColor}" />
      
      <!-- Phone frame -->
      <rect x="${width * 0.1}" y="${height * 0.05}" width="${width * 0.8}" height="${height * 0.9}" 
            fill="#1A1A1A" rx="40" ry="40" />
      
      <!-- Screen content -->
      <rect x="${width * 0.15}" y="${height * 0.1}" width="${width * 0.7}" height="${height * 0.8}" 
            fill="#FFFFFF" rx="30" ry="30" />
      
      <!-- Status bar -->
      <rect x="${width * 0.15}" y="${height * 0.1}" width="${width * 0.7}" height="${height * 0.05}" 
            fill="#F5F5F5" rx="30" ry="30" />
      
      <!-- Time -->
      <text x="${width * 0.5}" y="${height * 0.125}" font-family="Arial" font-size="${height * 0.02}" 
            fill="#000000" text-anchor="middle">9:41</text>
      
      <!-- Battery, WiFi, Signal icons -->
      <g transform="translate(${width * 0.75}, ${height * 0.115})">
        <rect width="${height * 0.015}" height="${height * 0.01}" fill="#000000" rx="1" ry="1" />
        <rect x="${height * 0.02}" width="${height * 0.015}" height="${height * 0.01}" fill="#000000" rx="1" ry="1" />
        <rect x="${height * 0.04}" width="${height * 0.015}" height="${height * 0.01}" fill="#000000" rx="1" ry="1" />
      </g>
    </svg>
  `;
}

// Create different screenshots
const screenshots = [
  {
    name: 'home',
    title: 'Welcome to SnapRead',
    subtitle: 'Your AI-powered reading companion',
    content: (width, height) => `
      <g transform="translate(${width * 0.2}, ${height * 0.2})">
        <!-- Book icon -->
        <rect x="0" y="0" width="${width * 0.6}" height="${height * 0.4}" fill="#7F39FB" rx="20" ry="20" />
        <rect x="${width * 0.5}" y="${height * 0.05}" width="${width * 0.1}" height="${height * 0.35}" fill="white" rx="2" ry="2" />
        <text x="${width * 0.3}" y="${height * 0.2}" font-family="Arial" font-size="${height * 0.1}" 
              fill="white" text-anchor="middle">SR</text>
      </g>
      <text x="${width * 0.5}" y="${height * 0.6}" font-family="Arial" font-size="${height * 0.05}" 
            fill="#000000" text-anchor="middle">Scan documents instantly</text>
      <text x="${width * 0.5}" y="${height * 0.65}" font-family="Arial" font-size="${height * 0.03}" 
            fill="#666666" text-anchor="middle">Get AI-powered summaries and insights</text>
    `
  },
  {
    name: 'camera',
    title: 'Smart Document Scanning',
    subtitle: 'Point and capture any text',
    content: (width, height) => `
      <g transform="translate(${width * 0.2}, ${height * 0.2})">
        <!-- Camera view -->
        <rect x="0" y="0" width="${width * 0.6}" height="${height * 0.4}" fill="#000000" />
        <rect x="${width * 0.1}" y="${height * 0.1}" width="${width * 0.4}" height="${height * 0.2}" 
              fill="none" stroke="#FFFFFF" stroke-width="2" />
        <circle cx="${width * 0.3}" cy="${height * 0.3}" r="${height * 0.05}" fill="#FFFFFF" />
      </g>
      <text x="${width * 0.5}" y="${height * 0.6}" font-family="Arial" font-size="${height * 0.05}" 
            fill="#000000" text-anchor="middle">Smart document scanning</text>
      <text x="${width * 0.5}" y="${height * 0.65}" font-family="Arial" font-size="${height * 0.03}" 
            fill="#666666" text-anchor="middle">AI-powered text recognition</text>
    `
  },
  {
    name: 'summary',
    title: 'Instant Summaries',
    subtitle: 'Get the key points quickly',
    content: (width, height) => `
      <g transform="translate(${width * 0.2}, ${height * 0.2})">
        <!-- Summary card -->
        <rect x="0" y="0" width="${width * 0.6}" height="${height * 0.4}" fill="#F5F5F5" rx="10" ry="10" />
        <text x="${width * 0.3}" y="${height * 0.1}" font-family="Arial" font-size="${height * 0.03}" 
              fill="#000000" text-anchor="middle">Document Summary</text>
        <text x="${width * 0.1}" y="${height * 0.2}" font-family="Arial" font-size="${height * 0.02}" 
              fill="#666666">• Key points extracted</text>
        <text x="${width * 0.1}" y="${height * 0.25}" font-family="Arial" font-size="${height * 0.02}" 
              fill="#666666">• Main ideas highlighted</text>
        <text x="${width * 0.1}" y="${height * 0.3}" font-family="Arial" font-size="${height * 0.02}" 
              fill="#666666">• Important quotes saved</text>
      </g>
      <text x="${width * 0.5}" y="${height * 0.6}" font-family="Arial" font-size="${height * 0.05}" 
            fill="#000000" text-anchor="middle">AI-powered summaries</text>
      <text x="${width * 0.5}" y="${height * 0.65}" font-family="Arial" font-size="${height * 0.03}" 
            fill="#666666" text-anchor="middle">Save time on reading</text>
    `
  },
  {
    name: 'history',
    title: 'Reading History',
    subtitle: 'Track your progress',
    content: (width, height) => `
      <g transform="translate(${width * 0.2}, ${height * 0.2})">
        <!-- History list -->
        <rect x="0" y="0" width="${width * 0.6}" height="${height * 0.4}" fill="#F5F5F5" rx="10" ry="10" />
        <text x="${width * 0.3}" y="${height * 0.1}" font-family="Arial" font-size="${height * 0.03}" 
              fill="#000000" text-anchor="middle">Recent Documents</text>
        <rect x="${width * 0.1}" y="${height * 0.15}" width="${width * 0.4}" height="${height * 0.05}" 
              fill="#E0E0E0" rx="5" ry="5" />
        <rect x="${width * 0.1}" y="${height * 0.25}" width="${width * 0.4}" height="${height * 0.05}" 
              fill="#E0E0E0" rx="5" ry="5" />
        <rect x="${width * 0.1}" y="${height * 0.35}" width="${width * 0.4}" height="${height * 0.05}" 
              fill="#E0E0E0" rx="5" ry="5" />
      </g>
      <text x="${width * 0.5}" y="${height * 0.6}" font-family="Arial" font-size="${height * 0.05}" 
            fill="#000000" text-anchor="middle">Track your reading</text>
      <text x="${width * 0.5}" y="${height * 0.65}" font-family="Arial" font-size="${height * 0.03}" 
            fill="#666666" text-anchor="middle">Access summaries anytime</text>
    `
  }
];

// Generate screenshots
screenshots.forEach(screenshot => {
  const width = 1242; // iPhone 13 Pro Max width
  const height = 2688; // iPhone 13 Pro Max height
  const svg = createScreenshotTemplate(width, height, '#FFFFFF');
  
  // Add screenshot content
  const svgWithContent = svg.replace('</svg>', `${screenshot.content(width, height)}</svg>`);
  
  // Save SVG
  const svgPath = path.join(screenshotsDir, `${screenshot.name}.svg`);
  fs.writeFileSync(svgPath, svgWithContent);
  
  // Convert to PNG
  const pngPath = path.join(screenshotsDir, `${screenshot.name}.png`);
  sharp(svgPath)
    .resize(width, height)
    .png()
    .toFile(pngPath)
    .then(() => {
      console.log(`Created screenshot: ${pngPath}`);
    })
    .catch(err => {
      console.error(`Error creating screenshot ${screenshot.name}:`, err);
    });
});

console.log('Screenshot generation script running...'); 