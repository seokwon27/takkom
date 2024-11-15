import { Checkbox } from "@/components/ui/checkbox";

interface CustomCheckboxProps {
  additions: boolean[];
  index: number;
  checked: boolean;
  onCheckedChange?: (isChecked: boolean) => void;
  disabled?: boolean;
}

const CustomCheckbox = ({ checked, onCheckedChange, disabled, additions, index }: CustomCheckboxProps) => {
  const isRequired = !additions[index];

  return (
    <div className="relative size-5 md:w-6 md:h-6">
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className={`w-full h-full rounded-full flex items-center justify-center disabled:!bg-[#D9D9D9] disabled:opacity-1 ${
          checked
            ? isRequired
              ? "!text-[#FF9C8E] !bg-[#FFDAD4] border-none"
              : "!text-[#8CD088] !bg-[#E3FAE2] border-none"
            : "border-[#D9D9D9]"
        }`}
      />
    </div>
  );
};

export default CustomCheckbox;
