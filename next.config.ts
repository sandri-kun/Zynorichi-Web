import type { NextConfig } from "next";

const isDev = process.argv.indexOf('dev') !== -1;
const isBuild = process.argv.indexOf('build') !== -1;

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
