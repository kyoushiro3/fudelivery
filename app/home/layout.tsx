import { authOptions } from "@/lib/auth";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

interface CuisineLayoutProps {
  children?: React.ReactNode;
}

export default async function CuisineLayout({ children }: CuisineLayoutProps) {
    
    const user = await getCurrentUser();

    if (!user) {
      redirect(authOptions?.pages?.signIn || "/login");
    }

  return (
    <div className="w-auto border border-black">
      <h1>Cuisine</h1>
      {children}
    </div>
  );
}
