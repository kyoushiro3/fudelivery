import { cookies } from "next/headers";

import { AppSidebar } from "@/components/nav/app-sidebar";
import Footer from "@/components/nav/footer";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import LogoutButton from "@/components/LogoutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOut, User } from "lucide-react";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default async function Dashboard({ children }: DashboardLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "false"; //i will set to default first to test

  const user = await getCurrentUser();

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login");
  }
  // if(user.role !== "admin"){
  //   redirect("/error")
  // }

  return (
    <div>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar />
        <main className="border border-black w-full">
          <div className="pr-6 flex flex-row justify-between border border-black">
            <SidebarTrigger />

            <DropdownMenu>
              <DropdownMenuTrigger>
                {user.name?.split(" ").slice(0, -1).join(" ")}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {" "}
                  <User />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard /> Billing
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut /> <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {children}
        </main>
      </SidebarProvider>
      <Footer />
    </div>
  );
}
