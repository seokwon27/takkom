import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>로고</div>
      <div className="flex gap-2">
        <Link href={"/search"}>병원검색</Link>
        <Link href={"/vaccineinfo"}>접종 정보</Link>
        <Link href={"child"}>우리 아이 맞춤형</Link>
      </div>
    </>
  );
}
