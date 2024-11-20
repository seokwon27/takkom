import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/rootlayout/Header";
import Footer from "@/components/rootlayout/Footer";
import { PWAProvider } from "./PWAProvider";
import { Toaster } from "@/components/ui/toaster";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard"
});

export const metadata: Metadata = {
  title: "따꼼",
  description: "우리 아이 예방 접종 정보를 저장하고 무료 접종 병원을 찾을 수 있습니다.",
  manifest: "/manifest.json",
  keywords: ["따꼼", "따꼬미", "동네 병원 찾기", "예방접종", "필수접종", "우리아이"],
  openGraph: {
    title: "따꼼",
    description: "우리 아이 예방 접종 정보를 저장하고 무료 접종 병원을 찾을 수 있습니다.",
    url: "https://www.takkom.site",
    images: [
      {
        url: "/icon/icon-192x192.png",
        width: 192,
        height: 192,
        alt: "따꼼 로고"
      }
    ]
  },
  icons: {
    icon: "/favicon.svg",
    apple: "/icon/icon-192x192.png"
  }
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="kr">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="따꼼" />
        <link rel="apple-touch-icon" href="/icon/icon-512x512.png" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${pretendard.className} flex flex-col min-h-screen relative`}>
        <Providers>
          <Header />
          <main className="grow flex flex-col w-full max-w-[1200px] mx-auto mb-[100px] max-sm:mx-0 max-sm:mb-0 ">
            {children}
          </main>
          <Toaster />
          <Footer />
          <PWAProvider />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
