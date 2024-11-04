"use client";

import { Control, Controller } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { groupVaccinesData } from "@/types/vaccineType";
import { FormValues } from "./CheckboxForm";

interface VaccineRecordListProps {
  data: groupVaccinesData;
  vaccinated: Set<string>;
  edit: boolean;
  control?: Control<FormValues>;
}

const VaccineRecordList = ({ data, vaccinated, edit, control }: VaccineRecordListProps) => {
  return (
    <ul className="grid gap-4">
      <li className="grid grid-cols-[2fr_1fr] text-center gap-4">
        <div className="bg-slate-300">예방접종명</div>
        <div className="bg-slate-300">횟수</div>
      </li>
      {data?.map((disease) => (
        <li key={disease.diseaseName} className="grid grid-cols-[2fr_1fr] gap-4">
          <div className="grid grid-cols-2">
            <div>{disease.diseaseName}</div>

            {/* 2번째 칼럼 (백신명) */}
            <div className="flex flex-col">
              {disease.vaccines.map((vaccine) => (
                <div key={vaccine.vaccineName}>
                  <div>{vaccine.vaccineName}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 3번째 칼럼 (checkbox) */}
          <div>
            {disease.vaccines.map((vaccine) => (
              <div key={vaccine.vaccineName}>
                {vaccine.ids.map((id) =>
                  edit && control ? (
                    <Controller
                      key={id}
                      control={control}
                      name="selectVaccines"
                      render={({ field }) => (
                        <Checkbox
                          checked={field.value.includes(id)}
                          onCheckedChange={(isChecked) => {
                            const newValue = isChecked ? [...field.value, id] : field.value.filter((v) => v !== id);
                            field.onChange(newValue);
                          }}
                        />
                      )}
                    />
                  ) : (
                    <Checkbox key={id} checked={vaccinated.has(id)} disabled />
                  )
                )}
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default VaccineRecordList;
