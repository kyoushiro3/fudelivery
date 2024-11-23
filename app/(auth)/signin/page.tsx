"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { LoginData, loginSchema } from "@/lib/validations/types";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useState } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema), 
  });

  const onSubmit = async (data: LoginData) => {
    setServerError(null); 
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!result?.ok) {
        setServerError(result.error || "Login failed.");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
      setServerError("Something went wrong. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

      {serverError && (
        <p className="text-sm text-red-500 mb-4 text-center">{serverError}</p>
      )}

      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>
        <input
          type="email"
          placeholder="example@felicem.com"
          id="email"
          {...register("email")}
          className={`mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          type="password"
          placeholder="••••••••"
          id="password"
          {...register("password")}
          className={`mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
