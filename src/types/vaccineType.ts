import { Tables } from "../../database.types";

export type Vaccine = Tables<"vaccine">;

export interface vaccineSchedule extends Omit<Vaccine, "vaccinae_date" | "duration"> {
  startDate: string;
  endDate: string;
}

export type groupVaccinesData = groupVaccines[] | undefined;

export interface groupVaccines {
  vaccineName: string;
  disease: DiseaseDetail[];
}

export interface DiseaseDetail {
  diseaseName: string;
  turns: number[];
  ids: string[];
  additions: boolean[];
}
