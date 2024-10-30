"use client";

import { Controller, useForm } from "react-hook-form";
import { Form, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useAddVaccineRecordMutation } from "@/query/useVaccineRecordMutation";
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

  const router = useRouter();

  const form = useForm<FormValues>({
    defaultValues: {
      selectVaccines: recordData || []
    }
  });

  const onSubmit = async (values: FormValues) => {
    const { selectVaccines } = values;

    await Promise.all(selectVaccines.map((vaccine_id) => addVaccineRecord({ child_id, vaccine_id })));

    router.push(`/child/${child_id}`);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {vaccineData?.map(([diseaseName, { ids }]) => (
          <div key={diseaseName}>
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
