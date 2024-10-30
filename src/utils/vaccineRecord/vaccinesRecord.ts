import { Vaccine } from "@/types/vaccineType";

export const groupVaccines = (vaccines: Vaccine[]) => {
  const vaccineMap = new Map<string, { turns: number[]; ids: string[] }>();

  vaccines.forEach((vaccine) => {
    const { disease_name, vaccine_turn, id } = vaccine;

    if (!disease_name || vaccine_turn === null) return;

    if (!vaccineMap.has(disease_name)) {
      vaccineMap.set(disease_name, { turns: [], ids: [] });
    }

    vaccineMap.get(disease_name)?.turns.push(vaccine_turn);
    vaccineMap.get(disease_name)?.ids.push(id);
  });

  return Array.from(vaccineMap.entries());
};
