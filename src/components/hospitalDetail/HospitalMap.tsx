"use client";

import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const HospitalMap = ({ orgAddr }: { orgAddr: string }) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  // const mapRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(orgAddr, (result, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setCoords({ lat: Number(result[0].y), lng: Number(result[0].x) });
          console.log("지도 좌표:", result[0].y, result[0].x);
        }
      });
    });
  }, []);
  // useEffect(() => {
  //   console.log(coords)
  //   window.kakao.maps.load(() => {
  //     console.log("지도 좌표:", coords.lat, coords.lng);
  //     // const options = {
  //     //   //지도를 생성할 때 필요한 기본 옵션
  //     //   center: new window.kakao.maps.LatLng(coords.lat, coords.lng), //지도의 중심좌표.
  //     //   level: 1 //지도의 레벨(확대, 축소 정도)
  //     // };

  //     // const map = new window.kakao.maps.Map(mapRef.current, options); //지도 생성 및 객체 리턴
  //   });
  // }, [coords]);

  return (
    <>
      <p>
        {coords.lat} {coords.lng}
      </p>
      <Map center={coords} className="w-full aspect-[16/9]" level={1}>
        <MapMarker position={coords} />
      </Map>
    </>
  );
};

export default HospitalMap;
