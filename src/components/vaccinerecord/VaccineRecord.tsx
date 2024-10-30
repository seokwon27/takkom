"use client";

import { useVaccineQuery, useVaccineRecordQuery } from "@/query/useVaccineRecordQuery";
import { Checkbox } from "../ui/checkbox";

interface VaccineRecordProps {
  childId: string;
}

const VaccineRecord = ({ childId }: VaccineRecordProps) => {
  const { data: vaccineData, isLoading: vaccineLoading } = useVaccineQuery();
  const { data: vaccineRecord, isLoading: recordLoading } = useVaccineRecordQuery(childId);

  if (vaccineLoading || recordLoading) return <div>Loading...</div>;

  const vaccinated = new Set(vaccineRecord);

  return (
    <ul>
      {vaccineData?.map(([diseaseName, { ids }]) => (
        <li key={diseaseName} className="flex flex-row gap-4">
          <div>{diseaseName}</div>
          <div className="flex flex-row">
            {ids.map((id) => (
              <div key={id}>
                <Checkbox checked={vaccinated.has(id)} disabled />
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default VaccineRecord;
