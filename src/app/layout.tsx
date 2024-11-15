import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/rootlayout/Header";
import Footer from "@/components/rootlayout/Footer";
import Image from "next/image";
import takkomi from "../../public/homepage/takkomi.svg";
import { PWAProvider } from "./PWAProvider";

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
        {/* iOS용 PWA 메타테그 */}
        <meta name="apple-mobile-web-app-capable" content="yes" /> {/* PWA가 전체화면으로 실행되도록 설정 */}
        <meta name="apple-mobile-web-app-status-bar-style" content="default" /> {/* iOS 상태바의 스타일 */}
        <meta name="apple-mobile-web-app-title" content="따꼼" /> {/* 홈 화면에 추가될 때 표시될 앱의 이름 */}
        <link rel="apple-touch-icon" href="/icon/icon-512x512.png" /> {/* 앱 아이콘 지정 */}
        <meta name="format-detection" content="telephone=no" /> {/* PWA가 링크처럼 보이는 것 방지 */}
      </head>
      <body className={`${pretendard.className} flex flex-col min-h-screen relative`}>
        <Providers>
          <Header />
          <main className="grow flex flex-col w-full max-w-[1200px] mx-auto mb-[100px] max-sm:mx-0 max-sm:mb-0">
            {children}
          </main>
          <Image src={takkomi} alt="따꼼빼꼼" className="absolute right-[120px] bottom-[345px] z-10 max-sm:hidden" />
          <Footer />
          <PWAProvider />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
