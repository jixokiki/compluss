/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   output: 'export',
//   images: {unoptimized: true}
// };


/** next.config.js */
// const nextConfig = {
//   reactStrictMode: true,
//   output: "export", // => generate a static export on build
//   images: {
//     unoptimized: true, // disable Next image optimization (no function required)
//   },
//   experimental: {
//     // optional: any experimental flags you used; remove server-only experiments
//   },
// };

// module.exports = nextConfig;
/** next.config.mjs (ESM) */
const nextConfig = {
  reactStrictMode: true,
  // output: "export",
  images: {
    unoptimized: true,
  },
  experimental: {},
};

export default nextConfig;



// export default nextConfig;
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   // output: 'export',
//   images: {
//     unoptimized: true,
//     domains: process.env.IMAGE_DOMAIN ? [process.env.IMAGE_DOMAIN] : [],
//   },
// };

// export default nextConfig;



// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   images: {
//     domains: [
//       "firebasestorage.googleapis.com",
//       "images.unsplash.com"
//     ],
//   },
// };

// export default nextConfig;
