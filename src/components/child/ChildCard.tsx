import React from "react";
import { Child } from "@/types/childType";
import Image from "next/image";
import { DEFAULT_PROFILE_IMAGE_URL } from "@/utils/supabase/client";
import Link from "next/link";
import Schedule from "./Schedule";

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
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-grow-0 flex-shrink-0 w-[18px] h-[18px] relative"
                        preserveAspectRatio="xMidYMid meet"
                      >
                        <g filter="url(#filter0_d_1843_7286)">
                          <rect x={3} y={3} width={18} height={18} rx={9} fill="white" />
                          <rect
                            x="3.375"
                            y="3.375"
                            width="17.25"
                            height="17.25"
                            rx="8.625"
                            stroke="#8FB9FF"
                            stroke-width="0.75"
                          />
                          <path
                            d="M16.2777 12.6155V13.1155H15.8427C15.4727 13.1155 15.1727 13.4155 15.1727 13.7905V13.9405C15.1727 14.3155 14.8727 14.6155 14.4977 14.6155C14.1277 14.6155 13.8277 14.3155 13.8277 13.9405V13.7905C13.8277 13.4155 13.5227 13.1155 13.1527 13.1155C12.7827 13.1155 12.4827 13.4155 12.4827 13.7905V13.9405C12.4827 14.3155 12.1777 14.6155 11.8077 14.6155C11.4377 14.6155 11.1327 14.3155 11.1327 13.9405V13.7905C11.1327 13.4155 10.8327 13.1155 10.4627 13.1155C10.0927 13.1155 9.7877 13.4155 9.7877 13.7905V13.9405C9.7877 14.3155 9.4877 14.6155 9.1177 14.6155C8.7427 14.6155 8.4427 14.3155 8.4427 13.9405V13.7805C8.4427 13.4105 8.1477 13.1105 7.7827 13.1055H7.3877V12.6155C7.3877 11.9255 7.9077 11.3405 8.6127 11.1705C8.7527 11.1355 8.8977 11.1155 9.0527 11.1155H14.6127C14.7677 11.1155 14.9127 11.1355 15.0527 11.1705C15.7577 11.3405 16.2777 11.9255 16.2777 12.6155Z"
                            fill="#FF9191"
                          />
                          <path
                            opacity="0.4"
                            d="M15.0523 9.70097V11.171C14.9123 11.136 14.7673 11.116 14.6123 11.116H9.0523C8.8973 11.116 8.7523 11.136 8.6123 11.171V9.70097C8.6123 9.10097 9.1523 8.61597 9.8223 8.61597H13.8423C14.5123 8.61597 15.0523 9.10097 15.0523 9.70097Z"
                            fill="#FF9B9B"
                          />
                          <path
                            d="M10.208 7.89049V8.62049H9.82301C9.69301 8.62049 9.57301 8.63549 9.45801 8.66549V7.89049C9.45801 7.71549 9.62801 7.56549 9.83301 7.56549C10.038 7.56549 10.208 7.71549 10.208 7.89049Z"
                            fill="#FF8282"
                          />
                          <path
                            d="M14.207 7.78027V8.66527C14.092 8.63027 13.972 8.61527 13.842 8.61527H13.457V7.78027C13.457 7.57527 13.627 7.40527 13.832 7.40527C14.037 7.40527 14.207 7.57527 14.207 7.78027Z"
                            fill="#FF8282"
                          />
                          <path
                            d="M12.207 7.52566V8.61566H11.457V7.52566C11.457 7.30066 11.627 7.11566 11.832 7.11566C12.037 7.11566 12.207 7.30066 12.207 7.52566Z"
                            fill="#FF8282"
                          />
                          <path
                            opacity="0.4"
                            d="M16.457 16.3652H16.277V13.1152H15.842C15.472 13.1152 15.172 13.4152 15.172 13.7902V13.9402C15.172 14.3152 14.872 14.6152 14.497 14.6152C14.127 14.6152 13.827 14.3152 13.827 13.9402V13.7902C13.827 13.4152 13.522 13.1152 13.152 13.1152C12.782 13.1152 12.482 13.4152 12.482 13.7902V13.9402C12.482 14.3152 12.177 14.6152 11.807 14.6152C11.437 14.6152 11.132 14.3152 11.132 13.9402V13.7902C11.132 13.4152 10.832 13.1152 10.462 13.1152C10.092 13.1152 9.78703 13.4152 9.78703 13.7902V13.9402C9.78703 14.3152 9.48703 14.6152 9.11703 14.6152C8.74203 14.6152 8.44203 14.3152 8.44203 13.9402V13.7802C8.44203 13.4102 8.14703 13.1102 7.78203 13.1052H7.38703V16.3652H7.20703C7.00203 16.3652 6.83203 16.5352 6.83203 16.7402C6.83203 16.9452 7.00203 17.1152 7.20703 17.1152H7.38703H16.277H16.457C16.662 17.1152 16.832 16.9452 16.832 16.7402C16.832 16.5352 16.662 16.3652 16.457 16.3652Z"
                            fill="#FF9B9B"
                          />
                        </g>
                      </svg>

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
              <svg
                width={20}
                height={18}
                viewBox="0 0 20 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 2H5L7 0H13L15 2H18C18.5304 2 19.0391 2.21071 19.4142 2.58579C19.7893 2.96086 20 3.46957 20 4V16C20 16.5304 19.7893 17.0391 19.4142 17.4142C19.0391 17.7893 18.5304 18 18 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V4C0 3.46957 0.210714 2.96086 0.585786 2.58579C0.960859 2.21071 1.46957 2 2 2ZM10 5C8.67392 5 7.40215 5.52678 6.46447 6.46447C5.52678 7.40215 5 8.67392 5 10C5 11.3261 5.52678 12.5979 6.46447 13.5355C7.40215 14.4732 8.67392 15 10 15C11.3261 15 12.5979 14.4732 13.5355 13.5355C14.4732 12.5979 15 11.3261 15 10C15 8.67392 14.4732 7.40215 13.5355 6.46447C12.5979 5.52678 11.3261 5 10 5ZM10 7C10.7956 7 11.5587 7.31607 12.1213 7.87868C12.6839 8.44129 13 9.20435 13 10C13 10.7956 12.6839 11.5587 12.1213 12.1213C11.5587 12.6839 10.7956 13 10 13C9.20435 13 8.44129 12.6839 7.87868 12.1213C7.31607 11.5587 7 10.7956 7 10C7 9.20435 7.31607 8.44129 7.87868 7.87868C8.44129 7.31607 9.20435 7 10 7Z"
                  fill="black"
                />
              </svg>
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
                  <svg
                    width={68}
                    height={68}
                    viewBox="0 0 68 68"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="flex-grow-0 flex-shrink-0 w-10 h-10 relative"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <g filter="url(#filter0_d_1843_7307)">
                      <rect x={14} y={14} width={40} height={40} rx={20} fill="white" />
                      <g opacity="0.5">
                        <path
                          d="M40.0468 30.9896L37.011 27.9538C36.1782 27.121 35.7618 26.7046 35.2883 26.5322C34.7861 26.3495 34.2357 26.3495 33.7335 26.5322C33.26 26.7046 32.8436 27.121 32.0108 27.9538L27.2786 32.686C25.0595 34.9051 25.0595 38.5029 27.2786 40.722C29.4976 42.941 33.0954 42.941 35.3145 40.722L40.0468 35.9897C40.8795 35.1569 41.296 34.7405 41.4683 34.267C41.6511 33.7649 41.6511 33.2144 41.4683 32.7123C41.296 32.2388 40.8795 31.8224 40.0468 30.9896Z"
                          fill="#8FB9FF"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M38.7464 24.8677C39.07 24.5441 39.5947 24.5441 39.9183 24.8677L43.1327 28.0821C43.4563 28.4057 43.4563 28.9304 43.1327 29.2541C42.8091 29.5777 42.2844 29.5777 41.9608 29.2541L38.7464 26.0397C38.4227 25.7161 38.4227 25.1914 38.7464 24.8677Z"
                          fill="#8FB9FF"
                        />
                      </g>
                      <path
                        d="M39.9686 36.0682L31.9327 28.0322L30.7607 29.2042L38.7967 37.2401L39.9686 36.0682Z"
                        fill="#2979FF"
                      />
                      <path
                        d="M26.7351 40.0933C26.8985 40.3126 27.0797 40.5228 27.2788 40.7218C27.4778 40.9208 27.6879 41.102 27.9071 41.2653L26.0397 43.1326C25.7161 43.4562 25.1914 43.4562 24.8677 43.1326C24.5441 42.809 24.5441 42.2843 24.8677 41.9607L26.7351 40.0933Z"
                        fill="#2979FF"
                      />
                      <path
                        d="M39.1153 30.0577L37.9434 28.8857L39.768 27.061L40.94 28.233L39.1153 30.0577Z"
                        fill="#2979FF"
                      />
                      <path
                        d="M37.5073 38.529C37.5072 38.529 37.5073 38.529 37.5073 38.529L34.3191 35.3409C33.9955 35.0172 33.4708 35.0172 33.1471 35.3409C32.8235 35.6645 32.8235 36.1892 33.1471 36.5128L36.3353 39.701C36.3353 39.701 36.3353 39.701 36.3353 39.701L37.5073 38.529Z"
                        fill="#2979FF"
                      />
                      <path
                        d="M35.6992 40.3371C35.6992 40.3371 35.6992 40.3371 35.6992 40.3371L33.8805 38.5185C33.5569 38.1948 33.0322 38.1948 32.7085 38.5185C32.3849 38.8421 32.3849 39.3668 32.7085 39.6904L34.4502 41.4321C34.7552 41.2281 35.0448 40.9915 35.3141 40.7222L35.6992 40.3371Z"
                        fill="#2979FF"
                      />
                    </g>
                  </svg>
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
                  <div className="flex justify-start items-start self-stretch flex-grow gap-2">
                    <div className="flex justify-center items-center self-stretch flex-grow relative gap-4 p-4 rounded-xl bg-white">
                      <div className="flex flex-col justify-center items-center self-stretch flex-grow relative gap-4">
                        <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-[#636363]">
                          필수 접종
                        </p>
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#ff7664]">4개</p>
                      </div>
                      <svg
                        width={2}
                        height={61}
                        viewBox="0 0 2 61"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-grow-0 flex-shrink-0"
                        preserveAspectRatio="none"
                      >
                        <path d="M1 0.5V60.5" stroke="#C2D9FF" stroke-linecap="round" />
                      </svg>
                      <div className="flex flex-col justify-center items-center self-stretch flex-grow relative gap-4">
                        <p className="flex-grow-0 flex-shrink-0 text-base font-semibold text-left text-[#636363]">
                          선택 접종
                        </p>
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#5ebe15]">2개</p>
                      </div>
                    </div>
                  </div>

                  {/* 자세히 보기 컨테이너 */}
                  <div className="flex justify-end items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1">
                    <div className="flex flex-col justify-center items-start flex-grow-0 flex-shrink-0 relative gap-1">
                      <Link href={`/child/${child.id}`}>
                        <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-white">
                          자세히 보기
                        </p>
                      </Link>
                    </div>
                    <svg
                      width={18}
                      height={19}
                      viewBox="0 0 18 19"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="flex-grow-0 flex-shrink-0 w-[18px] h-[18px] relative"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M8.25 7.25L10.5 9.5L8.25 11.75M2.25 9.5C2.25 10.3864 2.42459 11.2642 2.76381 12.0831C3.10303 12.9021 3.60023 13.6462 4.22703 14.273C4.85382 14.8998 5.59794 15.397 6.41689 15.7362C7.23583 16.0754 8.11358 16.25 9 16.25C9.88642 16.25 10.7642 16.0754 11.5831 15.7362C12.4021 15.397 13.1462 14.8998 13.773 14.273C14.3998 13.6462 14.897 12.9021 15.2362 12.0831C15.5754 11.2642 15.75 10.3864 15.75 9.5C15.75 7.70979 15.0388 5.9929 13.773 4.72703C12.5071 3.46116 10.7902 2.75 9 2.75C7.20979 2.75 5.4929 3.46116 4.22703 4.72703C2.96116 5.9929 2.25 7.70979 2.25 9.5Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
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
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g clip-path="url(#clip0_1843_7335)">
                    <path
                      d="M5.60059 6.57073C5.60059 5.62395 6.36809 4.85645 7.31487 4.85645H17.0292C17.9759 4.85645 18.7434 5.62395 18.7434 6.57073V17.9993C18.7434 18.946 17.9759 19.7136 17.0292 19.7136H7.31487C6.36809 19.7136 5.60059 18.946 5.60059 17.9993V6.57073Z"
                      fill="#8FB9FF"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M9.31613 4.85672C9.31613 4.22554 9.82781 3.71387 10.459 3.71387H13.8876C14.5187 3.71387 15.0304 4.22554 15.0304 4.85672V5.42815C15.0304 6.05934 14.5187 6.57101 13.8876 6.57101H10.459C9.82781 6.57101 9.31613 6.05934 9.31613 5.42815V4.85672ZM12.1733 9.71499C12.6467 9.71499 13.0304 10.0987 13.0304 10.5721V12.5721H15.0304C15.5038 12.5721 15.8876 12.9559 15.8876 13.4293C15.8876 13.9027 15.5038 14.2864 15.0304 14.2864H13.0304V16.2864C13.0304 16.7598 12.6467 17.1436 12.1733 17.1436C11.6999 17.1436 11.3161 16.7598 11.3161 16.2864V14.2864H9.31613C8.84274 14.2864 8.45898 13.9027 8.45898 13.4293C8.45898 12.9559 8.84274 12.5721 9.31613 12.5721H11.3161V10.5721C11.3161 10.0987 11.6999 9.71499 12.1733 9.71499Z"
                      fill="#00358F"
                    />
                  </g>
                </svg>
                <p className="flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-[#4a4a4a]">접종 체크리스트</p>
              </div>

              {/*  월 */}
              {/* <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative px-1.5 py-0.5 rounded bg-[#f2f2f2]">
                <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#636363]">10월</p>
                <svg
                  width={22}
                  height={22}
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="flex-grow-0 flex-shrink-0 w-[22px] h-[22px] relative"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M6.875 8.93744L11 13.0624L15.125 8.93744"
                    stroke="#636363"
                    stroke-width="1.375"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
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
