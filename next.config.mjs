// next.config.mjs
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'], // Tambahkan mdx di sini
}

const withMDX = createMDX()
export default withMDX(nextConfig)