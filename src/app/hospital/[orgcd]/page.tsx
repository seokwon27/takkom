import { getHospitalsMutliConditions } from "@/api/hospital-actions";
import HospitalDetail from "@/components/hospitalDetail/HospitalDetail";
import SearchParams from "@/components/hospitalDetail/SearchParams";

type searchParams = { orgnm: string; orgAddr: string; brtcCd: string; sggCd: string };
type Params = { params: { orgcd: number }; searchParams: searchParams };

const HospitalDetailPage = async ({ searchParams }: Params) => {
  // const { orgcd } = params;
  const { orgnm, orgAddr, brtcCd, sggCd } = searchParams;
  const { items } = await getHospitalsMutliConditions({ brtcCd, sggCd, org: orgnm, addr: orgAddr });
  const hospitalInfo = items[0];

  return (
    <div className="w-full max-w-[792px] grow flex flex-col items-center mx-auto pt-5 max-sm:max-w-auto max-sm:pt-3 max-sm:mb-[80px]">
      <SearchParams searchParams={{ org: orgnm, addr: orgAddr, brtcCd, sggCd }} />
      <HospitalDetail hospitalInfo={hospitalInfo} />
    </div>
  );
};

export default HospitalDetailPage;
