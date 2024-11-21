"use client";
import Loading from "@/components/child/loading";
import ErrorMessage from "@/components/child/error";
import useChildrenData from "./useChildrenData";
import ChildPageContent from "./ChildPageContent";

const ChildPageWrap = () => {
  const { children, setChildren, selectedChildId, setSelectedChildId, isUserLoading, isUserError, isLoading, error } =
    useChildrenData();

  // 로딩 중 또는 에러 발생 시 처리
  if (isUserLoading || isLoading) return <Loading />;
  if (isUserError) return <ErrorMessage message="사용자 정보를 가져오는 데 오류가 발생했습니다." />;
  if (error) return <ErrorMessage message={error.message} />;

  const handleTabClick = (childId: string) => {
    setSelectedChildId(childId);
  };

  // 아이 정보 삭제 함수
  const handleDelete = (id: string) => {
    setChildren((prevChildren) => prevChildren.filter((child) => child.id !== id));
  };

  return (
    <div className="container flex flex-col mx-auto justify-center max-w-[996px] mt-16 max-sm:mt-3 max-sm:px-6 max-sm:pb-[132px] max-sm:mb-0 xl:bg-gray-10">
      <div className="py-[6px] mb-4 hidden max-sm:block">
        <p className="text-gray-800 text-title-m font-semibold">우리아이</p>
      </div>

      <ChildPageContent selectedChildId={selectedChildId} onTabClick={handleTabClick} onDelete={handleDelete}>
        {children}
      </ChildPageContent>
    </div>
  );
};

export default ChildPageWrap;
