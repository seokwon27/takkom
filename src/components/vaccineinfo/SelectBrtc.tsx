import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const SelectBrtc = ({ mode }: { mode: string }) => {
  return mode === "brtc" ? (
    <div className="grid grid-cols-4 items-center gap-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="시 / 도" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="서울">서울</SelectItem>
            <SelectItem value="부산">부산</SelectItem>
            <SelectItem value="제주">제주</SelectItem>
            <SelectItem value="경기">경기</SelectItem>
            <SelectItem value="인천">인천</SelectItem>
            <SelectItem value="강원">강원</SelectItem>
            <SelectItem value="경상">경상</SelectItem>
            <SelectItem value="전라">전라</SelectItem>
            <SelectItem value="충청">충청</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>{" "}
    </div>
  ) : (
    <div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="시/군/구" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="서울">서울</SelectItem>
              <SelectItem value="부산">부산</SelectItem>
              <SelectItem value="제주">제주</SelectItem>
              <SelectItem value="경기">경기</SelectItem>
              <SelectItem value="인천">인천</SelectItem>
              <SelectItem value="강원">강원</SelectItem>
              <SelectItem value="경상">경상</SelectItem>
              <SelectItem value="전라">전라</SelectItem>
              <SelectItem value="충청">충청</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>{" "}
      </div>
    </div>
  );
};

export default SelectBrtc;
