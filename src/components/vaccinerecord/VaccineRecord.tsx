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

  const getFilteredVaccineData = (filter: string) => {
    if (filter === "전체") return vaccineData;

    return vaccineData?.filter((vaccine) => {
      const allCheckedVaccine = vaccine.disease.every((disease) => disease.ids.every((id) => vaccinated.has(id)));

      if (filter === "접종 완료") return allCheckedVaccine;

      if (filter === "미접종") return !allCheckedVaccine;
    });
  };

  const tabs = ["전체", "접종 완료", "미접종"];

  return (
    <Tabs defaultValue="전체" className="flex flex-col items-start gap-4 self-stretch relative w-full flex-[0_0_auto]">
      <TabsList className="flex justify-between items-center px-8 py-0 self-stretch w-full bg-transparent">
        <div className="inline-flex items-center gap-2 relative ">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="group flex w-20 items-center justify-center gap-2.5 p-2 relative rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gray-700"
            >
              <p className="relative w-fit mt-[-2.00px] text-gray-300 group-data-[state=active]:text-gray-700 whitespace-nowrap hover:text-gray-700">
                {tab}
              </p>
            </TabsTrigger>
          ))}
        </div>
        <Link
          href={`/child/${childId}/edit2`}
          className="inline-flex justify-center gap-2.5 px-3 py-1.5 rounded-[15px] items-center"
        >
          <Button className="w-fit mt-[-1.00px] text-primary-300 whitespace-nowrap bg-transparent hover:bg-primary-50">
            수정하기
          </Button>
        </Link>
      </TabsList>

      {tabs.map((tab) => (
        <TabsContent key={tab} value={tab} className="w-full">
          <VaccineRecordList data={getFilteredVaccineData(tab)} vaccinated={vaccinated} edit={false} />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default VaccineRecord;
