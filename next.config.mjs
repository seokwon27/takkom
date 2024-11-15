import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development"
})({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rhihezmeunossgtiviip.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/profiles/public/**"
      }
    ]
  }
});

export default nextConfig;
