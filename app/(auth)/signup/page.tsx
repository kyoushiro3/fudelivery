"use client";

import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { FormData, UserSchema } from "@/lib/validations/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IoLogoGithub } from "react-icons/io";
import { FcGoogle } from "react-icons/fc";

function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors }, //here like useState, if it's an error it shows error from here
    setError,
    reset, //some here are built-in not need to define in types.ts
  } = useForm<FormData>({ resolver: zodResolver(UserSchema) });

  const onSubmit = async (data: FormData) => {
    //now we use the form
    try {
      const res = await fetch("http://localhost:3000/api/auth/signup", {
        //make a variable first here to do fetch in backend after that this body: JSON.stringify(data), will be the body UserSchema.parse(await req.json()) in backend
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
        });
      }
      reset();
      console.log("Account created successfully!");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    //before submit "handleSubmit" will check if it forms are valid or have errors
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full bg-slate-50 font-sans">
        <div className="flex flex-col justify-center items-center mb-3">
          <div className="flex justify-center items-center mt-14 mb-4">
            <svg
              width="60"
              height="60"
              viewBox="0 0 381 381"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M123.769 308.849C127.215 314.568 128.939 317.428 130.543 319.185C140.036 329.582 156.399 329.612 165.93 319.25C167.541 317.499 169.275 314.646 172.742 308.939L181.011 295.331C185.061 288.665 187.087 285.332 189.853 282.904C192.363 280.7 195.306 279.045 198.493 278.044C202.005 276.941 205.905 276.941 213.705 276.941H247.036C252.222 276.941 254.814 276.941 257.204 276.45C262.098 275.445 266.557 272.937 269.957 269.276C271.618 267.489 272.964 265.273 275.657 260.842L287.441 241.448C295.834 227.636 285.891 209.961 269.73 209.961H252.479C243.885 209.961 238.597 200.561 243.06 193.216V193.216C247.523 185.871 242.236 176.47 233.641 176.47H202.354C199.831 176.47 198.57 176.47 197.391 176.587C190.708 177.249 184.607 180.68 180.571 186.048C179.859 186.995 179.205 188.073 177.895 190.229L123.823 279.215C122.42 281.525 121.718 282.68 121.181 283.818C118.129 290.279 118.115 297.764 121.143 304.237C121.676 305.377 122.374 306.534 123.769 308.849V308.849Z"
                fill="#ffffff"
                stroke="black"
                strokeWidth="8"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M44.4901 76H219.855L330.977 76C345.622 76 352.945 76 357.602 78.0714C367.289 82.3803 373.001 92.5353 371.653 103.052C371.005 108.107 367.203 114.365 359.597 126.881V126.881C356.905 131.313 355.558 133.528 353.898 135.316C350.497 138.976 346.039 141.484 341.144 142.489C338.755 142.98 336.162 142.98 330.977 142.98H201.747C193.793 142.98 189.817 142.98 186.245 144.124C183.085 145.136 180.169 146.793 177.682 148.989C174.871 151.471 172.835 154.887 168.762 161.72L135.719 217.157C124.849 235.394 119.414 244.512 112.373 247.6C106.23 250.295 99.2383 250.295 93.0944 247.6C86.0542 244.512 80.6191 235.394 69.7488 217.157L16.8445 128.398C13.1572 123.018 11 116.506 11 109.49C11 91.4856 25.2077 76.7994 43.0232 76.0316C43.034 76.0311 43.0439 76.0251 43.0493 76.0158V76.0158C43.0549 76.006 43.0653 76 43.0766 76H44.4901Z"
                fill="#ffffff"
                stroke="black"
                strokeWidth="8"
              />
            </svg>
          </div>
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-950 pb-2">
            Create an account
          </h3>
          <p className="text-slate-600 mb-8 text-sm md:text-base lg:w-96 lg:text-lg text-center ">
            Enter your email below to create your account
          </p>
          <p className="text-slate-600 text-sm mb-2 ">
            Already have an account?
            <a className="font-medium text-blue-600 ml-1" href="/signin">
              Sign in here.
            </a>
          </p>
        </div>

        <div className="flex flex-col justify-center items-center">
          <FormField //form filed one edit only
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

          <Button
            type="submit"
            className="w-72 md:w-80 lg:w-96 mt-6 inline-flex items-center justify-center rounded-md text-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-[#0f172a] text-primary-foreground hover:bg-[#0f172a]/90 h-10 py-2 px-4"
          >
            Create an account
          </Button>
        </div>
        <div className="flex flex-row justify-center items-center mb-1">
          <div className="w-32 h-0.5 bg-gray-400"></div>
          <p className="m-2 text-gray-500">or</p>
          <div className="w-32 h-0.5 bg-gray-400"></div>
        </div>
        <div className="flex flex-col justify-center items-center ">
          <Button
            type="submit"
            className="w-72 md:w-80 lg:w-96 items-center border bg-white text-gray-950 font-semibold rounded-md h-10 py-2 px-4 mb-3
            [&_svg]:size-6 [&_svg]:shrink-0"
          >
            <FcGoogle size={20} />
            Sign Up With Google
          </Button>
          <Button
            type="submit"
            className="w-72 md:w-80 lg:w-96 items-center border bg-white text-gray-950 font-semibold rounded-md h-10 py-2 px-4 mb-3 [&_svg]:size-6 [&_svg]:shrink-0"
          >
            <IoLogoGithub size={20} />
            Github
          </Button>
          <div className="w-72 md:w-80 lg:w-96 flex flex-row items-baseline  ">
            <input className="mr-4" type="checkbox" />
            <p className="w-72 md:w-80 lg:w-96 text-gray-500 text-sm lg:text-md">
              By clicking continue, you agree to our
              <a
                className="underline decoration-indigo-500 text-gray-600 m-2"
                href=""
              >
                Terms of Service
              </a>
              and
              <a
                className="underline decoration-indigo-500 text-gray-600 m-2"
                href=""
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}
export default Form;
