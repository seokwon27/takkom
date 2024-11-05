"use client";

import { Control, Controller } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { groupVaccinesData } from "@/types/vaccineType";
import { FormValues } from "./CheckboxForm";

const VaccineLabel = ({ additions }: { additions: boolean[] }) => {
  const isMustNot = additions.every((addition) => addition);

  if (isMustNot) return <div className="flex w-10 justify-center items-center gap-2.5 px-1.5 py-1 rounded">선택</div>;
  if (!isMustNot) return <div className="flex w-10 justify-center items-center gap-2.5 px-1.5 py-1 rounded">필수</div>;
};

interface VaccineRecordListProps {
  data: groupVaccinesData;
  vaccinated: Set<string>;
  edit: boolean;
  control?: Control<FormValues>;
}

const VaccineRecordList = ({ data, vaccinated, edit, control }: VaccineRecordListProps) => {
  return (
    <div className="flex flex-col items-start gap-2 px-8 rounded-2xl">
      <ul className="flex flex-col items-start gap-5 self-stretch w-full flex-[0_0_auto]">
        <li className="flex h-10 px-4 items-center gap-10 self-stretch bg-primary-50 rounded-[20px]">
          <div className="w-10"></div>
          <div className="w-[184px]">예방 접종명</div>
          <div className="w-[132px]">백신명</div>
          <div className="flex w-[168px] h-[19px] items-center gap-3">횟수</div>
        </li>

        {data?.map(
          ({ vaccineName, disease }) =>
            disease.map(({ diseaseName, ids, additions }) => (
              <li key={vaccineName} className="flex items-center gap-10 self-stretch px-4 rounded">
                <VaccineLabel additions={additions} />
                <div>{diseaseName}</div>

                <div>{vaccineName}</div>

                <div className="flex items-center gap-3 flex-[1 0 0]">
                  {ids.map((id) =>
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
              </li>
            ))

          // <li key={disease.diseaseName} className="grid grid-cols-[2fr_1fr] gap-4">
          //   <div className="grid grid-cols-2">
          //     <div>{disease.diseaseName}</div>

          //     {/* 2번째 칼럼 (백신명) */}
          //     <div className="flex flex-col">
          //       {disease.vaccines.map((vaccine) => (
          //         <div key={vaccine.vaccineName}>
          //           <div>{vaccine.vaccineName}</div>
          //         </div>
          //       ))}
          //     </div>
          //   </div>

          //   {/* 3번째 칼럼 (checkbox) */}
          //   <div>
          //     {disease.vaccines.map((vaccine) => (
          //       <div key={vaccine.vaccineName}>
          //         {vaccine.ids.map((id) =>
          //           edit && control ? (
          // <Controller
          //   key={id}
          //   control={control}
          //   name="selectVaccines"
          //   render={({ field }) => (
          //     <Checkbox
          //       checked={field.value.includes(id)}
          //       onCheckedChange={(isChecked) => {
          //         const newValue = isChecked ? [...field.value, id] : field.value.filter((v) => v !== id);
          //         field.onChange(newValue);
          //       }}
          //     />
          //   )}
          // />
          //           ) : (
          //             <Checkbox key={id} checked={vaccinated.has(id)} disabled />
          //           )
          //         )}
          //       </div>
          //     ))}
          //   </div>
          // </li>
        )}
      </ul>
    </div>
  );
};

export default VaccineRecordList;
