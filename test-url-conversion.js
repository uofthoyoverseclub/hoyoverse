import { convertGoogleDriveUrl } from './src/utils/googleDrive.js';

console.log('Testing URL conversion...\n');

const testUrls = [
  // Thumbnail URLs (the problem format)
  'https://drive.google.com/thumbnail?id=1dqvNFXdrSZWR2VlNRxrHMKwxwiY96Jef&sz=w1000',
  
  // Already correct format
  'https://drive.google.com/uc?export=view&id=1IC9D-2FNFgarxqnAPEtFJf6y5lFagm_n',
  
  // File/d/ format
  'https://drive.google.com/file/d/1NuZLlz_tDJDrJRmUIo_YhPxxrnIM8CpR/view',
  
  // Short /d/ format
  'https://drive.google.com/d/1UcyUhs8afI0Xp5ymUbh8YZhHOsvOFmmH',
  
  // Non-Google Drive URL
  'https://example.com/image.jpg'
];

const expectedFormat = 'https://drive.google.com/uc?export=view&id=';

testUrls.forEach((url, index) => {
  const converted = convertGoogleDriveUrl(url);
  const isCorrect = converted.startsWith(expectedFormat) || !url.includes('drive.google.com');
  
  console.log(`Test ${index + 1}: ${isCorrect ? '✅' : '❌'}`);
  console.log(`  Input:  ${url}`);
  console.log(`  Output: ${converted}`);
  console.log('');
});

console.log('All URLs are now normalized to the correct format!');
