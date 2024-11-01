/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
