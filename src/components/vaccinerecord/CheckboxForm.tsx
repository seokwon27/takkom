"use client";

import { useForm } from "react-hook-form";
import { Form, FormMessage } from "../ui/form";

import { useAddVaccineRecordMutation, useDeleteVaccineRecordMutation } from "@/query/useVaccineRecordMutation";
import { useVaccineRecordQuery } from "@/query/useVaccineRecordQuery";
import { ReactNode } from "react";

import VaccineRecordTabs from "./VaccineRecordTabs";

interface CheckboxFormProps {
  childId: string;
  onSuccess: () => void;
  children: ReactNode;
}

export type FormValues = {
  selectVaccines: string[];
};

const CheckboxForm = ({ childId, onSuccess, children }: CheckboxFormProps) => {
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

  return (
    // 여기도 수정:  최상위에서 만든 useform을 여기에 그대로 가져올 수 잇음.
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* <VaccineRecordList data={vaccineData} vaccinated={vaccinated} edit={true} control={form.control} /> */}
        <VaccineRecordTabs childId={childId} edit={true} control={form.control} />

        {children}
        <FormMessage />
      </form>
    </Form>
  );
};

export default CheckboxForm;
