import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configuration pour déploiement statique IPFS
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Configuration pour résoudre les problèmes CSP avec IPFS
  // Note: Les headers CSP ne fonctionnent pas avec output: 'export'
  // La solution est d'utiliser un meta tag dans le HTML
};

export default nextConfig;
