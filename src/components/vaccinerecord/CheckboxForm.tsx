"use client";

import { useForm } from "react-hook-form";
import { Form, FormMessage } from "../ui/form";

import { useAddVaccineRecordMutation, useDeleteVaccineRecordMutation } from "@/query/useVaccineRecordMutation";
import { useVaccineRecordQuery } from "@/query/useVaccineRecordQuery";
import { ReactNode, RefObject } from "react";

import VaccineRecordList from "./VaccineRecordList";
import { groupVaccinesData } from "@/types/vaccineType";

interface CheckboxFormProps {
  data?: groupVaccinesData;
  childId: string;
  onSuccess: () => void;
  children: ReactNode;
  edit: boolean;
  formRef?: RefObject<HTMLFormElement>;
}

export type FormValues = {
  selectVaccines: string[];
};

const CheckboxForm = ({ data, childId, onSuccess, children, edit, formRef }: CheckboxFormProps) => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef}>
        <VaccineRecordList data={data} edit={edit} control={form.control} vaccinated={vaccinated} />
        {children}

        <FormMessage />
      </form>
    </Form>
  );
};

export default CheckboxForm;
