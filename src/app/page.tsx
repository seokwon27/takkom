import Link from "next/link";

const Home = () => {
  return (
    <>
      <div>로고</div>
      <div className="flex gap-2">
        <Link href={"/search"}>병원검색</Link>
        <Link href={"/vaccineinfo"}>접종 정보</Link>
        <Link href={"child"}>우리 아이 맞춤형</Link>
        <Link href={"/signin"}>로그인</Link>
        <Link href={"/signup"}>회원가입</Link>
      </div>
    </>
  );
};

export default Home;
