"use client";

import { useForm } from "react-hook-form";
import { Form, FormMessage } from "../ui/form";

import { useAddVaccineRecordMutation, useDeleteVaccineRecordMutation } from "@/query/useVaccineRecordMutation";
import { useVaccineQuery, useVaccineRecordQuery } from "@/query/useVaccineRecordQuery";
import { ReactNode } from "react";
import VaccineRecordList from "./VaccineRecordList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface CheckboxFormProps {
  childId: string;
  onSuccess: () => void;
  children: ReactNode;
}

export type FormValues = {
  selectVaccines: string[];
};

const CheckboxForm = ({ childId, onSuccess, children }: CheckboxFormProps) => {
  const { data: vaccineData } = useVaccineQuery();
  const { data: vaccineRecord } = useVaccineRecordQuery(childId);
  const { mutateAsync: addVaccineRecord } = useAddVaccineRecordMutation();
  const { mutateAsync: deleteVaccineRecord } = useDeleteVaccineRecordMutation();

  const vaccinated = new Set(vaccineRecord || []);

  const form = useForm<FormValues>({
    defaultValues: {
      selectVaccines: Array.from(vaccinated)
    }
  });

  const onSubmit = async (values: FormValues) => {
    const selected = new Set(values.selectVaccines);

    const addVaccine = Array.from(selected).filter((id) => !vaccinated.has(id));

    const deleteVaccine = Array.from(vaccinated).filter((id) => !selected.has(id));

    await Promise.all([
      addVaccine.map((vaccineId) => addVaccineRecord({ childId, vaccineId })),
      deleteVaccine?.map((vaccineId) => deleteVaccineRecord({ childId, vaccineId }))
    ]);

    onSuccess();
  };

  const getFilteredVaccineData = (filter: "전체" | "접종 완료" | "미접종") => {
    if (filter === "전체") return vaccineData;

    return vaccineData?.filter((vaccine) => {
      const allCheckedVaccine = vaccine.disease.every((disease) => disease.ids.every((id) => vaccinated.has(id)));

      if (filter === "접종 완료") return allCheckedVaccine;

      if (filter === "미접종") return !allCheckedVaccine;
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Tabs
          defaultValue="전체"
          className="flex flex-col items-start gap-4 self-stretch relative w-full flex-[0_0_auto]"
        >
          <TabsList className="flex justify-between items-center px-8 py-0 self-stretch w-full bg-transparent">
            <div className="inline-flex items-center gap-2 relative ">
              <TabsTrigger
                value="전체"
                className="group flex w-20 items-center justify-center gap-2.5 p-2 relative rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gray-700"
              >
                <p className="relative w-fit mt-[-2.00px] text-gray-300 group-data-[state=active]:text-gray-700 whitespace-nowrap hover:text-gray-700">
                  전체
                </p>
              </TabsTrigger>
              <TabsTrigger
                value="접종 완료"
                className="group flex w-20 items-center justify-center gap-2.5 p-2 relative rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gray-700 data-[state=active]:text-gray-700"
              >
                <p className="relative w-fit mt-[-2.00px] text-gray-300 group-data-[state=active]:text-gray-700 whitespace-nowrap hover:text-gray-700">
                  접종완료
                </p>
              </TabsTrigger>
              <TabsTrigger
                value="미접종"
                className="group flex w-20 items-center justify-center gap-2.5 p-2 relative rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gray-700"
              >
                <p className="relative w-fit mt-[-2.00px] text-gray-300 group-data-[state=active]:text-gray-700 whitespace-nowrap hover:text-gray-700">
                  미접종
                </p>
              </TabsTrigger>
            </div>
          </TabsList>

          <TabsContent value="전체" className="w-full">
            <VaccineRecordList
              data={getFilteredVaccineData("전체")}
              vaccinated={vaccinated}
              edit={true}
              control={form.control}
            />
          </TabsContent>
          <TabsContent value="접종 완료" className="w-full">
            <VaccineRecordList
              data={getFilteredVaccineData("접종 완료")}
              vaccinated={vaccinated}
              edit={true}
              control={form.control}
            />
          </TabsContent>
          <TabsContent value="미접종" className="w-full">
            <VaccineRecordList
              data={getFilteredVaccineData("미접종")}
              vaccinated={vaccinated}
              edit={true}
              control={form.control}
            />
          </TabsContent>
        </Tabs>

        {children}
        <FormMessage />
      </form>
    </Form>
  );
};

export default CheckboxForm;
