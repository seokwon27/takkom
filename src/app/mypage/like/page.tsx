import { getUser } from "@/api/userApi";
import LikeList from "@/components/like/LikeList";
import { createClient } from "@/utils/supabase/server";
import React from "react";
import { ChevronLeft } from "lucide-react";
import MobileLayout from "@/components/layout/MobileLayout";
import Link from "next/link";

type LikePageParams = { searchParams: { pageNo: string } };

const LikePage = async ({ searchParams }: LikePageParams) => {
  const currentPage = Number(searchParams.pageNo);
  const supabaseClient = createClient();
  const user = await getUser(supabaseClient);

  return (
    <>
      <MobileLayout className="sticky top-0 z-10">
        <div className="w-full h-12 flex items-center pt-3 pb-1 px-6 bg-white border-b border-gray-30 text-center relative">
          <Link href={"/mypage"}>
            <ChevronLeft size={24} className="w-6 h-6 text-gray-400" />
          </Link>
          <p className="absolute left-[50%] -translate-x-1/2 max-sm:text-title-xs max-sm:font-semibold">관심 병원</p>
        </div>
      </MobileLayout>
      <section className="w-full grow flex flex-col justify-between items-center mt-16 mb-6 bg-white max-sm:mt-10 max-sm:mb-0 max-sm:px-0 max-sm:pb-0">
        <LikeList currentPage={currentPage} user={user} />
      </section>
    </>
  );
};

export default LikePage;
