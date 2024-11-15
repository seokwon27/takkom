import Info from "@/components/mypage/UserInfo";
import { Heart } from "lucide-react";
import Link from "next/link";

const MyPage = () => {
  return (
    <section className="max-sm:px-6">
      <div className="w-full h-10 flex justify-between items-center mt-3 text-title-m text-gray-800 font-bold sm:hidden">
        <p>마이페이지</p>
        <Link href='/mypage/like?pageNo=1'><Heart className="w-6 h-6 text-gray-400"/></Link>
        
      </div>
      <Info />
    </section>
  );
};

export default MyPage;
