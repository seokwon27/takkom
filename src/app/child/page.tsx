import ChildCard from "@/components/child/ChildCard";
import RegisterButton from "@/components/child/RegisterButton";
import { useChildInfoQuery } from "@/query/useChildQuery";

export interface Child {
  id: string;
  user_id: string | null;
  name: string | null;
  birth: string | null;
  notes?: string | null;
  profileImage?: string | null;
}

const ChildPage = () => {
  const userId = "4c656382-4114-4929-ab84-89ec5a6ddef9"; // 테스트 userId

  const { data: children, isLoading, error } = useChildInfoQuery(userId);

  if (isLoading) return <p>로딩 중...</p>;
  if (error) return <p>오류가 발생했습니다: {error.message}</p>;

  return (
    <div>
      <h1>우리 아이 접종</h1>
      <RegisterButton />
      {children && children.length > 0 ? (
        children.map((child) => (child && child.id ? <ChildCard key={child.id} child={child} /> : null))
      ) : (
        <p>등록된 아이가 없습니다.</p>
      )}
    </div>
  );
};

export default ChildPage;
