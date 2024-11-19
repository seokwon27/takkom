import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: true,
  // disable: process.env.NODE_ENV === "development",
  buildExcludes: [/app-build-manifest.json$/, /middleware-manifest.json$/]
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
