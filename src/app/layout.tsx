import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/rootlayout/Header";
import Footer from "@/components/rootlayout/Footer";
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
  icons: {
    icon: "/favicon.svg"
  }
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="kr">
      <body className={`${pretendard.className} flex flex-col min-h-screen relative`}>
        <Providers>
          <Header />
          <main className="grow flex flex-col w-full max-w-[1200px] mx-auto mb-[100px] max-sm:mx-0 max-sm:mb-0">
            {children}
          </main>
          <Image src={takkomi} alt="따꼼빼꼼" className="absolute right-[120px] bottom-[345px] z-10 max-sm:hidden" />
          <Footer />
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
