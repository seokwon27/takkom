import Image from "next/image";
import React from "react";
import ambulance from "../../../public/homepage/ambulance-icon.svg";
import mapIcon from "../../../public/homepage/map-icon.svg";
import calendarIcon from "../../../public/homepage/calendar-icon.svg";

const EventLink = () => {
  return (
    <div className="flex flex-col gap-16 mb-[190px]">
      <div className="text-center">
        <h1 className="text-[40px] text-gray-800 font-bold">따꼼만의 이벤트</h1>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex flex-col justify-center items-center w-[360px] h-[278px] bg-gray-10 rounded-3xl px-[37px] py-6 gap-10 relative">
          <div>
            <Image src={ambulance} alt="앰뷸런스" className="h-[120px]" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-[#393939] text-2xl font-bold">따꼼을 첫 방문 했다면?</h2>
            <p className="text-primary-400 font-bold">추첨을 통해 기프티콘 증정</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-[360px] h-[278px] bg-gray-10 rounded-3xl px-[37px] py-6 gap-10">
          <div>
            <Image src={mapIcon} alt="맵아이콘" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-[#393939] text-2xl font-bold">방문했던 병원을 추천해요!</h2>
            <p className="text-primary-400 font-bold">인기글 선정시 1000 point</p>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-[360px] h-[278px] bg-gray-10 rounded-3xl px-[37px] py-6 gap-10">
          <div>
            <Image src={calendarIcon} alt="달력" />
          </div>
          <div className="flex flex-col gap-2 text-center">
            <h2 className="text-[#393939] text-2xl font-bold">EVERY 출석 이벤트</h2>
            <p className="text-primary-400 font-bold">포인트와 푸짐한 상품까지</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventLink;
