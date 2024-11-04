import { Tables } from "../../database.types";

export type Vaccine = Tables<"vaccine">;

export interface vaccineSchedule extends Omit<Vaccine, 'vaccinae_date' | 'duration'> {
  startDate: string;
  endDate: string;
};
export type groupVaccinesData = groupVaccines[] | undefined;

export interface groupVaccines {
  diseaseName: string;
  vaccines: VaccinesDetail[];
}

export interface VaccinesDetail {
  vaccineName: string;
  turns: number[];
  ids: string[];
}
