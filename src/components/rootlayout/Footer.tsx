import Image from "next/image";
import Link from "next/link";
import React from "react";
import takkomi from "../../../public/homepage/takkomi.svg";
const Footer = () => {
  return (
    <footer className="flex flex-col w-full mx-auto items-center justify-center gap-2.5 relative bg-[#f7f9fa] max-sm:hidden">
      <Image src={takkomi} alt="따꼼빼꼼" className="absolute top-[-100px] right-[120px] z-10 max-sm:hidden" />

      <div className="flex flex-col w-full max-w-[1200px] max-h-[480px] items-start gap-12 p-10 bg-[#f7f9fa]">
        <div className="flex items-start justify-between self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col w-[272px] items-start gap-3">
            {/* 고객센터 */}
            <div className="min-w-[200px] flex flex-col items-start gap-3 self-stretch w-full flex-[0_0_auto]">
              <p className="self-stretch mt-[-1.00px] text-heading-s font-bold text-gray-800">고객센터</p>

              <p className="self-stretch font-medium text-gray-800 text-label-xl">
                오전 00시 ~ 오후 00시 (주말, 공휴일 제외)
              </p>
            </div>

            <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-1.5 flex-[0_0_auto] bg-gray-50 rounded">
              <div className="w-fit mt-[-1.00px] font-semibold text-gray-600 text-title-xs whitespace-nowrap relative">
                문의하기
              </div>
            </div>
          </div>

          <div className="w-full max-w-[568px] min-w-[400px] inline-flex justify-between items-start flex-[0_1_auto]">
            {/* Information */}
            <div className="flex flex-col w-[115px] h-[187px] items-start gap-6">
              <p className="self-stretch mt-[-1.00px] font-semibold text-gray-600 text-title-xxs">Information</p>

              <div className="flex flex-col items-start gap-3 self-stretch w-full flex-[0_0_auto] text-gray-600 text-label-s font-medium">
                <p className="self-stretch">개인정보 처리방침</p>
                <p className="self-stretch">이용약관</p>
              </div>
            </div>

            {/* Service */}
            <div className="flex flex-col w-[75px] h-[115px] items-start gap-6">
              <p className="self-stretch mt-[-1.00px] font-semibold text-gray-600 text-title-xxs">Service</p>

              <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto] text-gray-600 text-label-s font-medium">
                <p className="self-stretch mt-[-1.00px]">about us</p>
                <p className="self-stretch">전체 서비스</p>
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col w-[138px] h-[151px] items-start gap-6">
              <p className="self-stretch mt-[-1.00px] font-semibold text-gray-600 text-title-xxs">Category</p>

              <div className="flex flex-col items-start gap-3 self-stretch w-full flex-[0_0_auto] text-gray-600 text-label-s font-medium">
                <Link href={"/vaccineinfo"} className="self-stretch mt-[-1.00px]">
                  연령별 예방접종 정보
                </Link>

                <Link href={"/hospital"} className="self-stretch">
                  동네 병원 찾기
                </Link>

                <Link href={"/child"} className="self-stretch">
                  우리 아이 맞춤형 플랜
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 self-stretch w-full flex-[0_0_auto]  text-gray-600 text-label-xs font-medium">
          <div className="flex flex-col items-start gap-2 self-stretch w-full flex-[0_0_auto]">
            <p className="w-full ">
              <span className="w-fit mt-[-1.00px] mr-4 whitespace-nowrap">(주)따꼼 컴퍼니</span>

              <span className="w-fit mt-[-1.00px] mr-2 whitespace-nowrap">만든이</span>

              <span className="w-fit mt-[-1.00px] mr-2 whitespace-nowrap">이석원</span>

              <span className="w-fit mt-[-1.00px] mr-2 whitespace-nowrap">조해인</span>

              <span className="w-fit mt-[-1.00px] mr-2 whitespace-nowrap">이예람</span>

              <span className="w-fit mt-[-1.00px] mr-2 whitespace-nowrap">장세희</span>

              <span className="w-fit mt-[-1.00px] mr-2 whitespace-nowrap">정지형</span>

              <span className="w-fit mt-[-1.00px] mr-4 whitespace-nowrap">전수빈</span>

              <span className="w-fit mt-[-1.00px] mr-4">서울특별시 강남구 테헤란로 415, 4층(따꼼동, 엘7강남타워)</span>

              <span className="w-fit mt-[-1.00px] mr-4">대표전화 : 1800-따꼼따꼼</span>

              <span className="w-fit mt-[-1.00px] mr-4">이메일 : takkom@takkom.co.kr</span>
            </p>

            <div className="inline-flex items-center gap-[35px]  flex-[0_0_auto]">
              <p className="w-fit mt-[-1.00px] text-gray-600 whitespace-nowrap ">사업자등록번호 : 457-81-따꼼따꼼</p>

              <p className="w-fit mt-[-1.00px] text-gray-600 whitespace-nowrap ">
                통신판매업신고 : 2024-서울따꼼-02525
              </p>
            </div>

            <p className="self-stretch text-gray-600">
              따꼼은 통신판매중개자로서 중개하는 거래에 대하여 책임을 부담하지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
