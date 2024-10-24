import HospitalList from "@/components/hospital/HospitalList";
import SearchForm from "@/components/hospital/SearchForm";
import { getBrtcCd, getRegionInfo } from "@/utils/hospital/server-action";

const page = async () => {
  const brtcObj = await getBrtcCd();
  const regionInfo = await getRegionInfo();

  return (
    <div className="w-full flex flex-col items-center">
      <p>병원검색페이지</p>
      <SearchForm brtcObj={brtcObj} regionInfo={regionInfo} >
        <HospitalList />
      </SearchForm>
    </div>
  );
};

export default page;
