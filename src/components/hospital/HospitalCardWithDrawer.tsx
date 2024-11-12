// "use client";

// import React, { ReactNode, useState } from "react";
// import Image from "next/image";
// import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
// import { User } from "@supabase/supabase-js";
// import { HopsitalItem } from "@/types/hospital";
// import { Like } from "@/types/user";
// import { useAddLikeMutation, useCancelLikeMutation } from "@/query/useLikeMutation";
// import VaccineNames from "./VaccineNames";
// import Tag from "./Tag";
// import { Heart } from "lucide-react";
// import { cn } from "@/lib/utils";
// import Ambulance from "../../../public/hospital/ambulance.svg";
// import PhoneButton from "./PhoneButton";
// import PhoneModal from "./PhoneModal";

// type HospitalCardProps = {
//   user: User | null;
//   hospitalInfo: HopsitalItem;
//   clickedId: number;
//   filter?: string;
//   likes?: Like[];
//   children?: ReactNode;
// };

// const HospitalCardWithDrawer = ({ user, hospitalInfo, clickedId, filter, likes, children }: HospitalCardProps) => {
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const {
//     orgcd,
//     orgnm,
//     orgTlno,
//     orgAddr,
//     vcnList: { vcnInfo }
//   } = hospitalInfo;
//   const like = likes?.some((like) => like.orgcd === orgcd);

//   const vaccineNames = Array.isArray(vcnInfo)
//     ? vcnInfo.map((info) => {
//         return info.vcnNm;
//       })
//     : [vcnInfo?.vcnNm ?? null];
//   vaccineNames.sort((a, b) => a.localeCompare(b));

//   const required = vaccineNames.some(
//     (name) => !!name && !(name.includes("인플루엔자") || name.includes("사람유두종바이러스") || name.includes("PPSV"))
//   );
//   const additional = vaccineNames.some(
//     (name) => !!name && (name.includes("인플루엔자") || name.includes("사람유두종바이러스") || name.includes("PPSV"))
//   );

//   const likeData = likes?.find((like) => like.orgcd === hospitalInfo?.orgcd);

//   const { mutate: addLike } = useAddLikeMutation(user?.id);
//   const { mutate: cancelLike } = useCancelLikeMutation(user?.id);

//   return (
//     <>
//       <Drawer
//         open={isDrawerOpen && orgcd === clickedId}
//         onOpenChange={(open) => {
//           // 모달이 열려 있을 때는 Drawer 닫힘 방지
//           if (!showModal) {
//             setIsDrawerOpen(open);
//           }
//         }}
//       >
//         <DrawerTrigger asChild>
//           <div
//             className={cn(
//               "w-full h-fit min-h-[200px] flex border border-gray-30 rounded-3xl p-4 justify-between items-start shadow-[0px_0px_16px_rgba(114,114,114,0.1)] pointer-active:auto",
//               "max-sm:min-h-fit max-sm:p-3 max-sm:rounded-xl max-sm:shadow-[0px_0px_7px_rgba(114,114,114,0.1)]",
//               orgcd === clickedId && "max-sm:border-primary-400 max-sm:shadow-none"
//             )}
//           >
//             <div className="w-[160px] flex justify-center items-center bg-gray-10 rounded-xl aspect-square overflow-hidden relative max-sm:w-[86px] sm:rounded-md">
//               <Image src={Ambulance} alt="병원 이미지" className="object-cover" />
//               <Heart
//                 fill={like ? `#FF4737` : `#171717`}
//                 size={14}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   if (user) {
//                     if (!likeData) {
//                       addLike({ hospitalInfo });
//                     }
//                     if (!!likeData) {
//                       cancelLike({ id: likeData?.id });
//                     }
//                   }
//                 }}
//                 className={cn(
//                   like ? "text-[#FF4737]" : "text-gray-900",
//                   "opacity-50 absolute top-[6px] left-[6px] aspect-square sm:w-[14px]"
//                 )}
//               />
//             </div>
//             <div className="flex-1 h-full flex flex-col gap-4 mx-[24px] max-sm:ml-2 max-sm:mr-0 max-sm:gap-2">
//               <div className="flex gap-3 max-sm:gap-2">
//                 <Tag />
//                 {required && <Tag name={"required"} />}
//                 {additional && <Tag name={"additional"} />}
//               </div>
//               <div className="max-w-[450px] grid grid-cols-[minmax(52px,80px)_auto] grid-rows-[repeat(3, minmax(0,20px))] gap-2 max-sm:grid-cols-[minmax(0px,45px)_auto] max-sm:gap-x-2 max-sm:gap-y-[2px]">
//                 <p className="text-label-l text-gray-300 max-sm:text-label-s">병원 이름</p>
//                 <p className="text-text-l grow text-gray-700 line-clamp-1 max-sm:text-text-s">{orgnm}</p>

//                 <p className="text-label-l text-gray-300 max-sm:text-label-s">병원 주소</p>
//                 <p className="text-text-l text-gray-700 break-all line-clamp-2 max-sm:text-text-s max-sm:line-clamp-1">
//                   {orgAddr}
//                 </p>

//                 <p className="text-label-l text-gray-300 max-sm:text-label-s max-sm:text-text-s">접종 목록</p>
//                 <div className="text-gray-700">
//                   <VaccineNames filter={filter} vaccineNames={vaccineNames} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </DrawerTrigger>
//         <DrawerContent>
//           <DrawerTitle className="hidden"/>
//           <DrawerDescription className="hidden"/>
//           <PhoneButton phoneNumber={orgTlno}
//           />
//         </DrawerContent>
//       </Drawer>
//       {showModal && <PhoneModal phoneNumber={orgTlno} setShowModal={setShowModal} />}
//     </>
//   );
// };

// export default HospitalCardWithDrawer;