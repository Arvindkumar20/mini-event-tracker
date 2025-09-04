export const makeShareId = () => {
  if (typeof crypto === 'undefined' || !crypto.getRandomValues) {
    throw new Error('Crypto API is not available in this environment');
  }
  
  const randomBytes = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(randomBytes)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};