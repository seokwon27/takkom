import { createClient } from "../supabase/server";

// 백신테이블 fetch
export const getVaccineList = async () => {
  const supabase = createClient();

  try {
    const { data } = await supabase.from("vaccine").select("*");
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error : ${error}`);
  }
};
