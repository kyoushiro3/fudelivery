import { FormFieldProps } from "@/lib/validations/types";
import { Input } from "./ui/input";

const FormField: React.FC<FormFieldProps> = ({
    type,
    placeholder,
    name,
    register,
    error,
    valueAsNumber
}) =>(
    <>
    <Input
    type={type}
    placeholder={placeholder}
    className="mt-4 border-black"
    {...register(name, {valueAsNumber})}
    />
    {error && <span className="text-red-500 text-sm">{error.message}</span>}
    </>
)
export default FormField;