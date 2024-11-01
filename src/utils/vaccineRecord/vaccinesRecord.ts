import { Vaccine } from "@/types/vaccineType";

export const groupVaccines = (vaccines: Vaccine[]) => {
  const diseaseMap = new Map<string, Map<string, { turns: number[]; ids: string[] }>>();

  vaccines.forEach((vaccine) => {
    const { disease_name, vaccine_turn, id, vaccine_name, additional } = vaccine;

    if (!disease_name || !vaccine_turn || !vaccine_name || additional) return;

    if (!diseaseMap.has(disease_name)) {
      diseaseMap.set(disease_name, new Map());
    }

    const vaccineMap = diseaseMap.get(disease_name);

    if (!vaccineMap?.has(vaccine_name)) {
      vaccineMap?.set(vaccine_name, { turns: [], ids: [] });
    }
    vaccineMap?.get(vaccine_name)?.turns.push(vaccine_turn);
    vaccineMap?.get(vaccine_name)?.ids.push(id);
  });

  const vaccinesArray = Array.from(diseaseMap.entries()).map(([diseaseName, vaccineMap]) => ({
    diseaseName,
    vaccines: Array.from(vaccineMap.entries()).map(([vaccineName, data]) => ({
      vaccineName,
      turns: data.turns,
      ids: data.ids
    }))
  }));

  return vaccinesArray;
};
