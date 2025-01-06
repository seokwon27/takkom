import Script from "next/script";
import { ReactNode } from "react";

declare global { interface Window { kakao: any}}

const KAKAOMAP_API_KEY = process.env.NEXT_PUBLIC_KAKAOMAP_API_KEY;
const API_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAOMAP_API_KEY}&libraries=services&autoload=false`;

const HospitalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Script src={API_URL} strategy="beforeInteractive" />
      {children}
    </>
  );
};

export default HospitalLayout;
