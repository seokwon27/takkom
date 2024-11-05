"use client";

import Link from "next/link";
import React from "react";

const RegisterButton = () => {
  return (
    <>
      <div className="flex flex-col justify-start items-start w-[180px] gap-2 p-3 rounded-xl bg-white shadow-[0px_0px_12px_#7272721A]">
        {/* <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1 px-3 py-2 rounded-lg bg-[#5c99ff]">
          <svg
            width={18}
            height={19}
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-[18px] h-[18px] relative"
            preserveAspectRatio="xMidYMid meet"
          >
            <g clip-path="url(#clip0_1843_7378)">
              <path
                d="M9 16.25C12.7279 16.25 15.75 13.2279 15.75 9.5C15.75 5.77208 12.7279 2.75 9 2.75C5.27208 2.75 2.25 5.77208 2.25 9.5C2.25 13.2279 5.27208 16.25 9 16.25Z"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.75 8H6.7575"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.25 8H11.2575"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.125 11.75C7.36941 11.9994 7.66114 12.1976 7.9831 12.3329C8.30505 12.4682 8.65077 12.5379 9 12.5379C9.34923 12.5379 9.69495 12.4682 10.0169 12.3329C10.3389 12.1976 10.6306 11.9994 10.875 11.75"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 2.75C8.60218 2.75 8.22064 2.90804 7.93934 3.18934C7.65804 3.47064 7.5 3.85218 7.5 4.25C7.5 4.64782 7.65804 5.02936 7.93934 5.31066C8.22064 5.59196 8.60218 5.75 9 5.75"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
          <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-white">김하온</p>
        </div>
        <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1 px-3 py-2 rounded-lg">
          <svg
            width={18}
            height={19}
            viewBox="0 0 18 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-[18px] h-[18px] relative"
            preserveAspectRatio="xMidYMid meet"
          >
            <g clip-path="url(#clip0_1843_7387)">
              <path
                d="M9 16.25C12.7279 16.25 15.75 13.2279 15.75 9.5C15.75 5.77208 12.7279 2.75 9 2.75C5.27208 2.75 2.25 5.77208 2.25 9.5C2.25 13.2279 5.27208 16.25 9 16.25Z"
                stroke="#636363"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.75 8H6.7575"
                stroke="#636363"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M11.25 8H11.2575"
                stroke="#636363"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.125 11.75C7.36941 11.9994 7.66114 12.1976 7.9831 12.3329C8.30505 12.4682 8.65077 12.5379 9 12.5379C9.34923 12.5379 9.69495 12.4682 10.0169 12.3329C10.3389 12.1976 10.6306 11.9994 10.875 11.75"
                stroke="#636363"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 2.75C8.60218 2.75 8.22064 2.90804 7.93934 3.18934C7.65804 3.47064 7.5 3.85218 7.5 4.25C7.5 4.64782 7.65804 5.02936 7.93934 5.31066C8.22064 5.59196 8.60218 5.75 9 5.75"
                stroke="#636363"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
    
          </svg>
          <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#636363]">김가온</p>
        </div> */}
        <Link href="/child/register">
          <div className="group flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 relative gap-1 px-3 py-2 rounded-lg hover:bg-[#5c99ff]">
            <svg
              width={18}
              height={19}
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0 w-[18px] h-[18px] relative group-hover:fill-white"
              preserveAspectRatio="none"
            >
              <path
                d="M9 17C4.85775 17 1.5 13.6423 1.5 9.5C1.5 5.35775 4.85775 2 9 2C13.1423 2 16.5 5.35775 16.5 9.5C16.5 13.6423 13.1423 17 9 17ZM9 15.5C10.5913 15.5 12.1174 14.8679 13.2426 13.7426C14.3679 12.6174 15 11.0913 15 9.5C15 7.9087 14.3679 6.38258 13.2426 5.25736C12.1174 4.13214 10.5913 3.5 9 3.5C7.4087 3.5 5.88258 4.13214 4.75736 5.25736C3.63214 6.38258 3 7.9087 3 9.5C3 11.0913 3.63214 12.6174 4.75736 13.7426C5.88258 14.8679 7.4087 15.5 9 15.5ZM9.75 10.25V13.25C9.75 13.4489 9.67098 13.6397 9.53033 13.7803C9.38968 13.921 9.19891 14 9 14C8.80109 14 8.61032 13.921 8.46967 13.7803C8.32902 13.6397 8.25 13.4489 8.25 13.25V10.25H5.25C5.05109 10.25 4.86032 10.171 4.71967 10.0303C4.57902 9.88968 4.5 9.69891 4.5 9.5C4.5 9.30109 4.57902 9.11032 4.71967 8.96967C4.86032 8.82902 5.05109 8.75 5.25 8.75H8.25V5.75C8.25 5.55109 8.32902 5.36032 8.46967 5.21967C8.61032 5.07902 8.80109 5 9 5C9.19891 5 9.38968 5.07902 9.53033 5.21967C9.67098 5.36032 9.75 5.55109 9.75 5.75V8.75H12.75C12.9489 8.75 13.1397 8.82902 13.2803 8.96967C13.421 9.11032 13.5 9.30109 13.5 9.5C13.5 9.69891 13.421 9.88968 13.2803 10.0303C13.1397 10.171 12.9489 10.25 12.75 10.25H9.75Z"
                fill="#5c99ff"
                className="group-hover:fill-white"
              />
            </svg>
            <p className="flex-grow-0 flex-shrink-0 text-sm font-semibold text-left text-[#5c99ff] group-hover:text-white">
              아이 등록하기
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default RegisterButton;
