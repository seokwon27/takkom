"use client";

import { Controller, useForm } from "react-hook-form";
import { Form, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useAddVaccineRecordMutation, useDeleteVaccineRecordMutation } from "@/query/useVaccineRecordMutation";
import { useVaccineQuery, useVaccineRecordQuery } from "@/query/useVaccineRecordQuery";
import { useRouter } from "next/navigation";

interface CheckboxFormProps {
  child_id: string;
}

type FormValues = {
  selectVaccines: string[];
};

const CheckboxForm = ({ child_id }: CheckboxFormProps) => {
  const { data: vaccineData } = useVaccineQuery();
  const { data: recordData } = useVaccineRecordQuery(child_id);
  const { mutateAsync: addVaccineRecord } = useAddVaccineRecordMutation();
  const { mutateAsync: deleteVaccineRecord } = useDeleteVaccineRecordMutation();

  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      selectVaccines: recordData || []
    }
  });

  const onSubmit = async (values: FormValues) => {
    const { selectVaccines } = values;

    const addVaccine = selectVaccines.filter((id) => !recordData?.includes(id));

    const deleteVaccine = recordData?.filter((id) => !selectVaccines.includes(id));

    await Promise.all([
      addVaccine.map((vaccine_id) => addVaccineRecord({ child_id, vaccine_id })),
      deleteVaccine?.map((vaccine_id) => deleteVaccineRecord({ child_id, vaccine_id }))
    ]);

    router.push(`/child/${child_id}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {vaccineData?.map(([diseaseName, { ids }]) => (
          <div key={diseaseName} className="flex flex-row">
            {diseaseName}
            {ids.map((id) => (
              <Controller
                key={id}
                control={form.control}
                name="selectVaccines"
                render={({ field }) => (
                  <div>
                    <Checkbox
                      checked={field.value.includes(id)}
                      onCheckedChange={(isChecked) => {
                        const newValue = isChecked ? [...field.value, id] : field.value.filter((v) => v !== id);
                        console.log("newValue", newValue);
                        field.onChange(newValue);
                      }}
                    />
                  </div>
                )}
              />
            ))}
          </div>
        ))}
        <FormMessage />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default CheckboxForm;
