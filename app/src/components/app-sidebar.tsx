import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-menu";
import { ProfileCard } from "./profile/profile-card";
import Logo from "./logo";
import { BookOpen, DollarSign, LayoutDashboard, Palette, Users } from "lucide-react";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Genres",
      url: "/admin/genres",
      icon: Palette
    },
    {
      title: "Authors",
      url: "/admin/authors",
      icon: Users
    },
    {
      title: "Books",
      url: "/admin/books",
      icon: BookOpen
    },
    {
      title: "Currencies",
      url: "/admin/currencies",
      icon: DollarSign
    },
  ],
};

const sampleUser = {
  name: "Admin User",
  email: "admin@example.com",
  role: "Admin",
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Logo />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
          <ProfileCard user={sampleUser} />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
