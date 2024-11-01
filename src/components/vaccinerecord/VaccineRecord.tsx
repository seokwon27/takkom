"use client";

import { useVaccineQuery, useVaccineRecordQuery } from "@/query/useVaccineRecordQuery";
import { Checkbox } from "../ui/checkbox";

interface VaccineRecordProps {
  childId: string;
}

const VaccineRecord = ({ childId }: VaccineRecordProps) => {
  const { data: vaccineData, isLoading: vaccineLoading } = useVaccineQuery();
  const { data: vaccineRecord, isLoading: recordLoading } = useVaccineRecordQuery(childId);

  console.log("vaccineData", vaccineData);

  if (vaccineLoading || recordLoading) return <div>Loading...</div>;

  const vaccinated = new Set(vaccineRecord);

  return (
    <ul>
      {vaccineData?.map((disease) => (
        <li key={disease.diseaseName} className="flex flex-row gap-4">
          <div>{disease.diseaseName}</div>

          {/* 2번째 칼럼 (백신명) */}
          <div className="flex flex-col">
            {disease.vaccines.map((vaccine) => (
              <div key={vaccine.vaccineName}>
                <div>{vaccine.vaccineName}</div>
              </div>
            ))}
          </div>

          {/* 3번째 칼럼 (checkbox) */}
          <div>
            {disease.vaccines.map((vaccine) => (
              <div key={vaccine.vaccineName}>
                {vaccine.ids.map((id) => (
                  <Checkbox key={id} checked={vaccinated.has(id)} disabled />
                ))}
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default VaccineRecord;
