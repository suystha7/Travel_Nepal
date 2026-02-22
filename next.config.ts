import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "sapi.travelnepal.com.au",
      },
      {
        protocol: "http",
        hostname: "192.168.254.46",
        port: "8002",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "192.168.254.46",
        port: "8002",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.81",
        port: "8000",
      },
      {
        protocol: "http",
        hostname: "192.168.254.30",
        port: "8002",
      },
      {
        protocol: "http",
        hostname: "192.168.1.64",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.94",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.104",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "192.168.1.64",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.mayaramasala.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.68",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "192.168.1.68",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.97",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "192.168.1.97",
        port: "8001",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "192.168.1.104",
        port: "8000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.104",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.94",
        port: "8002",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.104",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.94",
        port: "8002",
        pathname: "/media/**",
      },

      {
        protocol: "http",
        hostname: "api.careegram.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.careegram.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "192.168.1.126",
        port: "8001",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "illustrations.popsy.co",
        pathname: "**",
      },
    ],
  },
  output: "standalone",
  turbopack: {},
};

export default nextConfig;
