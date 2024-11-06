import { SupabaseDatabase } from "@/types/supabaseDataType";
import { Tables } from "../../database.types";
import { addDays, addMonths, format, isBefore, isEqual } from "date-fns";
import { vaccineSchedule } from "@/types/vaccineType";

export const getVaccines = async (supabaseClient: SupabaseDatabase) => {
  const { data, error } = await supabaseClient
    .from("vaccine")
    .select()
    .order("additional", { ascending: true })
    .order("disease_name", { ascending: true })
    .order("vaccine_turn", { ascending: true });

  if (error) throw Error(error.message);

  return data;
};

export const getVaccineSchedule = async (supabaseClient: SupabaseDatabase) => {
  const { data, error } = await supabaseClient
    .from("vaccine")
    .select("*")
    .order("vaccinate_date", { ascending: true })
    .order("disease_name", { ascending: true })
    .order("vaccine_turn", { ascending: true });

  if (error) throw Error(error.message);

  return data;
};

// 생일에 따라 접종 일정 계산하기
export const calculateSchedule = (
  date?: string,
  schedules?: Tables<"vaccine">[]
): Map<string, vaccineSchedule[]> | null => {
  if (!date || !schedules) {
    return null;
  }
  const birthday = new Date(date);
  const mySchedule = new Map();
  const lastMonth = addDays(addMonths(addMonths(birthday, 12 * 12), 12), -1);

  // 비어 있는 달이 존재할 수 이어서 key를 먼저 생성
  let currentDate = birthday;
  while (isBefore(currentDate, lastMonth) || isEqual(addDays(currentDate, -1), lastMonth)) {
    mySchedule.set(format(currentDate, "yyyy.MM"), []);
    currentDate = addMonths(currentDate, 1);
  }

  for (const schedule of schedules) {
    const { id, vaccine_name, disease_name, vaccinate_date, duration, additional, vaccine_turn } = schedule;
    // console.log(vaccine_name, disease_name, vaccinate_date, duration)
    const [after, unit] = duration.split(" ");
    const startDate = addMonths(birthday, vaccinate_date);
    const startDateFormatted = format(startDate, "yyyy.MM.dd");

    if (unit === "일") {
      // 일 단위
      const startDate = addMonths(birthday, vaccinate_date);
      const startDateFormatted = format(startDate, "yyyy.MM.dd");
      const startMonthFormatted = format(startDate, "yyyy.MM");
      mySchedule.set(
        startMonthFormatted,
        mySchedule.get(startMonthFormatted).concat([
          {
            id,
            vaccine_name,
            disease_name,
            additional,
            vaccine_turn,
            startDate: startDateFormatted,
            endDate: startDateFormatted
          }
        ])
      );
    } else {
      // 개월 단위
      const endDate = addDays(addMonths(addMonths(birthday, vaccinate_date), Number(after)), -1);
      const endDateFormatted = format(endDate, "yyyy.MM.dd");

      let currentDate = startDate;
      while (isBefore(currentDate, endDate) || isEqual(addDays(currentDate, -1), endDate)) {
        const currentMonthFormatted = format(currentDate, "yyyy.MM");
        mySchedule.set(
          currentMonthFormatted,
          mySchedule.get(currentMonthFormatted).concat([
            {
              id,
              vaccine_name,
              disease_name,
              additional,
              vaccine_turn,
              startDate: startDateFormatted,
              endDate: endDateFormatted
            }
          ])
        );
        currentDate = addMonths(currentDate, 1);
      }
    }
  }

  return mySchedule;
};
