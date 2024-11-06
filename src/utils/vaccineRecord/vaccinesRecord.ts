import { Vaccine } from "@/types/vaccineType";

export const groupVaccines = (vaccines: Vaccine[]) => {
  const vaccineMap = new Map<string, Map<string, { turns: number[]; ids: string[]; additions: boolean[] }>>();

  vaccines.forEach((vaccine) => {
    const { disease_name, vaccine_turn, id, vaccine_name, additional } = vaccine;

    if (!disease_name || !vaccine_turn || !vaccine_name) return;

    if (!vaccineMap.has(vaccine_name)) {
      vaccineMap.set(vaccine_name, new Map());
    }

    const diseaseMap = vaccineMap.get(vaccine_name);

    if (!diseaseMap?.has(disease_name)) {
      diseaseMap?.set(disease_name, { turns: [], ids: [], additions: [] });
    }
    diseaseMap?.get(disease_name)?.turns.push(vaccine_turn);
    diseaseMap?.get(disease_name)?.ids.push(id);
    diseaseMap?.get(disease_name)?.additions.push(additional);
  });

  const vaccinesArray = Array.from(vaccineMap.entries()).map(([vaccineName, diseaseMap]) => ({
    vaccineName,
    disease: Array.from(diseaseMap.entries()).map(([diseaseName, data]) => ({
      diseaseName,
      turns: data.turns,
      ids: data.ids,
      additions: data.additions
    }))
  }));

  return vaccinesArray;
};
