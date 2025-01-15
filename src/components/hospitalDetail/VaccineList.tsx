import { VcnInfo } from "@/types/hospital";
import VaccineBadge from "./VaccineBadge";

const VaccineList = ({ vcnInfo }: { vcnInfo: VcnInfo | VcnInfo[] }) => {
  let vaccines = Array.isArray(vcnInfo) ? vcnInfo.map((vaccine) => vaccine.vcnNm) : [vcnInfo?.vcnNm ?? null];
  if (vaccines[0] === null) {
    vaccines = [];
  }

  return (
    <div className="w-full mt-8">
      <p className="mb-5 text-title-m">접종 목록</p>
      {vaccines.length === 0 && <div>제공된 정보가 없습니다.</div>}
      {vaccines.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {vaccines.map((vaccine) => (
            <VaccineBadge name={vaccine} key={vaccine} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VaccineList;
