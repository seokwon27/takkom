"use client";
import browserClient from "@/utils/supabase/client";
import { useUserQuery } from "@/query/useUserQuery";
import { useChildrenQuery } from "@/query/useChildQuery";
import { useEffect, useState } from "react";
import { Child } from "@/types/childType";

const useChildrenData = () => {
  const [selectedChildId, setSelectedChildId] = useState<string | null>(null);
  const { data: user, isLoading: isUserLoading, isError: isUserError } = useUserQuery(browserClient);
  const userId = user?.id;
  const { data: childrenData, isLoading, error } = useChildrenQuery(browserClient, userId);

  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    if (childrenData) {
      const sortedChildren = [...childrenData].sort((a, b) => {
        const dateA = new Date(a.birth).getTime();
        const dateB = new Date(b.birth).getTime();
        return dateA - dateB;
      });
      setChildren(sortedChildren);
      if (sortedChildren.length > 0) {
        setSelectedChildId(sortedChildren[0].id);
      }
    }
  }, [childrenData]);

  return {
    children,
    setChildren,
    selectedChildId,
    setSelectedChildId,
    isUserLoading,
    isUserError,
    isLoading,
    error
  };
};

export default useChildrenData;
