import React from "react";
import VaccineGuide from "../../../public/guide/vaccine-guide.png";
import HospitalGuide from "../../../public/guide/hospital-guide.png";
import ChildGuide from "../../../public/guide/child-guide.png";
import Image from "next/image";

const GuidePage = () => {
  return (
    <div className="mt-6">
      <div className="text-center">따꼼 이용 가이드</div>
      <div className="m-5">
        {/* 안내 내용 */}
        {/* <div className="py-4">
          <h1>홈 화면</h1>
          <div>
            <div>이미지</div>
            <div>안내</div>
          </div>
        </div> */}
        <div className="my-8">
          <h1>연령별 예방접종</h1>
          <div>
            <Image src={VaccineGuide} alt="백신페이지 가이드" className="" />
            <p>
              대분류, 소분류의 연령 분류 선택을 통해 연령별 예방접종 정보를 확인할 수 있습니다. <br />
              선택한 예방접종이 가능한 병원을 찾아볼 수 있습니다.
            </p>
          </div>
        </div>
        <div className="my-8">
          <h1>동네 병원 찾기</h1>
          <div>
            <Image src={HospitalGuide} alt="병원 찾기 가이드" className="" />
            <p>
              지역별 예방접종을 시행하는 병원을 찾아볼 수 있습니다. <br />
              각 병원에서 시행하는 접종 정보와 병원 주소를 확인 가능하며 병원 이미지 위의 좋아요를 통해 내 정보에서
              좋아요한 병원만 따로 확인이 가능합니다.
              <br />
              병원 상세페이지에서 병원 위치를 지도로 확인 가능합니다.
            </p>
          </div>
        </div>
        <div className="my-8">
          <h1>우리 아이 맞춤형 플랜</h1>
          <div>
            <Image src={ChildGuide} alt="맞춤형 플랜 가이드" className="" />
            <p>
              우리아이의 생일 등록을 통해 우리 아이 맞춤형 접종 일정을 확인할 수 있습니다.
              <br />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidePage;
