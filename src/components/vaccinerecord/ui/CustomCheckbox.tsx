import { Checkbox } from "@/components/ui/checkbox";
import BlankChecked from "../../../../public/vaccinerecord/blank-checkbox-icon.svg";
import RequiredChecked from "../../../../public/vaccinerecord/required-checkbox-icon.svg";
import NotRequiredChecked from "../../../../public/vaccinerecord/not-required-checkbox-icon.svg";
import Image from "next/image";

interface CustomCheckboxProps {
  additions: boolean[];
  index: number;
  checked: boolean;
  onCheckedChange?: (isChecked: boolean) => void;
  disabled?: boolean;
}

const CustomCheckbox = ({ checked, onCheckedChange, disabled, additions, index }: CustomCheckboxProps) => {
  const isRequired = !additions[index];
  const icon = checked ? (isRequired ? RequiredChecked : NotRequiredChecked) : BlankChecked;

  return (
    <div className="relative cursor-pointer">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`opacity-0 inset-0 absolute w-full h-full ${disabled ? "!opacity-0 !cursor-default" : ""}`}
      />
      <Image src={icon} alt="checkboxIcon" width={24} height={24} />
    </div>
  );
};

export default CustomCheckbox;
