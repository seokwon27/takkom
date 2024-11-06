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

const PageLink = () => {
  return (
    <div className="flex gap-6 mt-[77px] w-full max-w-[1200px] m-auto">
      <Link
        href={"/vaccineinfo"}
        className="flex bg-[url('/homepage/vaccineInfo-bg.svg')] px-12 py-20 rounded-3xl text-white w-[736px] h-[472px] relative"
      >
        <Image src={linkPerson} alt="사람아이콘" className="absolute -bottom-12 right-11" />
        <div className="flex flex-col justify-start gap-6 pt-6">
          <div className="z-10">
            <p className="text-[32px] font-bold">지금 아이에게 필요한</p>
            <p className="text-[40px] font-bold">예방 접종 정보 확인하기</p>
          </div>
          <div className="flex justify-center gap-[6px] bg-white text-primary-400 max-w-[135px] p-2 rounded-[50px] text-xl font-bold">
            <div>
              <Image src={searchIcon} alt="돋보기" />
            </div>
            <p>보러가기</p>
          </div>
        </div>
      </Link>

      <div className="flex flex-col gap-6 ">
        <Link className="p-[40px] rounded-3xl w-[440px] h-[224px] bg-[#F0F9FF] relative" href={"/child"}>
          <Image src={handHeart} alt="아이콘" className="absolute right-0" />
          <div className="flex flex-col gap-3">
            <p className="text-2xl text-gray-800 font-bold "> 우리 아이 접종 관리하기</p>
            <p className="text-gray-600">
              아이 맞춤형 접종 정보와 <br />
              접종 내역을 체크할 수 있어요!
            </p>
            <div className="flex gap-2 justify-center items-center border-[1px] border-primary-300 rounded-[19px] w-[103px] h-[38px]">
              <Image src={addCircle} alt="등록아이콘" />
              <p className="text-primary-300 font-semibold">등록하기</p>
            </div>
          </div>
        </Link>
        <Link
          href={"/search"}
          className="flex justify-center items-center px-9 w-[440px] h-[224px] rounded-3xl border-[0.6px] border-gray-30 shadow-[0px_0px_16px_0px_rgba(114,114,114,0.10)] relative"
        >
          <div className="flex w-full justify-between">
            <div className="flex flex-col justify-center gap-4">
              <div>
                <p className="text-[#008F5D] text-lg font-semibold">어디에서 접종 하나요?</p>
                <p className="text-gray-800 text-[32px] font-bold">우리 동네 병원 찾기</p>
              </div>
              <div className="flex gap-2">
                <Image src={injector} alt="주사기" />
                <Image src={ambulance} alt="구급차" />
                <Image src={pill} alt="약" />
              </div>
            </div>
            <div>
              <Image src={hospital} alt="병원" className="" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default PageLink;
