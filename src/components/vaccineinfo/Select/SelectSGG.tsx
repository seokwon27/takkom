import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SelectSGG = () => {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor="username" className="text-right">
        시/군/구
      </Label>
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="시/군/구" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="미정">어쩌구</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectSGG;
