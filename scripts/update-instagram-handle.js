#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Get Instagram handle from command line argument
const newHandle = process.argv[2];

if (!newHandle) {
  console.log('❌ Please provide your Instagram handle!');
  console.log('Usage: node scripts/update-instagram-handle.js your_instagram_handle');
  console.log('Example: node scripts/update-instagram-handle.js peoni_beauty');
  process.exit(1);
}

// Path to the social config file
const configPath = path.join(__dirname, '../src/config/social.ts');

// Read the current config
let configContent = fs.readFileSync(configPath, 'utf8');

// Update the Instagram handle
configContent = configContent.replace(
  /INSTAGRAM_HANDLE: '[^']*'/,
  `INSTAGRAM_HANDLE: '${newHandle}'`
);

configContent = configContent.replace(
  /INSTAGRAM_URL: '[^']*'/,
  `INSTAGRAM_URL: 'https://instagram.com/${newHandle}'`
);

configContent = configContent.replace(
  /INSTAGRAM_DM_URL: '[^']*'/,
  `INSTAGRAM_DM_URL: 'https://instagram.com/${newHandle}/direct/inbox/'`
);

// Write the updated config
fs.writeFileSync(configPath, configContent);

console.log('✅ Instagram handle updated successfully!');
console.log(`📱 New handle: @${newHandle}`);
console.log(`🔗 DM URL: https://instagram.com/${newHandle}/direct/inbox/`);
console.log('\n💡 You can now restart your development server to see the changes.'); 