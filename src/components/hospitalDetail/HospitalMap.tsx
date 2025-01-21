"use client";

import { AddressSearchResult, Status } from "@/types/kakaoMaps";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const HospitalMap = ({ orgnm, orgAddr }: { orgnm:string; orgAddr: string }) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  useEffect(() => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(orgAddr.split(',')[0], (result: AddressSearchResult[], status: Status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setCoords({ lat: Number(result[0].y), lng: Number(result[0].x) });
        }
      });
    });
  }, []);

  return (
    <section className="w-full flex flex-col mt-8 max-sm:px-6 max-sm:mb-8">
      <p className="mb-5 text-title-m max-sm:mb-3 max-sm:text-title-s">위치</p>
      <Map center={coords} className="w-full aspect-[16/9] mb-2" level={1}>
        <MapMarker position={coords} />
      </Map>
      <Link href={`https://map.kakao.com/link/map/${orgnm},${coords.lat},${coords.lng}`} target="_blank" className="ml-auto cursor-pointer max-sm:text-text-m">지도로 위치 검색하기</Link>
    </section>
  );
};

export default HospitalMap;
