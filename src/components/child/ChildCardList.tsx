import { Child } from '@/types/childType';
import React from 'react'
import ChildCard from './ChildCard';

interface ChildCardListProps {
  children: Child[];
  selectedChildId: string | null;
  onDelete: (id: string) => void;
}

const ChildCardList: React.FC<ChildCardListProps> = ({ children, selectedChildId, onDelete }) => {
  return (
    <div className="flex flex-col gap-4">
      {selectedChildId
        ? children
            .filter((child) => child.id === selectedChildId)
            .map((child) => <ChildCard key={child.id} child={child} onDelete={onDelete} />)
        : null}
    </div>
  );
};

export default ChildCardList