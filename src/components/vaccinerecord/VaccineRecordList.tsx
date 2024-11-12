"use client";

import { Control, Controller } from "react-hook-form";
import { groupVaccinesData } from "@/types/vaccineType";
import { FormValues } from "./CheckboxForm";
import CustomCheckbox from "./ui/CustomCheckbox";

const VaccineLabel = ({ additions }: { additions: boolean[] }) => {
  const isRequiredNot = additions.every((addition) => addition);

  if (isRequiredNot)
    return (
      <div className="flex w-[19px] h-[11px] p-[1.6px] justify-center items-center rounded bg-[#ECFAEB] text-[#5EBE15] text-[8px] leading-[135%] font-semibold md:w-10 md:h-6 md:gap-2.5 md:px-1.5 md:py-1 md:text-title-xxxs">
        선택
      </div>
    );
  if (!isRequiredNot)
    return (
      <div className="flex w-[19px] h-[11px] p-[1.6px] justify-center items-center rounded bg-[#FFF6F4] text-[#FF7664] text-[8px] leading-[135%] font-semibold md:w-10 md:h-6 md:gap-2.5 md:px-1.5 md:py-1 md:text-title-xxxs">
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
    <div className="flex flex-col max-w-[375px] min-h-[420px] px-6 items-center gap-2 md:items-start md:px-8 md:rounded-2xl md:max-w-[796px] md:min-h-[734px] md:self-stretch">
      <div className="flex flex-col min-w-[362px] min-h-[420px] items-center gap-3 md:self-stretch md:max-w-full md:gap-5 md:items-start">
        <div className="flex min-w-[362px] min-h-7 gap-[9px] p-3 items-center text-title-xxs text-gray-700 md:self-stretch bg-primary-50 rounded-[9.64px] md:rounded-[20px] md:h-10 md:px-4 md:gap-10">
          <div className="w-[19px] md:w-10"></div>
          <div className="w-[117px] md:w-[184px]">예방 접종명</div>
          <div className="w-[90px] md:w-[132px]">백신명</div>
          <div className="flex w-[77px] gap-[5px] items-center md:w-[168px] md:h-[19px] md:gap-3">횟수</div>
        </div>

        <ul className="flex flex-col max-w-[362px] min-h-[379px] items-start gap-[3px] self-stretch md:gap-4 md:max-w-[732px] md:min-h-[674px]">
          {data?.map(({ vaccineName, disease }) =>
            disease.map(({ diseaseName, ids, additions }) => (
              <li
                key={vaccineName}
                className="flex gap-[9px] max-w-[362px] min-h-[19px] self-stretch justify-center items-center md:gap-10 md:px-4 md:rounded md:max-w-[732px] md:min-h-7"
              >
                <VaccineLabel additions={additions} />

                {/* width: 640px 이상에서 보여지는 화면 */}
                <div className="items-center gap-10 relative min-w-[356px] min-h-6 hidden md:inline-flex">
                  <div className="flex w-[184px] items-center justify-center gap-2.5">
                    <p className="flex-1 h-6  text-gray-700 text-title-xxs">{diseaseName}</p>
                  </div>

                  <div className="flex flex-col w-[132px] items-start gap-2.5 relative">
                    <div className="flex items-start gap-2.5">
                      <div className="flex items-center justify-center gap-2.5 px-2 py-0.5 self-stretch w-full flex-[0_0_auto]">
                        <p className=" text-gray-500 text-label-l">{vaccineName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* width: 640px 미만에서 보여지는 화면 */}
                <div className="flex w-[117px] h-[19px] text-title-xxxs text-gray-700 font-semibold whitespace-nowrap md:hidden">
                  {diseaseName}
                </div>
                <div className="flex w-[90px] h-[19px] text-text-s text-gray-500 md:hidden">{vaccineName}</div>

                {/* 체크박스 */}
                <div className="flex items-center gap-[3px] min-w-[77px] min-h-3 md:gap-3 md:flex-1 md:max-w-[224px] md:min-h-7">
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
                            disabled={
                              // 이전 체크박스가 체크 되어 있지 않다면 비활성화 또는
                              (0 < index && !field.value.includes(ids[index - 1])) ||
                              // 다음 체크박스가 체크 되어 있다면 비활성화
                              (index < ids.length - 1 && field.value.includes(ids[index + 1]))
                            }
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
    </div>
  );
};

export default VaccineRecordList;
