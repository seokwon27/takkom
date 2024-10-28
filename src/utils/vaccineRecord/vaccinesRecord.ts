import { Vaccine } from "@/types/vaccineType";

export const groupVaccines = (vaccines: Vaccine[]) => {
  const vaccineMap = new Map<string, { turn: number[] }>();

  vaccines.forEach((vaccine) => {
    const { disease_name, vaccine_turn } = vaccine;

    if (!disease_name || vaccine_turn === null) return;

    if (!vaccineMap.has(disease_name)) {
      vaccineMap.set(disease_name, { turn: [] });
    }

    vaccineMap.get(disease_name)?.turn.push(vaccine_turn);
  });

  return Array.from(vaccineMap.entries());
};
