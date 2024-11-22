import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/utils/supabase/client";
import CakeIcon from "../../../public/child/cake-icon.svg";
import { Child } from "@/types/childType";

type ChildCardProps = {
  child?: Child;
};

const ChildBasicInfo = ({ child }: ChildCardProps) => {
  if (!child) {
    return null;
  }

  return (
    <div className="w-full md:w-[50%] flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 p-4 rounded-2xl bg-white shadow-[0px_0px_12px_#7272721A]">
      <div className="w-full flex flex-col gap-4">
        {/* 아이 기본 정보 내 좌/우 영역 나누기 위한 컨테이너 */}
        <div className="flex items-center justify-between w-full gap-3 md:gap-6">
          {/* 좌측: 프로필 이미지 */}
          <div className="flex-shrink-0 w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 relative overflow-hidden rounded-[13px]">
            <Image
              src={child.profile || DEFAULT_PROFILE_IMAGE_URL}
              width={176}
              height={176}
              alt="profile Image"
              className="absolute w-full h-full object-cover"
            />
          </div>

          {/* 우측: 기본 정보 & 수정하기 버튼 */}
          <div className="flex flex-col justify-start items-start w-full md:w-[calc(100%-176px)] gap-0 md:gap-3">
            {/* 이름 & 생년월일 시작 */}
            <div className="flex flex-col justify-between items-start w-full pt-2  gap-2 lg:gap-3 max-lg:pt-0">
              {/*  아이 이름 영역 */}
              <p className="text-base font-bold text-center text-neutral-900">{child.name}</p>

              {/* 아이 생일 영역 */}
              <div className="flex justify-center items-center gap-1">
                {/* 케이크 아이콘 */}
                <Image src={CakeIcon} alt="케이크 아이콘" />

                {/* 아이 생일 */}
                <p className="text-text-s font-medium text-center text-gray-400">{child.birth}</p>
              </div>
            </div>
            {/* 이름 & 생년월일 끝 */}

            {/* 아이 특이사항 */}
            <p className="w-full h-[50px] text-text-s font-medium text-left text-gray-600 overflow-y-auto">
              {child.notes && <span>{child.notes}</span>}
            </p>

            {/* 수정하기 */}
            <Link key={child.id} href={`/child/${child.id}/childinfo`} className="w-full">
              <div className="flex justify-center items-center h-8 gap-[8px] px-4 py-2 rounded-[7px] bg-gray-30">
                <button className="text-text-s font-medium text-center text-gray-700">수정하기</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildBasicInfo;
