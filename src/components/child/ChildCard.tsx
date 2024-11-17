import React from "react";
import { Child } from "@/types/childType";
import Image from "next/image";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/utils/supabase/client";
import Link from "next/link";
import Schedule from "./Schedule";
import CakeIcon from "../../../public/child/cake-icon.svg";
import InjectorIcon from "../../../public/child/injector-icon.svg";
import RightArrowIcon from "../../../public/child/right-arrow-icon.svg";
import { useVaccineQuery, useVaccineRecordQuery } from "@/query/useVaccineRecordQuery";

interface ChildCardProps {
  child?: Child; // 등록된 child가 없으면 undefined일 수 있음
  onEdit?: (child: Child) => void; // 수정 기능을 위해 child를 전달
}

export const ChildCard = ({ child }: ChildCardProps) => {
  // child가 없을 때를 대비한 처리
  if (!child) {
    return <div>아이가 등록되지 않았습니다.</div>;
  }

  // vaccineData와 vaccineRecord를 가져오는 쿼리
  const { data: vaccineData } = useVaccineQuery();
  const { data: vaccineRecord } = useVaccineRecordQuery(child.id);

  // 접종 데이터가 없으면 처리하지 않도록
  if (!vaccineData || !vaccineRecord) return <div>Loading...</div>;

  // 필수 예방접종과 선택 예방접종 계산하는 함수
  // const getVaccinesCount = () => {
  //   let requiredVaccinesCount = 0; // 맞은 필수 접종 수
  //   let optionalVaccinesCount = 0; // 맞은 선택 접종 수
  //   let totalRequiredVaccines = 0; // 전체 필수 접종 수
  //   let totalOptionalVaccines = 0; // 전체 선택 접종 수

  //   vaccineData.forEach((vaccine) => {
  //     console.log("disease: ", vaccine.disease);
  //     // 각 disease 항목에 대해서 접종 여부를 체크
  //     vaccine.disease.forEach((disease) => {
  //       // disease의 additions 배열에 따른 필수/선택 접종 구분
  //       disease.additions.forEach((isOptional, index) => {
  //         const allCheckedVaccine = disease.ids.every((id) => vaccineRecord.includes(id));

  //         // 선택 접종인 경우
  //         if (isOptional) {
  //           totalOptionalVaccines++; // 전체 선택 접종 수 증가
  //           if (allCheckedVaccine) optionalVaccinesCount++; // 맞은 선택 접종 수 증가
  //         } else {
  //           // 필수 접종인 경우
  //           totalRequiredVaccines++; // 전체 필수 접종 수 증가
  //           if (allCheckedVaccine) requiredVaccinesCount++; // 맞은 필수 접종 수 증가
  //         }
  //       });
  //     });
  //   });

  //   return { requiredVaccinesCount, totalRequiredVaccines, optionalVaccinesCount, totalOptionalVaccines };
  // };

  const getVaccinesCount = () => {
    let requiredVaccinesCount = 0; // 맞은 필수 접종 수
    let optionalVaccinesCount = 0; // 맞은 선택 접종 수
    let totalRequiredVaccines = 0; // 전체 필수 접종 수
    let totalOptionalVaccines = 0; // 전체 선택 접종 수

    vaccineData.forEach((vaccine) => {
      // 각 disease 항목에 대해서 접종 여부를 체크
      vaccine.disease.forEach((disease) => {
        disease.ids.forEach((id, index) => {
          const isOptional = disease.additions[index]; // additions 배열에서 해당 id의 접종이 선택 접종인지 필수 접종인지 확인
          const allCheckedVaccine = vaccineRecord.includes(id); // 해당 id가 접종 기록에 포함되어 있는지 확인

          // 전체 접종 수를 계산
          if (isOptional) {
            totalOptionalVaccines++; // 선택 접종 수 증가
            if (allCheckedVaccine) optionalVaccinesCount++; // 선택 접종 완료된 경우
          } else {
            totalRequiredVaccines++; // 필수 접종 수 증가
            if (allCheckedVaccine) requiredVaccinesCount++; // 필수 접종 완료된 경우
          }
        });
      });
    });

    return { requiredVaccinesCount, totalRequiredVaccines, optionalVaccinesCount, totalOptionalVaccines };
  };

  const { requiredVaccinesCount, totalRequiredVaccines, optionalVaccinesCount, totalOptionalVaccines } =
    getVaccinesCount();

  return (
    <>
      {/* 아이 카드 전체 컨테이너 */}
      <div className="flex flex-col justify-center items-center w-full max-w-[792px] gap-6 p-6 rounded-2xl bg-neutral-50 mb-6 max-sm:p-0">
        {/* 아이 기본 정보 & 우리 아이 접종 내역 컨테이너 */}
        <div className="flex flex-col md:flex-row justify-start items-start w-full gap-6">
          {/* 아이 기본 정보 컨테이너 */}
          {/* TEST 01 */}
          {/* <div className="flex flex-col md:flex-row items-center p-4 rounded-lg bg-white w-full max-w-lg mx-auto shadow-[0px_0px_12px_#7272721A]">
            <div className="md:w-32 md:h-32 flex-shrink-0">
              <Image
                src={child.profile || DEFAULT_PROFILE_IMAGE_URL}
                width={176}
                height={176}
                alt="profile Image"
                className="w-44 h-44 object-cover rounded-[13px]"
              />
            </div>
            <div className="flex flex-col items-center md:items-start md:ml-6 mt-4 md:mt-0 space-y-2 md:text-left">
              <p className="text-base font-bold text-neutral-900">{child.name}</p>
              <div className="flex items-center space-x-2">
                <Image src={CakeIcon} alt="아이 생일 좌측에 보여지는 케이크 아이콘" />
                <p className="text-xs font-medium text-gray-400">{child.birth}</p>
              </div>
              <p className="h-[50px] text-xs font-medium text-gray-600">{child.notes && <span>{child.notes}</span>}</p>
              <Link key={child.id} href={`/child/${child.id}/childinfo`}>
                <div className="flex gap-2 p-2 px-10 rounded-[7px] bg-gray-30 w-full">
                  <button className="text-xs font-medium text-center text-gray-700">수정하기</button>
                </div>
              </Link>
            </div>
          </div> */}

          <div className="w-full md:w-[50%] flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 p-4 rounded-2xl bg-white shadow-[0px_0px_12px_#7272721A]">
            <div className="w-full flex flex-col gap-4">
              {/* 아이 기본 정보 내 좌/우 영역 나누기 위한 컨테이너 */}
              <div className="flex items-center justify-between w-full gap-3 md:gap-6">
                {/* 좌측: 프로필 이미지 */}
                {/* <div className="md:w-32 md:h-32 flex-shrink-0">
                  <Image
                    src={child.profile || DEFAULT_PROFILE_IMAGE_URL} // 기본 이미지 설정
                    alt="아이 프로필 이미지"
                    width={176} // 이미지 크기 설정
                    height={176} // 이미지 크기 설정
                    className="w-24 h-24 object-cover rounded-[13px]" // 이미지 정사각형으로 유지
                  />
                </div> */}
                <div className="flex-shrink-0">
                  <Image
                    src={child.profile || DEFAULT_PROFILE_IMAGE_URL}
                    width={176}
                    height={176}
                    alt="profile Image"
                    className="w-44 h-44 object-cover rounded-[13px]"
                  />
                </div>

                {/* 우측: 기본 정보 & 수정하기 버튼 */}
                <div className="flex flex-col justify-start items-start gap-4 w-full md:w-[calc(100%-176px)]">
                  {/* 이름 & 생년월일 시작 */}
                  <div className="flex flex-col justify-between items-start gap-3 w-full pt-2">
                    {/*  아이 이름 영역 */}
                    <p className="text-base font-bold text-center text-neutral-900">{child.name}</p>

                    {/* 아이 생일 영역 */}
                    <div className="flex justify-center items-center gap-1">
                      {/* 케이크 아이콘 */}
                      <Image src={CakeIcon} alt="케이크 아이콘" />

                      {/* 아이 생일 */}
                      <p className="text-xs font-medium text-center text-gray-400">{child.birth}</p>
                    </div>
                  </div>
                  {/* 이름 & 생년월일 끝 */}

                  {/* 아이 특이사항 */}
                  <p className="w-full h-[50px] text-xs font-medium text-left text-gray-600">
                    {child.notes && <span>{child.notes}</span>}
                  </p>

                  {/* 수정하기 */}
                  <Link key={child.id} href={`/child/${child.id}/childinfo`}>
                    <div className="flex justify-center items-center h-8 gap-[8px] px-4 py-2 rounded-[7px] bg-gray-30 w-full">
                      <button className="text-xs font-medium text-center text-gray-700">수정하기</button>
                    </div>
                  </Link>
                </div>
              </div>

              {/* 아이 기본 정보 내 좌/우 영역 나누기 위한 컨테이너 끝 */}

              {/* 카메라 아이콘 */}
              {/* <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 h-10 w-10 absolute left-[124px] top-[124px] overflow-hidden gap-2.5 p-0.5 rounded-[20px] bg-white">
                <Image src={CameraIcon} alt="카메라 아이콘" />
              </div> */}
            </div>
          </div>
          {/* 아이 기본 정보 컨테이너 끝 */}

          {/* 우리아이 접종 내역 전체 컨테이너 */}
          <div className="w-full flex justify-center items-start flex-grow h-52 gap-[288px] p-4 rounded-2xl bg-primary-300">
            <div className="flex flex-col justify-between items-end self-stretch flex-grow">
              <div className="flex flex-col justify-start items-start self-stretch flex-grow gap-3">
                {/* 우리 아이 접종 내역 타이틀 컨테이너 */}
                <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-4">
                  <div className="w-10 h-10 bg-white rounded-full flex justify-center items-center">
                    <Image src={InjectorIcon} alt="주사기 아이콘" />
                  </div>

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
                  {/* <div className="flex justify-center items-center self-stretch flex-grow relative p-2 rounded-xl">
                    <p className="text-white text-sm">
                      접종 완료 내역과 앞으로의 접종 일정을 간편하게 관리하세요! 아이의 건강 기록을 손쉽게 확인할 수
                      있습니다.
                    </p>
                  </div> */}

                  <div className="flex justify-start items-start self-stretch flex-grow">
                    <div className="flex justify-center items-center self-stretch flex-grow relative gap-4 p-4 rounded-xl bg-white">
                      <div className="flex flex-col justify-center items-center self-stretch flex-grow relative gap-4">
                        <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-gray-600">
                          필수 접종
                        </p>
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#ff7664]">
                          {requiredVaccinesCount} / {totalRequiredVaccines}개
                        </p>
                      </div>

                      <div className="flex flex-col justify-center items-center self-stretch flex-grow relative gap-4">
                        <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-gray-600">
                          선택 접종
                        </p>
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#5ebe15]">
                          {optionalVaccinesCount} / {totalOptionalVaccines}개
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 자세히 보기 컨테이너 */}
                  <div className="flex justify-end items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1">
                    <Link href={`/child/${child.id}`}>
                      <div className="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-1">
                        <p className="flex-grow-0 flex-shrink-0 text-xs font-semibold text-left text-white">
                          자세히 보기
                        </p>
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
          {/* 우리아이 접종 내역 전체 컨테이너 끝*/}
        </div>
        {/* 아이 기본 정보 & 우리 아이 접종 내역 컨테이너 끝*/}

        {/* 접종 일정표 */}
        <Schedule child={child} />
      </div>
    </>
  );
};

export default ChildCard;
