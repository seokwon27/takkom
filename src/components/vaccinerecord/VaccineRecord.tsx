"use client";

import { useVaccineQuery } from "@/query/useVaccineRecordQuery";
import { Checkbox } from "../ui/checkbox";

// interface VaccineRecordProps {
//   childId: string;
// }

const VaccineRecord = () => {
  const { data: vaccineData, isLoading: vaccineLoading } = useVaccineQuery();
  // const { data: vaccineRecord, isLoading: recordLoading } = useVaccineRecordQuery(childId);

  console.log("vaccineData", vaccineData);
  if (vaccineLoading) return <div>Loading...</div>;

  return (
    <ul>
      {vaccineData?.map(([diseaseName, { ids }]) => (
        <li key={diseaseName} className="flex flex-row">
          <div>{diseaseName}</div>
          <div>
            {ids.map((id) => (
              <div key={id}>
                <Checkbox disabled />
              </div>
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default VaccineRecord;
