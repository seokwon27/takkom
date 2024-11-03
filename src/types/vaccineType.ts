import { Tables } from "../../database.types";

export type Vaccine = Tables<"vaccine">;

export interface vaccineSchedule extends Omit<Vaccine, 'vaccinae_date' | 'duration'> {
  startDate: string;
  endDate: string;
};