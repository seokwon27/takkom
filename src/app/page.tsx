import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <div className="flex gap-6 mt-[77px] w-full max-w-[1200px] m-auto">
        <Link
          href={"/vaccineinfo"}
          className="flex bg-[url('/homepage/vaccineInfo-bg.svg')] px-12 py-20 rounded-3xl text-white w-[736px] h-[472px] relative"
        >
          <img src="/homepage/info-link-person.svg" className="absolute -bottom-12 right-11" />
          <div className="flex flex-col justify-center gap-6">
            <div className="z-10">
              <p className="text-[32px] font-bold">지금 아이에게 필요한</p>
              <p className="text-[40px] font-bold">예방 접종 정보 확인하기</p>
            </div>
            <div className="flex justify-center gap-[6px] bg-white text-primary-400 max-w-[135px] p-2 rounded-[50px] text-xl font-bold">
              <div>
                <img src="/homepage/Search-icon.svg" />
              </div>
              <p>보러가기</p>
            </div>
          </div>
        </Link>

        <div className="flex flex-col gap-6 ">
          <Link className="p-[40px] rounded-3xl w-[440px] h-[224px] bg-[#F0F9FF] relative" href={"/child"}>
            <img src="/homepage/child-link-icon.svg" className="absolute right-0" />
            <div className="flex flex-col gap-3">
              <p className="text-2xl text-gray-800 font-bold "> 우리 아이 접종 관리하기</p>
              <p className="text-gray-600">
                아이 맞춤형 접종 정보와 <br />
                접종 내역을 체크할 수 있어요!
              </p>
              <div className="flex gap-2 justify-center items-center border-[1px] border-primary-300 rounded-[19px] w-[103px] h-[38px]">
                <img src="/homepage/add-circle.svg" />
                <p className="text-primary-300 font-semibold">등록하기</p>
              </div>
            </div>
          </Link>
          <Link href={"/search"} className="">
            <img src="/homepage/hospital-link.svg" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
