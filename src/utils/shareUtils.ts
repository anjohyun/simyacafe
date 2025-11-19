import { toPng, toJpeg } from 'html-to-image';
import QRCode from 'qrcode';
import { SharePlatform, ShareResult, ShareContent } from '../types/share';

/**
 * Generate QR code as data URL
 */
export async function generateQRCode(url: string): Promise<string> {
  try {
    return await QRCode.toDataURL(url, {
      width: 200,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });
  } catch (error) {
    console.error('QR code generation failed:', error);
    return '';
  }
}

/**
 * Convert DOM element to PNG image
 */
export async function elementToImage(
  element: HTMLElement,
  format: 'png' | 'jpeg' = 'png'
): Promise<string> {
  try {
    const converter = format === 'png' ? toPng : toJpeg;
    return await converter(element, {
      cacheBust: true,
      pixelRatio: 2, // Higher quality for retina displays
      backgroundColor: '#0A0A0A',
    });
  } catch (error) {
    console.error('Image generation failed:', error);
    throw error;
  }
}

/**
 * Download image as file
 */
export function downloadImage(dataUrl: string, filename: string): void {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Clipboard write failed:', error);
    return false;
  }
}

/**
 * Share using Web Share API
 */
export async function nativeShare(
  content: ShareContent,
  imageBlob?: Blob
): Promise<ShareResult> {
  if (!navigator.share) {
    return {
      success: false,
      error: 'Web Share API not supported',
    };
  }

  try {
    const shareData: ShareData = {
      title: content.title,
      text: content.description,
      url: content.url,
    };

    // Add image if provided (only supported on some platforms)
    if (imageBlob) {
      const file = new File([imageBlob], 'share-card.png', { type: 'image/png' });
      shareData.files = [file];
    }

    await navigator.share(shareData);
    return { success: true };
  } catch (error) {
    if ((error as Error).name === 'AbortError') {
      return { success: false, error: 'Share cancelled' };
    }
    console.error('Share failed:', error);
    return { success: false, error: (error as Error).message };
  }
}

/**
 * Get platform-specific share URL
 */
export function getPlatformShareUrl(
  platform: SharePlatform,
  content: ShareContent
): string {
  const encodedUrl = encodeURIComponent(content.url);
  const encodedTitle = encodeURIComponent(content.title);

  switch (platform) {
    case 'twitter':
      return `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;

    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;

    case 'kakaotalk':
      // KakaoTalk requires SDK integration, placeholder for now
      return `https://sharer.kakao.com/talk/friends?url=${encodedUrl}`;

    case 'instagram':
      // Instagram doesn't have URL sharing, this is a fallback
      return `https://www.instagram.com/`;

    default:
      return content.url;
  }
}

/**
 * Format number for display (1234 -> 1.2K)
 */
export function formatShareCount(count: number): string {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

/**
 * Generate share card filename
 */
export function generateFilename(content: ShareContent, template: string): string {
  const date = new Date().toISOString().split('T')[0];
  const sanitizedTitle = content.title
    .replace(/[^a-zA-Z0-9가-힣]/g, '-')
    .substring(0, 30);
  return `simyacafe-${content.type}-${sanitizedTitle}-${template}-${date}.png`;
}

/**
 * Data URL to Blob conversion
 */
export function dataURLtoBlob(dataUrl: string): Blob {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * Check if Web Share API is available
 */
export function isWebShareSupported(): boolean {
  return typeof navigator !== 'undefined' && !!navigator.share;
}

/**
 * Check if device can share files
 */
export function canShareFiles(): boolean {
  return isWebShareSupported() && !!navigator.canShare?.({ files: [] });
}
