// Social media configuration
export const SOCIAL_CONFIG = {
  INSTAGRAM_HANDLE: 'peonibeautyy', // Replace with your actual Instagram handle
  INSTAGRAM_URL: 'https://instagram.com/peonibeautyy', // Replace with your actual Instagram URL
  INSTAGRAM_DM_URL: 'https://instagram.com/peonibeautyy', // Direct message URL
};

// Helper function to create Instagram profile link
export const createInstagramProfileLink = () => {
  return SOCIAL_CONFIG.INSTAGRAM_URL;
};

// Helper function to create Instagram DM link with prefilled message
export const createInstagramDMLink = (message?: string) => {
  // Instagram doesn't support direct DM links with prefilled messages anymore
  // We'll use the profile URL and let users manually send a DM
  const baseUrl = SOCIAL_CONFIG.INSTAGRAM_URL;
  return baseUrl;
};

// Helper function to create a message for users to copy
export const createOrderMessage = (productName?: string) => {
  if (productName) {
    return `Hi @${SOCIAL_CONFIG.INSTAGRAM_HANDLE}! I'm interested in the ${productName} product. Could you please provide more details and ordering information?`;
  }
  return `Hi @${SOCIAL_CONFIG.INSTAGRAM_HANDLE}! I'm interested in your Korean beauty products. Could you please help me with ordering?`;
}; 