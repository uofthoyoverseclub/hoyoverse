import { useState, useEffect } from 'react';

interface GoogleDriveImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
}

export function GoogleDriveImage({ src, alt, className = '', fallbackSrc = '/logo.png' }: GoogleDriveImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [fileId, setFileId] = useState<string | null>(null);

  // Extract file ID from URL
  useEffect(() => {
    const match = src.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match) {
      setFileId(match[1]);
    }
  }, [src]);

  // Convert Google Drive URL to multiple fallback formats
  const getAlternativeUrls = (url: string): string[] => {
    if (!url.includes('drive.google.com')) return [url];
    
    const fileIdMatch = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (!fileIdMatch) return [url];
    
    const fileId = fileIdMatch[1];
    
    return [
      // Primary: uc with export=view (most reliable for public files)
      `https://drive.google.com/uc?export=view&id=${fileId}`,
      // Fallback 1: thumbnail with size (works but sometimes needs auth)
      `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`,
      // Fallback 2: uc with export=download
      `https://drive.google.com/uc?export=download&id=${fileId}`,
      // Fallback 3: direct lh3 googleusercontent (if cached)
      `https://lh3.googleusercontent.com/d/${fileId}`,
    ];
  };

  const handleError = () => {
    const alternatives = getAlternativeUrls(src);
    
    if (retryCount < alternatives.length - 1) {
      // Try next alternative URL
      setTimeout(() => {
        setRetryCount(retryCount + 1);
        setImageSrc(alternatives[retryCount + 1]);
        setHasError(false);
      }, 200);
    } else {
      // All alternatives failed - show error state
      console.warn(`Failed to load Google Drive image after ${alternatives.length} attempts. File ID: ${fileId}`, src);
      setHasError(true);
      // Don't set fallback image - let it show broken state
    }
  };

  useEffect(() => {
    // Reset when src changes
    setImageSrc(src);
    setHasError(false);
    setRetryCount(0);
  }, [src]);

  // Show error state with clickable link to open in Google Drive
  if (hasError && fileId) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-gray-100 border border-gray-300 ${className}`}
        style={{ minHeight: '200px' }}
      >
        <div className="text-gray-500 text-sm text-center px-4">
          <p className="mb-2">⚠️ Image not accessible</p>
          <p className="text-xs mb-2">This file may not be publicly shared</p>
          <a 
            href={`https://drive.google.com/file/d/${fileId}/view`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline text-xs"
          >
            Open in Google Drive
          </a>
        </div>
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      onError={handleError}
    />
  );
}
