"use client";

import { Controller, useForm } from "react-hook-form";
import { Form, FormMessage } from "../ui/form";
import { Checkbox } from "../ui/checkbox";

import { useAddVaccineRecordMutation, useDeleteVaccineRecordMutation } from "@/query/useVaccineRecordMutation";
import { useVaccineQuery, useVaccineRecordQuery } from "@/query/useVaccineRecordQuery";
import { ReactNode } from "react";

interface CheckboxFormProps {
  childId: string;
  onSuccess: () => void;
  children: ReactNode;
}

type FormValues = {
  selectVaccines: string[];
};

const CheckboxForm = ({ childId, onSuccess, children }: CheckboxFormProps) => {
  const { data: vaccineData } = useVaccineQuery();
  const { data: recordData } = useVaccineRecordQuery(childId);
  const { mutateAsync: addVaccineRecord } = useAddVaccineRecordMutation();
  const { mutateAsync: deleteVaccineRecord } = useDeleteVaccineRecordMutation();

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
      addVaccine.map((vaccineId) => addVaccineRecord({ childId, vaccineId })),
      deleteVaccine?.map((vaccineId) => deleteVaccineRecord({ childId, vaccineId }))
    ]);

    onSuccess();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <ul className="gird gap-4">
          <li className="grid grid-cols-[2fr_1fr] text-center gap-4">
            <div className="bg-slate-300">예방접종명</div>
            <div className="bg-slate-300">횟수</div>
          </li>
          {vaccineData?.map((disease) => (
            <li key={disease.diseaseName} className="grid grid-cols-[2fr_1fr] gap-4">
              <div className="grid grid-cols-2">
                <div>{disease.diseaseName}</div>

                <div className="flex flex-col">
                  {disease.vaccines.map((vaccine) => (
                    <div key={vaccine.vaccineName}>
                      <div>{vaccine.vaccineName}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {disease.vaccines.map((vaccine) => (
                  <div key={vaccine.vaccineName}>
                    {vaccine.ids.map((id) => (
                      <Controller
                        key={id}
                        control={form.control}
                        name="selectVaccines"
                        render={({ field }) => (
                          <Checkbox
                            checked={field.value.includes(id)}
                            onCheckedChange={(isChecked) => {
                              const newValue = isChecked ? [...field.value, id] : field.value.filter((v) => v !== id);
                              console.log("newValue", newValue);
                              field.onChange(newValue);
                            }}
                          />
                        )}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
        {children}
        <FormMessage />
      </form>
    </Form>
  );
};

export default CheckboxForm;
