import ChildCard from "@/components/child/ChildCard";
import RegisterButton from "@/components/child/RegisterButton";
import { useChildInfoQuery } from "@/query/useChildQuery";

const ChildPage = () => {
  const userId = "4c656382-4114-4929-ab84-89ec5a6ddef9"; // 테스트 userId

  const { data: child, isLoading, error } = useChildInfoQuery(userId);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류가 발생했습니다: {error.message}</p>;

  return (
    <div>
      <h1>우리 아이 접종</h1>
      <RegisterButton />
      {child && child.id ? <ChildCard child={child} /> : <p>등록된 아이가 없습니다.</p>}
    </div>
  );
};

export default ChildPage;
