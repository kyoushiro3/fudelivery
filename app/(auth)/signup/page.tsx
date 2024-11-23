"use client"

import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { FormData, UserSchema } from "@/lib/validations/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function Form() { 
  const { 
    register,
    handleSubmit,
    formState: { errors }, //here like useState, if it's an error it shows error from here
    setError,
    reset, //some here are built-in not need to define in types.ts
  } = useForm<FormData>({resolver: zodResolver(UserSchema),});

  const onSubmit = async(data: FormData) =>{ //now we use the form 
    try{
    const res = await fetch("http://localhost:3000/api/auth/signup", { //make a variable first here to do fetch in backend after that this body: JSON.stringify(data), will be the body UserSchema.parse(await req.json()) in backend
        method: "POST", //jere 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        Object.entries(errorData.errors).forEach(([field, message]) => { 
          setError(field as keyof FormData, { message: message as string });
        return;
      }
        )}
      reset();
      console.log("Account created successfully!");
    } catch (error) {
    console.log("Error", error);
    }
  }


  return (
    //before submit "handleSubmit" will check if it forms are valid or have errors
    <form onSubmit={handleSubmit(onSubmit)}> 
       <div className="mx-auto w-80 max-w-[500px] bg-white">
        <h1 className="text-3xl font-bold mb-4 text-center">Create an account</h1>
        <FormField //formfield component for forms
          type="text"
          placeholder="Name"
          name="name"
          register={register}
          error={errors.name}
        />
        <FormField
          type="email" 
          placeholder="Email"
          name="email"
          register={register}
          error={errors.email}
        />
        <FormField
          type="password"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password}
        />

      <Button type="submit" className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-[#0f172a] text-primary-foreground hover:bg-[#0f172a]/90 h-10 py-2 px-4">Sign In with Email</Button>
      </div>
    </form>
  );
}
export default Form;
