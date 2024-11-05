import React from "react";
import { Child } from "@/types/childType";
import Image from "next/image";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/utils/supabase/client";
import Link from "next/link";
import Schedule from "./Schedule";
import birthdayIcon from "../../../public/birthdayIcon.svg";
import injectorIcon from "../../../public/injectorIcon.svg";
import rightArrowIcon from "../../../public/rightArrowIcon.svg";
import checkListIcon from "../../../public/checkListIcon.svg";

interface ChildCardProps {
  child?: Child; // 등록된 child가 없으면 undefined일 수 있음
  onEdit?: (child: Child) => void; // 수정 기능을 위해 child를 전달
}

export const ChildCard = ({ child }: ChildCardProps) => {
  // child가 없을 때를 대비한 처리
  if (!child) {
    return <div>아이가 등록되지 않았습니다.</div>;
  }

  return (
    <>
      {/* 아이 카드 전체 컨테이너 */}
      <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-[792px] gap-6 p-6 rounded-2xl bg-neutral-50 mb-6">
        {/* 아이 기본 정보 & 우리 아이 접종 내역 컨테이너 */}
        <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6">
          {/* 아이 기본 정보 컨테이너 */}
          <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 p-4 rounded-2xl bg-white shadow-[0px_0px_12px_#7272721A]">
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 gap-4">
              {/* 아이 기본 정보 내 좌/우 영역 나누기 위한 컨테이너 */}
              <div className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-6">
                {/* 좌측: 프로필 이미지 */}
                <Image
                  src={child.profile || DEFAULT_PROFILE_IMAGE_URL} // 기본 이미지 설정
                  alt="아이 프로필 이미지"
                  width={176}
                  height={176}
                  className="flex-grow-0 flex-shrink-0 w-44 h-44 object-cover rounded-[13.2px]"
                />

                {/* 우측: 기본 정보 & 수정하기 버튼 */}
                <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-4">
                  {/* 이름 & 생년월일 시작 */}
                  <div className="flex flex-col justify-between items-start flex-grow-0 flex-shrink-0 gap-3 w-40 pt-2">
                    {/*  아이 이름 영역 */}
                    <p className="flex-grow-0 flex-shrink-0 text-base font-bold text-center text-neutral-900">
                      {child.name}
                    </p>

                    {/* 아이 생일 영역 */}
                    <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-1">
                      {/* 케이크 아이콘 */}
                      <Image src={birthdayIcon} alt="케이크 아이콘" />

                      {/* 아이 생일 */}
                      <p className="flex-grow-0 flex-shrink-0 text-xs font-medium text-center text-[#969696]">
                        {child.birth}
                      </p>
                    </div>
                  </div>
                  {/* 이름 & 생년월일 끝 */}

                  {/* 아이 특이사항 */}
                  <p className="self-stretch flex-grow-0 flex-shrink-0 w-40 h-[50px] text-xs font-medium text-left text-[#636363]">
                    {child.notes && <p>{child.notes}</p>}
                  </p>

                  {/* 수정하기 */}
                  <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 h-8 relative gap-[8.890547752380371px] p-[7.112438201904297px] rounded-[7.11px] bg-[#f2f2f2]">
                    <Link key={child.id} href={`/child/${child.id}/edit1`}>
                      <button className="flex-grow-0 flex-shrink-0 text-xs font-medium text-center text-[#4a4a4a]">
                        수정하기
                      </button>
                    </Link>
                  </div>
                  {/* 수정하기 끝*/}
                </div>
                {/* 우측: 기본 정보 & 수정하기 버튼 끝 */}
              </div>
              {/* 아이 기본 정보 내 좌/우 영역 나누기 위한 컨테이너 끝 */}

              {/* 카메라 아이콘 */}
              {/* <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-10 w-10 absolute left-[124px] top-[124px] overflow-hidden gap-2.5 p-0.5 rounded-[20px] bg-white">
                <Image src={cameraIcon} alt="카메라 아이콘" />
              </div> */}
            </div>
          </div>
          {/* 아이 기본 정보 컨테이너 끝 */}

          {/* 우리아이 접종 내역 전체 컨테이너 */}
          <div className="flex justify-center items-start flex-grow h-52 gap-[288.0537414550781px] p-4 rounded-2xl bg-[#5c99ff]">
            <div className="flex flex-col justify-between items-end self-stretch flex-grow">
              <div className="flex flex-col justify-start items-start self-stretch flex-grow gap-3">
                {/* 우리 아이 접종 내역 타이틀 컨테이너 */}
                <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-4">
                  <Image src={injectorIcon} alt="주사기 아이콘" />

                  <div className="flex flex-col justify-center items-start flex-grow relative gap-1">
                    <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-white">
                      우리 아이 접종 내역
                    </p>
                  </div>
                </div>
                {/* 우리 아이 접종 내역 타이틀 컨테이너 끝*/}

                {/* 필수 접종 & 선택 접종 디스플레이 컨테이너 */}
                <div className="flex flex-col justify-start items-start self-stretch flex-grow gap-2">
                  {/* 필수 접종 & 선택 접종 */}
                  {/* <p className="text-white">아이의 접종 내역을 한눈에 확인하세요!</p> */}
                  <p className="text-white">
                    접종 완료 내역과 앞으로의 접종 일정을 간편하게 관리하세요! 아이의 건강 기록을 손쉽게 확인할 수
                    있습니다.
                  </p>
                  {/* <div className="flex justify-start items-start self-stretch flex-grow gap-2">
                    <div className="flex justify-center items-center self-stretch flex-grow relative gap-4 p-4 rounded-xl bg-white">
                      <div className="flex flex-col justify-center items-center self-stretch flex-grow relative gap-4">
                        <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-[#636363]">
                          필수 접종
                        </p>
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#ff7664]">4개</p>
                      </div>
                      
                      <div className="flex flex-col justify-center items-center self-stretch flex-grow relative gap-4">
                        <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-[#636363]">
                          선택 접종
                        </p>
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#5ebe15]">2개</p>
                      </div>
                    </div>
                  </div> */}

                  {/* 자세히 보기 컨테이너 */}
                  <div className="flex justify-end items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1">
                    <div className="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-1">
                      <Link href={`/child/${child.id}`}>
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-white">
                          자세히 보기
                        </p>
                      </Link>
                    </div>
                    <Image src={rightArrowIcon} alt="오른쪽 화살표 아이콘" />
                  </div>
                  {/* 자세히 보기 컨테이너 끝 */}
                </div>
                {/* 필수 접종 & 선택 접종 디스플레이 컨테이너 끝*/}
              </div>
            </div>
          </div>
          {/* 우리아이 접종 내역 전체 컨테이너 끝*/}
        </div>
        {/* 아이 기본 정보 & 우리 아이 접종 내역 컨테이너 끝*/}

        {/* 접종 체크리스트 */}

        <div
          className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 h-[276px] overflow-hidden gap-2.5 p-6 rounded-2xl bg-white"
          style={{ boxShadow: "0px 0px 12px 0 rgba(114,114,114,0.1)" }}
        >
          <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6">
            <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2.5">
              <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-1">
                <Image src={checkListIcon} alt="체크리스트 아이콘" />
                <p className="flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-[#4a4a4a]">접종 체크리스트</p>
              </div>

              {/*  월 */}
              {/* <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative px-1.5 py-0.5 rounded bg-[#f2f2f2]">
                <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#636363]">10월</p>
                <Image src={checkListIcon} alt="체크리스트 아이콘" />
              </div> */}
            </div>
            <div>
              <Schedule />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChildCard;
