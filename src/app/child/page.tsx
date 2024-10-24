import ChildCard from "@/components/child/ChildCard";
import RegisterButton from "@/components/child/RegisterButton";

export interface Child {
  name: string;
  birthday: string;
  notes?: string;
  profileImage?: string;
}

const page = () => {
  return (
    <div>
      <h1>우리 아이 접종</h1>
      <RegisterButton />
      <ChildCard child={undefined} />
    </div>
  );
};

export default page;
