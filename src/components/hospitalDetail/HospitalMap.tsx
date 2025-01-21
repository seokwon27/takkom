"use client";

import { AddressSearchResult, Status } from "@/types/kakaoMaps";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const HospitalMap = ({ orgAddr }: { orgAddr: string }) => {
  const [coords, setCoords] = useState<{ lat: number; lng: number }>({ lat: 0, lng: 0 });

  useEffect(() => {
    window.kakao.maps.load(() => {
      const geocoder = new window.kakao.maps.services.Geocoder();
      geocoder.addressSearch(orgAddr, (result: AddressSearchResult[], status: Status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setCoords({ lat: Number(result[0].y), lng: Number(result[0].x) });
        }
      });
    });
  }, []);

  return (
    <section className="w-full mt-8">
      <p className="mb-5 text-title-m">위치</p>
      <Map center={coords} className="w-full aspect-[16/9]" level={1}>
        <MapMarker position={coords} />
      </Map>
    </section>
  );
};

export default HospitalMap;
