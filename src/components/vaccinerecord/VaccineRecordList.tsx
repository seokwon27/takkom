"use client";

import { Control, Controller } from "react-hook-form";
import { groupVaccinesData } from "@/types/vaccineType";
import { FormValues } from "./CheckboxForm";
import CustomCheckbox from "./ui/CustomCheckbox";

const VaccineLabel = ({ additions }: { additions: boolean[] }) => {
  const isRequiredNot = additions.every((addition) => addition);

  if (isRequiredNot)
    return (
      <div className="flex w-10 justify-center items-center gap-2.5 px-1.5 py-1 rounded bg-[#ECFAEB] text-[#5EBE15]">
        선택
      </div>
    );
  if (!isRequiredNot)
    return (
      <div className="flex w-10 justify-center items-center gap-2.5 px-1.5 py-1 rounded bg-[#FFF6F4] text-[#FF7664]">
        필수
      </div>
    );
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

        {data?.map(({ vaccineName, disease }) =>
          disease.map(({ diseaseName, ids, additions }) => (
            <li key={vaccineName} className="flex items-center gap-10 self-stretch px-4 rounded">
              <VaccineLabel additions={additions} />
              <div className="inline-flex items-center gap-10 relative flex-[0_0_auto]">
                <div className="flex w-[184px] items-center justify-center gap-2.5">
                  <p className="flex-1 h-6 mt-[-1.00px] text-gray-700">{diseaseName}</p>
                </div>

                <div className="flex flex-col w-[132px] items-start gap-2.5 relative">
                  <div className="flex w-[50px] h-6 items-start gap-2.5">
                    <div className="flex items-center justify-center gap-2.5 px-2 py-0.5 self-stretch w-full flex-[0_0_auto]">
                      <p className="w-fit text-gray-500 whitespace-nowrap">{vaccineName}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-[1 0 0]">
                {ids.map((id, index) =>
                  edit && control ? (
                    <Controller
                      key={id}
                      control={control}
                      name="selectVaccines"
                      render={({ field }) => (
                        <CustomCheckbox
                          additions={additions}
                          index={index}
                          checked={field.value.includes(id)}
                          onCheckedChange={(isChecked) => {
                            const newValue = isChecked ? [...field.value, id] : field.value.filter((v) => v !== id);
                            field.onChange(newValue);
                          }}
                        />
                      )}
                    />
                  ) : (
                    <CustomCheckbox
                      key={id}
                      checked={vaccinated.has(id)}
                      additions={additions}
                      index={index}
                      disabled
                    />
                  )
                )}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default VaccineRecordList;
