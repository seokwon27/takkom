"use client";

import browserClient from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Tables } from "../../../database.types";

type VaccineList = Tables<"vaccine">;

const Page = () => {
  const [vaccineList, setVaccineList] = useState<VaccineList[] | null>([]);
  const [ageGroup, setAgeGroup] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const getVaccineInfo = async () => {
    try {
      const { data } = await browserClient.from("vaccine").select("*");
      setVaccineList(data);
    } catch (error) {
      console.error(error);
      throw new Error(`Error : ${error}`);
    }
  };

  useEffect(() => {
    getVaccineInfo();
  }, []);

  return (
    <div>
      접종 정보 페이지
      <div className="flex flex-wrap gap-3">
        {vaccineList?.map((item) => {
          return (
            <div key={item.id} className="border-[1px] gap-2 w-56 p-3">
              <p>{item.disease_name}</p>
              {item.description}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
