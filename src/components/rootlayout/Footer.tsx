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
              <div className="self-stretch mt-[-1.00px] font-heading-s font-bold text-gray-800 tracking-[var(--heading-s-letter-spacing)]">
                고객센터
              </div>

              <p className="self-stretch font-label-XL font-medium text-gray-800 text-label-l">
                오전 00시 ~ 오후 00시 (주말, 공휴일 제외)
              </p>
            </div>

            <div className="inline-flex items-center justify-center gap-2.5 px-2.5 py-1.5 flex-[0_0_auto] bg-gray-50 rounded-lg">
              <div className="w-fit mt-[-1.00px] font-title-XS font-semibold text-gray-600 text-title-xs whitespace-nowrap relative tracking-[var(--title-XS-letter-spacing)]">
                문의하기
              </div>
            </div>
          </div>

          <div className="w-full max-w-[568px] min-w-[400px] inline-flex justify-between items-start flex-[0_1_auto]">
            {/* Information */}
            <div className="flex flex-col w-[115px] h-[187px] items-start gap-6">
              <p className="self-stretch mt-[-1.00px] font-heading-XS font-semibold text-gray-600 text-title-xs tracking-[var(--heading-XS-letter-spacing)]">
                Information
              </p>

              <div className="flex flex-col items-start gap-3 self-stretch w-full flex-[0_0_auto]">
                <p className="self-stretch mt-[-1.00px] font-label-XL text-gray-600 text-label-xl font-medium">
                  공지사항
                </p>

                <p className="self-stretch font-label-XL text-gray-600 text-label-xl font-medium">개인정보 처리방침</p>

                <p className="self-stretch font-label-XL text-gray-600 text-label-xl font-medium">이용약관</p>
              </div>
            </div>

            {/* Service */}
            <div className="flex flex-col w-[75px] h-[115px] items-start gap-6">
              <p className="self-stretch mt-[-1.00px] font-heading-XS font-semibold text-gray-600 text-[length:var(--heading-XS-font-size)] tracking-[var(--heading-XS-letter-spacing)] leading-[var(--heading-XS-line-height)] [font-style:var(--heading-XS-font-style)]">
                Service
              </p>

              <div className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
                <p className="self-stretch mt-[-1.00px] font-label-XL text-gray-600 text-label-xl font-medium">
                  about us
                </p>

                <p className="self-stretch font-label-XL text-gray-600 text-label-xl font-medium">전체 서비스</p>
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col w-[138px] h-[151px] items-start gap-6">
              <p className="self-stretch mt-[-1.00px] font-heading-XS font-semibold text-gray-600 text-[length:var(--heading-XS-font-size)] tracking-[var(--heading-XS-letter-spacing)] leading-[var(--heading-XS-line-height)] [font-style:var(--heading-XS-font-style)]">
                Category
              </p>

              <div className="flex flex-col items-start gap-3 self-stretch w-full flex-[0_0_auto]">
                <Link
                  href={"/vaccineinfo"}
                  className="self-stretch mt-[-1.00px] font-label-XL text-gray-600 text-label-xl font-medium"
                >
                  연령별 예방접종 정보
                </Link>

                <Link href={"/hospital"} className="self-stretch font-label-XL text-gray-600 text-label-xl font-medium">
                  동네 병원 찾기
                </Link>

                <Link href={"/child"} className="self-stretch font-label-XL text-gray-600 text-label-xl font-medium">
                  우리 아이 맞춤형 플랜
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-6 self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col items-start gap-2 self-stretch w-full flex-[0_0_auto]">
            <p className="w-full text-gray-600 text-label-xl font-medium ">
              <span className="w-fit mt-[-1.00px] mr-4 font-label-XL whitespace-nowrap">(주)따꼼 컴퍼니</span>

              <span className="w-fit mt-[-1.00px] mr-2 font-label-XL whitespace-nowrap">만든이</span>

              <span className="w-fit mt-[-1.00px] mr-2 font-label-XL whitespace-nowrap">이석원</span>

              <span className="w-fit mt-[-1.00px] mr-2 font-label-XL whitespace-nowrap">조해인</span>

              <span className="w-fit mt-[-1.00px] mr-2 font-label-XL whitespace-nowrap">이예람</span>

              <span className="w-fit mt-[-1.00px] mr-2 font-label-XL whitespace-nowrap">장세희</span>

              <span className="w-fit mt-[-1.00px] mr-2 font-label-XL whitespace-nowrap">정지형</span>

              <span className="w-fit mt-[-1.00px] mr-4 font-label-XL whitespace-nowrap">전수빈</span>

              <span className="w-fit mt-[-1.00px] font-label-XL whitespace-nowrap">
                서울특별시 강남구 테헤란로 415, 4층(따꼼동, 엘7강남타워)
              </span>
            </p>

            <div className="w-fit flex gap-[35px]">
              <p className="w-fit mt-[-1.00px] font-label-XL text-gray-600 text-label-xl font-medium whitespace-nowrap ">
                대표전화 : 1800-따꼼따꼼
              </p>

              <p className="w-fit mt-[-1.00px] font-label-XL text-gray-600 text-label-xl font-medium tracking-[var(--label-XL-letter-spacing)] whitespace-nowrap [font-style:var(--label-XL-font-style)]">
                이메일 : takkom@takkom.co.kr
              </p>
            </div>

            <div className="inline-flex items-center gap-[35px]  flex-[0_0_auto]">
              <p className="w-fit mt-[-1.00px] font-label-XL text-gray-600 text-label-xl font-medium whitespace-nowrap ">
                사업자등록번호 : 457-81-따꼼따꼼
              </p>

              <p className="w-fit mt-[-1.00px] font-label-XL text-gray-600 text-label-xl font-medium whitespace-nowrap ">
                통신판매업신고 : 2024-서울따꼼-02525
              </p>
            </div>

            <p className="self-stretch font-label-XL text-gray-600 text-label-xl font-medium">
              따꼼은 통신판매중개자로서 중개하는 거래에 대하여 책임을 부담하지 않습니다.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
