"use client";

import { HopsitalItem } from "@/types/hospital";
import React, { ReactNode, useState } from "react";
import Image from "next/image";
import { useAddLikeMutation, useCancelLikeMutation } from "@/query/useLikeMutation";
import { checkRequired } from "@/utils/hospital/utils";
import PhoneButton from "./PhoneButton";
import VaccineNames from "./VaccineNames";
import Ambulance from "../../../public/hospital/ambulance.svg";
import VaccinateTag from "./VaccinateTag";
import { Like } from "@/types/user";
import { Heart } from "lucide-react";
import { User } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import PhoneModal from "./PhoneModal";

type HospitalCardProps = {
  user: User | null;
  hospitalInfo: HopsitalItem;
  clickedId: number;
  filter?: string;
  likes?: Like[];
  children?: ReactNode;
};

const HospitalCard = ({ user, hospitalInfo, clickedId, filter, likes }: HospitalCardProps) => {
  const {
    orgcd,
    orgnm,
    orgTlno,
    orgAddr,
    vcnList: { vcnInfo }
  } = hospitalInfo;
  const [showModal, setShowModal] = useState(false);
  const like = likes?.some((like) => like.orgcd === orgcd);

  const vaccineNames = Array.isArray(vcnInfo)
    ? vcnInfo.map((info) => {
        return info.vcnNm;
      })
    : [vcnInfo?.vcnNm ?? null];
  vaccineNames.sort((a, b) => a.localeCompare(b));

  const [required, additional] = checkRequired(vaccineNames);

  const likeData = likes?.find((like) => like.orgcd === hospitalInfo?.orgcd);

  const { mutate: addLike } = useAddLikeMutation(user?.id);
  const { mutate: cancelLike } = useCancelLikeMutation(user?.id);

  const onHeartClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (user) {
      if (!likeData) {
        addLike({ hospitalInfo });
      }
      if (!!likeData) {
        cancelLike({ id: likeData?.id });
      }
    }
  };

  return (
    <>
      <div
        className={cn(
          "w-full h-fit min-h-[200px] flex border border-gray-30 rounded-3xl p-5 justify-between items-start shadow-[0px_0px_16px_rgba(114,114,114,0.1)]",
          "max-sm:min-h-fit max-sm:p-3 max-sm:rounded-xl max-sm:shadow-[0px_0px_7px_rgba(114,114,114,0.1)]",
          orgcd === clickedId && "max-sm:border-primary-400 max-sm:shadow-none"
        )}
      >
        <div className="size-[160px] flex justify-center items-center bg-gray-10 rounded-xl overflow-hidden relative max-sm:size-[86px] max-sm:rounded-md">
          <Image src={Ambulance} alt="병원 이미지" className="object-cover" />
          <div
            className=" absolute top-[6px] left-[6px] aspect-square cursor-pointer sm:top-3 sm:left-3 sm:w-10 sm:p-1"
            onClick={onHeartClick}
          >
            <Heart
              fill={like ? `#FF4737` : `#171717`}
              // size={14}
              className={cn("opacity-50 size-[14px] sm:size-6", {
                "text-[#FF4737]": like,
                "text-gray-900": !like
              })}
            />
          </div>
        </div>
        <div className="flex-1 h-full flex flex-col gap-4 mx-[24px] max-sm:ml-2 max-sm:mr-0 max-sm:gap-2">
          <div className="flex gap-3 max-sm:gap-2">
            <VaccinateTag />
            {required && <VaccinateTag name={"required"} />}
            {additional && <VaccinateTag name={"additional"} />}
          </div>
          <div className="max-w-[450px] items-center grid grid-cols-[minmax(52px,80px)_auto] grid-rows-[repeat(3, minmax(0,20px))] gap-2 max-sm:grid-cols-[minmax(0px,45px)_auto] max-sm:gap-x-2 max-sm:gap-y-[2px]">
            <p className="text-label-l text-gray-300 max-sm:text-label-s">병원 이름</p>
            <p className="text-text-l grow text-gray-700 line-clamp-1 max-sm:text-text-s">{orgnm}</p>

            <p className="mt-0 mb-auto text-label-l text-gray-300 max-sm:text-label-s">병원 주소</p>
            <p className="text-text-l text-gray-700 break-all line-clamp-2 max-sm:text-text-s max-sm:line-clamp-1">
              {orgAddr}
            </p>

            <p className="text-label-l text-gray-300 max-sm:text-label-s max-sm:text-text-s">접종 목록</p>
            <div className="text-gray-700">
              <VaccineNames filter={filter} vaccineNames={vaccineNames} />
            </div>
          </div>
        </div>
        <div className="mt-auto max-sm:hidden">
          <PhoneButton
            onClick={() => {
              setShowModal(true);
            }}
          />
        </div>
      </div>
      {showModal && <PhoneModal phoneNumber={orgTlno} setShowModal={setShowModal} />}
    </>
  );
};

export default HospitalCard;
