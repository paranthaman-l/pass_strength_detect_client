/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com", // For Google Drive image URLs
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // For some Google Drive preview URLs
      },
    ],
  },
  
};

export default nextConfig;
