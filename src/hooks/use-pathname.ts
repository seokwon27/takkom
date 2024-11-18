'use client'

import { HospitalParams } from "@/api/hospital-actions";
import { createQueryParams } from "@/utils/hospital/setHospitalQueryParams";
import { usePathname } from "next/navigation"
import { useEffect } from "react";

export const useQueryParams = (params: HospitalParams) => {
  const pathname = usePathname();
  const queryString = createQueryParams(params, pathname);
  useEffect(() => {
  }, [queryString, pathname])
}