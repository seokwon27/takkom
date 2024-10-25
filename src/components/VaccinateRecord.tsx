"use client";

import { useVaccinationQuery } from "@/query/useVaccinationQuery";

interface VaccinateRecordProps {
  id: string;
}

const VaccinateRecord = ({ id }: VaccinateRecordProps) => {
  const { data } = useVaccinationQuery(id);

  return (
    <ul>
      {data?.map((vaccine) => (
        <li key={vaccine.id}>
          <div>{vaccine.vaccine?.disease_name}</div>
        </li>
      ))}
    </ul>
  );
};

export default VaccinateRecord;
