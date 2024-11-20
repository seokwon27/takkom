import React from "react";
import ChildTapIconActive from "../../../public/child/child-icon-white.svg";
import ChildTapIcon from "../../../public/child/child-icon-gray.svg";
import RegisterButton from "@/components/child/RegisterButton";
import { Child } from "@/types/childType";
import Image from "next/image";

interface SidebarProps {
  children: Child[];
  selectedChildId: string | null;
  onTabClick: (childId: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ children, selectedChildId, onTabClick }) => {
  return (
    <aside className="w-full bg-white lg:max-w-[180px] max-lg:w-auto max-sm:p-0">
      <div className="flex flex-col max-lg:flex-row p-3 rounded-xl bg-white shadow-[0px_0px_12px_#7272721A] gap-2">
        {children && children.length > 0 && (
          <div className="flex flex-col overflow-x-auto max-lg:flex-row lg:flex-col gap-2">
            {children.map((child) => (
              <button
                key={child.id}
                className={`flex items-center lg:w-full max-lg:w-auto shirnk-0 truncate shrink-0 rounded-lg px-3 py-2 gap-2 ${
                  selectedChildId === child.id ? "bg-primary-300 text-white" : "bg-white"
                }`}
                onClick={() => onTabClick(child.id)}
              >
                <Image
                  src={selectedChildId === child.id ? ChildTapIconActive : ChildTapIcon}
                  width={18}
                  height={18}
                  alt="아이 탭 메뉴 아이콘"
                  className=""
                />
                {child.name}
              </button>
            ))}
          </div>
        )}
        <div className="flex items-center shrink-0 grow-0 justify-start">
          <RegisterButton />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
