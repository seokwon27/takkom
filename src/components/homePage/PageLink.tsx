import Image from "next/image";
import Link from "next/link";
import linkPerson from "../../../public/homepage/info-link-person.svg";
import searchIcon from "../../../public/homepage/Search-icon.svg";
import handHeart from "../../../public/homepage/child-link-icon.svg";
import addCircle from "../../../public/homepage/add-circle.svg";
import hospital from "../../../public/homepage/hospital.svg";
import ambulance from "../../../public/homepage/ambule-small.svg";
import injector from "../../../public/homepage/injector.svg";
import pill from "../../../public/homepage/pill.svg";
import MobileLayout from "../layout/MobileLayout";
import DesktopLayout from "../layout/DesktopLayout";

const PageLink = () => {
  return (
    <div className="flex gap-6 mt-[77px] w-full max-w-[1200px] m-auto max-sm:gap-[10px] justify-center max-sm:mt-16">
      <Link
        href={"/vaccineinfo"}
        className="flex bg-[url('/homepage/vaccineInfo-bg.svg')]  px-12 py-20 rounded-2xl text-white w-[736px] h-[472px] relative max-sm:p-5 max-sm:w-[160px] max-sm:h-[240px]"
      >
        <Image
          src={linkPerson}
          alt="사람아이콘"
          className="absolute -bottom-12 right-11  h-auto max-sm:w-[120px] max-sm:h-[120px] max-sm:right-0 max-sm:-bottom-5"
        />
        <div className="flex flex-col justify-start gap-6 pt-6 max-sm:pt-0 max-sm:w-[107px] max-sm:gap-[10px]">
          <div>
            <p className="text-heading-xxl font-bold max-sm:hidden">지금 아이에게 필요한</p>
            <p className="text-heading-xxxl font-bold max-sm:text-heading-s max-sm:break-keep">
              예방 접종 정보 확인하기
            </p>
          </div>
          <div
            className="flex justify-center gap-[6px] bg-white text-primary-400 max-w-[135px] p-2 rounded-[50px] text-xl font-bold max-sm:w-[78px] max-sm:h-[26px]
          max-sm:py-1 max-sm:gap-1"
          >
            <div>
              <Image src={searchIcon} alt="돋보기" className="max-sm:w-4 max-sm:h-4" />
            </div>
            <p className="text-heading-m max-sm:text-heading-xxxs">보러가기</p>
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-6 max-sm:gap-[10px]">
        <Link className="p-10 rounded-3xl  bg-[#F0F9FF] relative max-sm:p-5 max-sm:pt-[57px]" href={"/child"}>
          <Image
            src={handHeart}
            alt="아이콘"
            className="absolute right-0 max-sm:w-[75px] max-sm:h-[75px] max-sm:bottom-5 "
          />
          <div className="flex flex-col gap-3 max-sm:justify-end">
            <p className="text-2xl text-gray-800 font-bold max-sm:text-heading-xxs max-sm:break-keep">
              우리 아이 접종 관리하기
            </p>
            <p className="text-gray-600 max-sm:hidden">
              아이 맞춤형 접종 정보와 <br />
              접종 내역을 체크할 수 있어요!
            </p>
            <div className="flex gap-2 justify-center items-center border-[1px] border-primary-300 rounded-3xl w-[103px] h-[38px] max-sm:hidden">
              <Image src={addCircle} alt="등록아이콘" />
              <p className="text-primary-300 font-semibold">등록하기</p>
            </div>
          </div>
        </Link>
        <Link
          href={"/hospital"}
          className="flex justify-center items-center px-9 py-10 rounded-3xl border-[0.6px] border-gray-30 shadow-[0px_0px_16px_0px_rgba(114,114,114,0.10)] relative
          max-sm:p-5"
        >
          <div className="flex w-full justify-between py-5 max-sm:p-0">
            <div className="flex flex-col justify-center gap-4 max-sm:gap-2 max-sm:justify-start max-sm: relative">
              <div>
                <p className="text-[#008F5D] text-lg font-semibold max-sm:hidden">어디에서 접종 하나요?</p>
                <MobileLayout>
                  <p className="text-gray-800 text-heading-xxs font-bold whitespace-nowrap">동네 병원 찾기</p>
                </MobileLayout>
                <DesktopLayout>
                  <p className="text-gray-800 text-[32px] font-bold max-sm:text-heading-xxs">우리 동네 병원 찾기</p>
                </DesktopLayout>
              </div>
              <div className="flex gap-2">
                <Image src={injector} alt="주사기" className="max-sm:w-4 max-sm:h-4" />
                <Image src={ambulance} alt="구급차" className="max-sm:w-4 max-sm:h-4" />
                <Image src={pill} alt="약" className="max-sm:w-4 max-sm:h-4" />
              </div>
            </div>
            <div className="max-sm: max-sm:pt-[25px]">
              <Image src={hospital} alt="병원" className="max-sm:w-[50px] max-sm:h-[50px]" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PageLink;
