"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import InjectorIcon from "../../../public/child/injector-icon.svg";
import RightArrowIcon from "../../../public/child/right-arrow-icon.svg";
import { Child } from "@/types/childType";

type ChildCardProps = {
  child?: Child;
  requiredVaccinesCount: number;
  totalRequiredVaccines: number;
  optionalVaccinesCount: number;
  totalOptionalVaccines: number;
};

const ChildCardVaccinationInfo = ({
  child,
  requiredVaccinesCount,
  totalRequiredVaccines,
  optionalVaccinesCount,
  totalOptionalVaccines
}: ChildCardProps) => {
  if (!child) {
    return null;
  }

  return (
    <div className="w-full flex justify-center items-start flex-grow h-52 gap-[288px] p-4 rounded-2xl bg-primary-300">
      <div className="flex flex-col justify-between items-end self-stretch flex-grow">
        <div className="flex flex-col justify-start items-start self-stretch flex-grow gap-3">
          {/* 우리 아이 접종 내역 타이틀 컨테이너 */}
          <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
              <Image src={InjectorIcon} alt="주사기 아이콘" />
            </div>

            <div className="flex flex-col justify-center items-start flex-grow relative gap-1">
              <p className="flex-grow-0 flex-shrink-0 text-title-m font-bold text-left text-white">
                우리 아이 접종 체크리스트
              </p>
            </div>
          </div>
          {/* 우리 아이 접종 내역 타이틀 컨테이너 끝*/}

          {/* 필수 접종 & 선택 접종 디스플레이 컨테이너 */}
          <div className="flex flex-col justify-start items-start self-stretch flex-grow gap-2">
            {/* 필수 접종 & 선택 접종 */}
            <div className="flex justify-start items-start self-stretch flex-grow">
              <div className="flex justify-center items-center self-stretch flex-grow relative gap-4 p-4 rounded-xl bg-white">
                <div className="flex flex-col justify-center items-center self-stretch flex-grow relative gap-4">
                  <p className="flex-grow-0 flex-shrink-0 text-title-xs text-left text-gray-600">필수 접종</p>
                  <p className="flex-grow-0 flex-shrink-0 text-title-m font-semibold text-left text-[#ff7664]">
                    {requiredVaccinesCount} / {totalRequiredVaccines}개
                  </p>
                </div>
                <div style={{ width: 0, height: 60, border: "1px #C2D9FF solid" }}></div>
                <div className="flex flex-col justify-center items-center self-stretch flex-grow relative gap-4">
                  <p className="flex-grow-0 flex-shrink-0 text-title-xs text-left text-gray-600">선택 접종</p>
                  <p className="flex-grow-0 flex-shrink-0 text-title-m font-semibold text-left text-[#5ebe15]">
                    {optionalVaccinesCount} / {totalOptionalVaccines}개
                  </p>
                </div>
              </div>
            </div>

            {/* 자세히 보기 컨테이너 */}
            <div className="flex justify-end items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1">
              <Link href={`/child/${child.id}`}>
                <div className="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-1">
                  <p className="flex-grow-0 flex-shrink-0 text-text-l text-left text-white">자세히 보기</p>
                </div>
              </Link>
              <Image src={RightArrowIcon} alt="오른쪽 화살표 아이콘" />
            </div>
            {/* 자세히 보기 컨테이너 끝 */}
          </div>
          {/* 필수 접종 & 선택 접종 디스플레이 컨테이너 끝*/}
        </div>
      </div>
    </div>
  );
};

export default ChildCardVaccinationInfo;
