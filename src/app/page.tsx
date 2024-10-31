import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <div className="flex gap-6 justify-center mt-[77px] w-full">
        <Link className=" bg-gray-30 p-[80px] rounded-3xl w-full" href={"/vaccineinfo"}>
          <div className="max-w-[327px]">지금 우리 아이에게 필요한 예방 접종 정보 확인하기</div>
        </Link>

        <div className="flex flex-col gap-6 w-2/5">
          <Link className=" bg-gray-30 p-[40px] rounded-3xl" href={"/search"}>
            연령별 예방 접종 정보
          </Link>
          <Link className=" bg-gray-30 p-[40px] rounded-3xl" href={"child"}>
            우리 아이 접종 관리하기
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
