"use client";

import { useVaccinationQuery } from "@/query/useVaccinationQuery";
import CheckBoxList from "./CheckBoxList";

const VaccineRecord = () => {
  const { data } = useVaccinationQuery();

  return (
    <ul>
      {data?.map(([diseaseName, { turn }]) => (
        <li key={diseaseName} className="flex flex-row">
          <div>{diseaseName}</div>
          <CheckBoxList diseaseName={diseaseName} turns={turn} />
        </li>
      ))}
    </ul>
  );
};

export default VaccineRecord;
