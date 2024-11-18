import Image from "next/image";
import React from "react";
import ambulance from "../../../public/homepage/ambulance-icon.svg";
import mapIcon from "../../../public/homepage/map-icon.svg";
import calendarIcon from "../../../public/homepage/calendar-icon.svg";
import Link from "next/link";

const EventLink = () => {
  return (
    <div className="flex flex-col gap-16 mb-[190px] max-sm:gap-6 max-sm:mb-0">
      <div className="text-center">
        <h1 className="text-[40px] leading-[54px]  text-gray-800 font-bold max-sm:text-heading-s">따꼼만의 이벤트</h1>
      </div>
      <div className="w-full h-fit overflow-scroll scrollbar-hide">
        <div className="flex w-full justify-between max-sm:w-fit max-sm:gap-4">
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLScf62XOwvdocupbuQ_IKDGP8YOfZJFICKShUpLUsZWYbvOurw/viewform?usp=sf_link">
            <div className="flex flex-col justify-center items-center w-[360px] h-[278px] bg-gray-10 rounded-3xl px-[37px] py-6 gap-10 max-sm:w-[200px] max-sm:h-[200px] max-sm:p-6 max-sm:gap-4">
              <div>
                <Image src={ambulance} alt="앰뷸런스" className="h-[120px] max-sm:h-[106px]" />
              </div>
              <div className="flex flex-col gap-2 text-center">
                <h2 className="text-gray-800 text-heading-l font-bold max-sm:text-heading-xxs">설문에 참여해보세요!</h2>
                <p className="text-primary-400 font-bold max-sm:text-label-s">추첨을 통해 기프티콘 증정</p>
              </div>
            </div>
          </Link>
          <div className="flex flex-col justify-center items-center w-[360px] h-[278px] bg-gray-10 rounded-3xl px-[37px] py-6 gap-10 max-sm:w-[200px] max-sm:h-[200px] max-sm:p-6 max-sm:gap-4">
            <div>
              <Image src={mapIcon} alt="맵아이콘" className="max-sm:h-[94px]" />
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-gray-800 text-heading-l font-bold max-sm:text-heading-xxs">
                방문했던 병원을 추천해요!
              </h2>
              <p className="text-primary-400 font-bold max-sm:text-label-s">인기글 선정시 1000 point</p>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-[360px] h-[278px] bg-gray-10 rounded-3xl px-[37px] py-6 gap-10 max-sm:w-[200px] max-sm:h-[200px] max-sm:p-6 max-sm:gap-4">
            <div>
              <Image src={calendarIcon} alt="달력" className="max-sm:h-[94px]" />
            </div>
            <div className="flex flex-col gap-2 text-center">
              <h2 className="text-gray-800 text-heading-l font-bold max-sm:text-heading-xxs">EVERY 출석 이벤트</h2>
              <p className="text-primary-400 font-bold max-sm:text-label-s">포인트와 푸짐한 상품까지</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLink;
