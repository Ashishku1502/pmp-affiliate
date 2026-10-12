module.exports = {
  reactStrictMode: true,
  eslint:     { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors:  true },
  experimental: {
    // firebase-admin must NOT be bundled — it relies on native Node.js modules
    serverComponentsExternalPackages: ['firebase-admin'],
  },
};
