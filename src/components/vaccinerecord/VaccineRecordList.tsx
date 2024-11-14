"use client";

import { Control, Controller } from "react-hook-form";
import { groupVaccinesData } from "@/types/vaccineType";
import { FormValues } from "./CheckboxForm";
import CustomCheckbox from "./ui/CustomCheckbox";

const VaccineLabel = ({ additions }: { additions: boolean[] }) => {
  const isRequiredNot = additions.every((addition) => addition);

  if (isRequiredNot)
    return (
      <div className="flex w-[19px] h-[11px] p-[1.6px] justify-center items-center rounded bg-[#ECFAEB] text-[#5EBE15] text-[8px] leading-[135%] font-semibold sm:w-10 sm:h-6 sm:gap-2.5 sm:px-1.5 sm:py-1 sm:text-title-xxxs">
        선택
      </div>
    );
  if (!isRequiredNot)
    return (
      <div className="flex w-[19px] h-[11px] p-[1.6px] justify-center items-center rounded bg-[#FFF6F4] text-[#FF7664] text-[8px] leading-[135%] font-semibold sm:w-10 sm:h-6 sm:gap-2.5 sm:px-1.5 sm:py-1 sm:text-title-xxxs">
        필수
      </div>
    );
};

interface VaccineRecordListProps {
  data: groupVaccinesData;
  vaccinated: Set<string>;
  edit?: boolean;
  control?: Control<FormValues>;
}

const VaccineRecordList = ({ data, vaccinated, edit, control }: VaccineRecordListProps) => {
  return (
    <div className="flex flex-col w-full px-6 items-start self-stretch gap-2.5 sm:px-8 sm:rounded-2xl sm:max-w-[796px]">
      <div className="flex flex-col min-w-[327px] items-center gap-4 sm:self-stretch sm:max-w-full sm:gap-5 sm:items-start">
        <div className="flex w-full min-h-9 gap-[18px] p-3 items-center self-stretch text-title-xxxs text-gray-700 font-semibold bg-primary-50 rounded-[18px] sm:rounded-[20px] sm:h-10 sm:px-4 sm:gap-10">
          <div className="hidden sm:block sm:w-10"></div>
          <div className="w-[100px] sm:w-[184px]">예방 접종명</div>
          <div className="w-[52px] sm:w-[132px]">백신명</div>
          <div className="flex w-[96px] gap-[7px] items-center sm:w-[168px] sm:h-[19px] sm:gap-3">
            <p>횟수</p>
          </div>
        </div>

        <ul className="flex flex-col w-full items-start gap-3 self-stretch sm:gap-4 sm:max-w-[732px] sm:min-h-[674px]">
          {data?.map(({ vaccineName, disease }) =>
            disease.map(({ diseaseName, ids, additions }) => (
              <li
                key={vaccineName}
                className="flex px-3 w-full self-stretch gap-[18px] items-center sm:gap-10 sm:px-4 sm:rounded sm:max-w-[732px] sm:min-h-7"
              >
                {/* width: 640px 이상에서 보여지는 라벨 */}
                <div className="hidden sm:block">
                  <VaccineLabel additions={additions} />
                </div>

                {/* width: 640px 이상에서 보여지는 블럭 */}
                <div className="items-center gap-10 relative min-w-[356px] min-h-6 hidden sm:inline-flex">
                  <div className="flex w-[184px] items-center justify-center gap-2.5">
                    <p className="flex-1 h-6  text-gray-700 font-semibold text-title-xxs">{diseaseName}</p>
                  </div>

                  <div className="flex flex-col w-[132px] items-start gap-2.5 relative">
                    <div className="flex items-start gap-2.5">
                      <div className="flex items-center justify-center gap-2.5 py-0.5 self-stretch w-full flex-[0_0_auto]">
                        <p className=" text-gray-500 text-label-l">{vaccineName}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* width: 640px 미만에서 보여지는 블럭 */}
                <div className="flex w-[100px] h-[24px] gap-1 sm:hidden">
                  <p className="overflow-hidden whitespace-nowrap text-ellipsis text-heading-xxs text-gray-700 font-semibold -tracking-[0.21px] hover:overflow-visible hover:bg-white hover:whitespace-normal">
                    {diseaseName}
                  </p>
                </div>
                <div className="overflow-hidden text-ellipsis whitespace-nowrap text-text-l w-[52px] h-[24px] text-gray-500 -tracking-[0.21px] hover:overflow-visible hover:bg-white hover:whitespace-normal sm:hidden">
                  {vaccineName}
                </div>

                {/* 체크박스 */}
                <div className="flex items-center gap-1 sm:gap-3 sm:flex-1 sm:max-w-[224px] sm:min-h-7">
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
