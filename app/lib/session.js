import 'server-only'; // Ensure it's used on the server only
import { SignJWT, jwtVerify } from 'jose';

// Ensure your secret key is defined
const secretKey = process.env.SESSION_SECRET;
if (!secretKey) {
  throw new Error('SESSION_SECRET is not defined in your environment variables');
}

const encodedKey = new TextEncoder().encode(secretKey);

/**
 * Encrypt payload to generate a JWT
 * @param {Object} payload - Data to encode
 * @returns {string} - Signed JWT
 */
export async function encrypt(payload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Token expiry time
    .sign(encodedKey);
}

/**
 * Decrypt a JWT to verify its authenticity
 * @param {string} token - JWT to decode
 * @returns {Object|null} - Decoded payload or null
 */
export async function decrypt(token) {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.error('Failed to verify session:', error.message);
    return null;
  }
}

/**
 * Verify user role
 * @param {Object} payload - Decoded JWT payload
 * @returns {boolean} - Returns true if role matches, false otherwise
 */
export const verifyUserRole = async (payload) => {
  return payload?.role === 'USER'; // Adjust based on your app's role logic
};