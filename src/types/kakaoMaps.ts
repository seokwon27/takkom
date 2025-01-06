// chatGpt로 가져온 Kakao Maps API의 타입 정의

export type AddressSearchResult = {
  address_name: string;
  y: string;
  x: string;
  address_type: string;
  road_address?: {
    address_name: string;
    building_name: string;
    main_building_no: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    road_name: string;
    sub_building_no: string;
    underground_yn: string;
    zone_no: string;
  };
  address?: {
    address_name: string;
    b_code: string;
    h_code: string;
    main_address_no: string;
    mountain_yn: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    sub_address_no: string;
    x: string;
    y: string;
  };
}

export type Status = "OK" | "ZERO_RESULT" | "ERROR";