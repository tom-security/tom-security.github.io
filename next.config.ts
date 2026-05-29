import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Pour GitHub Pages : si le repo est tom-security.github.io, basePath n'est pas nécessaire
  // Si c'est un repo nommé différemment, décommenter et adapter :
  // basePath: "/nom-du-repo",
  images: {
    unoptimized: true, // Requis pour l'export statique
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
