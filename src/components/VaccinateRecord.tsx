"use client";

import { useVaccinationQuery } from "@/query/useVaccinationQuery";

const VaccinateRecord = () => {
  const { data } = useVaccinationQuery();

  return (
    <ul>
      {data?.map((vaccine) => (
        <li key={vaccine.id}>
          <div>{vaccine.disease_name}</div>
        </li>
      ))}
    </ul>
  );
};

export default VaccinateRecord;
