"use client";

import { useVaccineInfoQuery } from "@/query/useVaccineInfoQuery";
import { useAgeGroupStore } from "@/store/ageGroupStore";
import VaccineCard from "./vaccineCard";
import { useEffect, useMemo, useState } from "react";
import SearchButton from "./SearchButton";

import { useQueryClient } from "@tanstack/react-query";
import { fetchCityData } from "@/query/useCityDataQuery";
import VaccineListPage from "./VaccineListPage";

const ITEMS_PER_PAGE = 6;

const VaccineList = () => {
  const [page, setPage] = useState(1);
  const { selectedAge } = useAgeGroupStore();
  const { data: allData, error, isPending } = useVaccineInfoQuery();
  const queryClient = useQueryClient();

  //도시정보 prefetch
  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["cities"],
      queryFn: fetchCityData
    });
  }, []);

  // 선택된 연령에 따라 데이터 필터링
  const filteredData = useMemo(() => {
    if (!allData) return [];
    return selectedAge === 1000
      ? allData
      : allData
          .filter((item) => JSON.parse(item.vaccinate_date || "[]").includes(selectedAge))
          .sort(
            (a, b) =>
              a.disease_name.localeCompare(b.disease_name) ||
              a.vaccine_name.localeCompare(b.vaccine_name) ||
              a.vaccine_turn.localeCompare(b.vaccine_turn)
          );
  }, [allData, selectedAge]);

  // 총 페이지 수 계산
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // 현재 페이지에 해당하는 데이터 계산
  const currentPageData = useMemo(() => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredData.slice(startIndex, endIndex);
  }, [filteredData, page]);

  let startNum = 1;
  if (totalPages >= 5) {
    if (page - 2 >= 1 && page + 2 < totalPages) {
      startNum = page - 2;
    } else if (page + 2 >= totalPages) {
      startNum = totalPages - 4;
    }
  }
  if (page - 2 < 1) {
    startNum = 1;
  }

  //데이터 변동시 페이지 초기화
  useEffect(() => {
    setPage(1);
  }, [filteredData]);

  // 페이지가 유효 범위를 벗어나면 첫 페이지로 리셋
  useMemo(() => {
    if (page > totalPages) {
      setPage(1);
    }
  }, [totalPages, page]);

  if (isPending) return "접종 정보 로딩중...";
  if (error) throw new Error(`Error: ${error}`);

  const handlePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  return (
    <>
      <div className="min-h-[800px]">
        <div className="grid grid-cols-2 gap-6  mb-4 max-sm:grid-cols-1">
          {currentPageData.map((item) => (
            <VaccineCard
              key={item.id}
              disease={item.disease_name}
              vaccine={`${item.vaccine_name} ${item.vaccine_turn}차`}
              target={item.target}
              process={item.process}
              additional={item.additional}
            />
          ))}
        </div>
      </div>
      <SearchButton />

      <VaccineListPage
        startNum={startNum}
        page={page}
        handlePage={handlePage}
        setPage={setPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default VaccineList;
