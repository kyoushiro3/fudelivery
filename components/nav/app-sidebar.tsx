import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
  } from "@/components/ui/sidebar"
import { CookingPot, Home, ListOrdered, PackageCheck, Settings } from "lucide-react"
  
  const items = [
    {
      title:"Dashboard",
      url:"/dashboard",
      icon: Home,
    },
    {
      title:"Foods",
      url:"/foods",
      icon: CookingPot,
    },
    {
      title:"Orders",
      url:"/orders",
      icon: ListOrdered,
    },
    {
      title:"Deliveries",
      url:"/deliveries",
      icon: PackageCheck,
    },
    {
      title:"Settings",
      url:"/settings",
      icon: Settings,
    },
  ]

  export function AppSidebar() {
    return (
      <Sidebar variant="sidebar">
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarMenu>
            {items.map((item) =>(
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
              <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
            ))}
          </SidebarMenu>
          
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }
  