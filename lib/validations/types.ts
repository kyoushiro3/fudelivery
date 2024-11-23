import {FieldError, UseFormRegister} from "react-hook-form"
import { z, ZodType } from "zod";

export type FormData = { //data types
    name: string;
    email:string;
    password: string;
};

export type LoginData = {
    email: string;
    password: string;
  };

export type FormFieldProps = { //we use this one for checking errors here
    type: string;
    placeholder: string;
    name: ValidFieldNames;
    register: UseFormRegister<FormData>;
    error: FieldError | undefined;
    valueAsNumber?: boolean;
}



export type ValidFieldNames = 
|"name"
|"email"
|"password";


export const UserSchema: ZodType<FormData> =z.object({  
    email: z.string(),
    name: z.string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
    password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
})
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });
  
export type LoginSchema = z.infer<typeof loginSchema>;