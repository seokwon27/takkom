'use client'

import useQueryParams from "@/hooks/use-query-param";
import { HospitalSearchParams } from "@/types/hospital"

const SearchParams = ({searchParams} : {searchParams: HospitalSearchParams}) => {
  useQueryParams(new URLSearchParams(searchParams).toString());
  
  return (
    <div>SearchParams</div>
  )
}

export default SearchParams