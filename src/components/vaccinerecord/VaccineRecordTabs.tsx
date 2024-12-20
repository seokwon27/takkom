"use client";

import { useVaccineQuery, useVaccineRecordQuery } from "@/query/useVaccineRecordQuery";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import VaccineRecordList from "./VaccineRecordList";
import Link from "next/link";
import { Button } from "../ui/button";
import { Control } from "react-hook-form";
import CheckboxForm, { FormValues } from "./CheckboxForm";
import { useRouter } from "next/navigation";
import { useRef } from "react";

interface VaccineRecordProps {
  childId: string;
  edit: boolean;
  control?: Control<FormValues>;
}

const VaccineRecordTabs = ({ childId, edit, control }: VaccineRecordProps) => {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
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

  const onSuccess = () => {
    router.push(`/child/${childId}`);
  };

  const handleSubmitButton = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };

  return (
    <Tabs
      defaultValue="전체"
      className="flex flex-col items-center sm:items-start gap-2 sm:gap-4 self-stretch relative w-full sm:max-w-[796px]"
    >
      <div className="flex justify-between items-center py-0 self-stretch w-full sm:min-h-[38px] sm:px-8">
        <TabsList className="flex items-center gap-2 sm:px-6 relative bg-transparent">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="group flex items-center justify-center gap-2.5 p-2 w-16 relative rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gray-700 data-[state=active]:shadow-none md:w-20"
            >
              <p className="relative text-heading-xxs font-bold text-gray-300 group-data-[state=active]:text-gray-700 hover:text-gray-700">
                {tab}
              </p>
            </TabsTrigger>
          ))}
        </TabsList>

        {edit ? (
          <Button
            type="submit"
            onClick={handleSubmitButton}
            className="inline-flex justify-center gap-2.5 px-3 py-1.5 rounded-[15px] items-center bg-transparent text-title-xs text-primary-300 hover:bg-primary-300 hover:text-white"
          >
            완료
          </Button>
        ) : (
          <Link href={`/child/${childId}/record`} className="inline-flex justify-center gap-2.5 items-center">
            <Button
              type="button"
              className="w-fit text-title-xs text-gray-400 whitespace-nowrap bg-transparent px-3 py-1.5 rounded-[15px] hover:bg-primary-300 hover:text-white"
            >
              수정
            </Button>
          </Link>
        )}
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab} value={tab} className="w-full">
          {edit ? (
            <CheckboxForm
              data={getFilteredVaccineData(tab)}
              formRef={formRef}
              edit={edit}
              childId={childId}
              onSuccess={onSuccess}
            >
              <div className="flex w-full mt-9 md:mt-20">
                <Button className="flex w-full h-14 md:h-[72px] p-[16px 24px] justify-center items-center rounded-xl bg-primary-400 hover:bg-primary-300">
                  등록 완료
                </Button>
              </div>
            </CheckboxForm>
          ) : (
            <VaccineRecordList
              data={getFilteredVaccineData(tab)}
              vaccinated={vaccinated}
              edit={edit}
              control={edit ? control : undefined}
            />
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default VaccineRecordTabs;
