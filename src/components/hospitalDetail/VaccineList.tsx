import { VcnInfo } from "@/types/hospital";
import VaccineBadge from "./VaccineBadge";

const VaccineList = ({ vcnInfo }: { vcnInfo: VcnInfo | VcnInfo[] }) => {
  let vaccines = Array.isArray(vcnInfo) ? vcnInfo.map((vaccine) => vaccine.vcnNm) : [vcnInfo?.vcnNm ?? null];
  if (vaccines[0] === null) {
    vaccines = [];
  }

  return (
    <div className="w-full mt-8 max-sm:mt-5">
      <p className="mb-5 text-title-m max-sm:mb-3 max-sm:text-title-s">접종 목록 ({vaccines.length}개)</p>
      {vaccines.length === 0 && <div>제공된 정보가 없습니다.</div>}
      {vaccines.length > 0 && (
        <div className="flex flex-wrap gap-2 max-sm:max-h-[150px] max-sm:overflow-scroll">
          {vaccines.map((vaccine) => (
            <VaccineBadge name={vaccine} key={vaccine} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VaccineList;
