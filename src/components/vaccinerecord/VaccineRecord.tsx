"use client";

import { useVaccineQuery, useVaccineRecordQuery } from "@/query/useVaccineRecordQuery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import VaccineRecordList from "./VaccineRecordList";
import Link from "next/link";
import { Button } from "../ui/button";

interface VaccineRecordProps {
  childId: string;
}

const VaccineRecord = ({ childId }: VaccineRecordProps) => {
  const { data: vaccineData, isLoading: vaccineLoading } = useVaccineQuery();
  const { data: vaccineRecord, isLoading: recordLoading } = useVaccineRecordQuery(childId);

  if (vaccineLoading || recordLoading) return <div>Loading...</div>;

  const vaccinated = new Set(vaccineRecord);

  const getFilteredVaccineData = (filter: "전체" | "접종 완료" | "미접종") => {
    if (filter === "전체") return vaccineData;

    return vaccineData?.filter((disease) => {
      const allCheckedVaccine = disease.vaccines.every((vaccine) => vaccine.ids.every((id) => vaccinated.has(id)));

      if (filter === "접종 완료") return allCheckedVaccine;

      if (filter === "미접종") return !allCheckedVaccine;
    });
  };

  return (
    <Tabs defaultValue="전체">
      <TabsList className="flex flex-row justify-between bg-transparent">
        <div>
          <TabsTrigger value="전체" className="rounded-md border">
            전체
          </TabsTrigger>
          <TabsTrigger value="접종 완료" className="rounded-md border">
            접종완료
          </TabsTrigger>
          <TabsTrigger value="미접종" className="rounded-md border">
            미접종
          </TabsTrigger>
        </div>
        <Link href={`/child/${childId}/edit2`}>
          <Button>수정하기</Button>
        </Link>
      </TabsList>

      <TabsContent value="전체">
        <VaccineRecordList data={getFilteredVaccineData("전체")} vaccinated={vaccinated} />
      </TabsContent>
      <TabsContent value="접종 완료">
        <VaccineRecordList data={getFilteredVaccineData("접종 완료")} vaccinated={vaccinated} />
      </TabsContent>
      <TabsContent value="미접종">
        <VaccineRecordList data={getFilteredVaccineData("미접종")} vaccinated={vaccinated} />
      </TabsContent>
    </Tabs>
  );
};

export default VaccineRecord;
