import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    domains: ["lh3.googleusercontent.com"], // add any other external domains here
  },
};

export default nextConfig;
