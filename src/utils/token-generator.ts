export interface TokenPayload {
  orderId: string;
  studentId: string;
  farmerId: string;
  listingId: string;
  quantity: number;
  totalPrice: number;
  timestamp: number;
}

/**
 * Using Web Crypto API natively in the browser to avoid extra polyfills
 */
export async function generateOrderToken(payload: TokenPayload): Promise<{
  fullToken: string;
  shortToken: string;
  qrData: string;
}> {
  const salt = crypto.getRandomValues(new Uint8Array(16)).join('');
  const nonce = Date.now().toString(36);
  
  const dataString = JSON.stringify({ ...payload, salt, nonce });
  
  // Create SHA-256 hash using Web Crypto API
  const msgUint8 = new TextEncoder().encode(dataString);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const fullToken = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  // 8-char short token
  const shortToken = fullToken.substring(0, 8).toUpperCase();

  // QR code tracking data
  const qrData = `https://agrobridge-vitb.app/verify/${shortToken}`;

  return { fullToken, shortToken, qrData };
}

export function generateUPIDeepLink(upiId: string, name: string, amount: number, shortToken: string): string {
  // Generates the deep link schema required for UPI payment apps exactly per spec
  return `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${amount}&tn=AgroBridge-${shortToken}`;
}
