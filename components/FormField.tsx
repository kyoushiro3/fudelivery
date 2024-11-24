import { FormFieldProps } from "@/lib/validations/types";
import { Input } from "./ui/input";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <Input
      type={type}
      placeholder={placeholder}
      className="w-72 md:w-80 lg:w-96 text-gray-700 rounded-md py-2 px-3 text-sm mb-3 h-10 font-medium"
      {...register(name, { valueAsNumber })}
    />
    {error && (
      <span className="flex items-start text-left text-red-500 text-sm">
        {error.message}
      </span>
    )}
  </>
);
export default FormField;
