import { Control, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormLabel } from "../ui/form";
import { Input } from "../ui/input";

interface FieldProps {
  control: Control<FieldValues>;
  name: string;
  placeholder: string;
  label: string;
}

const RegisterFormField = ({ control, name, placeholder, label }: FieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormControl>
          <FormLabel>{label}</FormLabel>
          <Input placeholder={placeholder} {...field} />
        </FormControl>
      )}
    />
  );
};

export default RegisterFormField;
