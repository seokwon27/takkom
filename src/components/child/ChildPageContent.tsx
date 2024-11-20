import React from "react";
import Sidebar from "./Sidebar";
import ChildCardList from "./ChildCardList";
import { Child } from "@/types/childType";
import NoChildren from "./NoChildren";

interface ChildPageContentProps {
  children: Child[];
  selectedChildId: string | null;
  onTabClick: (childId: string) => void;
  onDelete: (id: string) => void;
}

const ChildPageContent: React.FC<ChildPageContentProps> = ({ children, selectedChildId, onTabClick, onDelete }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 max-w-[996px] w-full">
      {/* 좌측 사이드바 영역 */}
      <Sidebar children={children} selectedChildId={selectedChildId} onTabClick={onTabClick} />

      {/* 메인 콘텐츠 영역 */}
      <main className="flex-grow w-full">
        {children && children.length > 0 ? (
          <div className="flex flex-col gap-4">
            <ChildCardList children={children} selectedChildId={selectedChildId} onDelete={onDelete} />
          </div>
        ) : (
          <NoChildren />
        )}
      </main>
    </div>
  );
};

export default ChildPageContent;
