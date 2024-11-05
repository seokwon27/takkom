import { Checkbox } from "@/components/ui/checkbox";
import BlankChecked from "../../../assets/icons/checkbox/blank-checkbox.svg";
import RequiredChecked from "../../../assets/icons/checkbox/required-checkbox.svg";
import NotRequiredChecked from "../../../assets/icons/checkbox/not-required-checkbox.svg";
import Image from "next/image";

interface CustomCheckboxProps {
  additions: boolean[];
  checked: boolean;
  onCheckedChange?: (isChecked: boolean) => void;
  disabled?: boolean;
}

const CustomCheckbox = ({ checked, onCheckedChange, disabled, additions }: CustomCheckboxProps) => {
  const isRequired = additions.every((addition) => !addition);

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
