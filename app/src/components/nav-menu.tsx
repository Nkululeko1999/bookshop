"use client";

import { type LucideIcon } from "lucide-react";
import { SidebarGroup, SidebarMenu } from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "./ui/separator";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const location = useLocation();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Separator />
        <div className="mt-6 flex flex-col gap-1.5">
          {items.map((item, index) => {
            const isActive = location.pathname === item.url;

            return (
              <Link
                key={index}
                to={item.url}
                className={`
          flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
          ${
            isActive
              ? "bg-primary text-white shadow-md"
              : "text-muted-foreground hover:bg-accent hover:text-foreground"
          }
        `}
              >
                {item.icon && (
                  <item.icon
                    className={`w-5 h-5 ${isActive ? "text-white" : ""}`}
                  />
                )}
                <span>{item.title}</span>
                {isActive && (
                  <div className="ml-auto w-1 h-6 bg-white rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </SidebarMenu>
    </SidebarGroup>
  );
}
