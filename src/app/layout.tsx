import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
import takkomi from "../../public/homepage/takkomi.svg";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard"
});

export const metadata: Metadata = {
  title: "따꼼",
  description: "우리 아이 예방 접종 정보를 저장하고 무료 접종 병원을 찾을 수 있습니다."
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="kor">
      <body className={`${pretendard.className} flex flex-col min-h-screen relative`}>
        <Providers>
          <Header />
          <main className="grow flex flex-col w-full max-w-[1200px] mx-auto mb-[100px] max-sm:max-w-[327px]">{children}</main>
          <Image src={takkomi} alt="따꼼빼꼼" className="absolute right-[120px] bottom-[345px] z-50" />
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
