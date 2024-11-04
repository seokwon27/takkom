import { Tables } from "../../database.types";

export type Vaccine = Tables<"vaccine">;

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
