import { SidebarTrigger } from "./ui/sidebar";
import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface TopbarProps {
  title?: string;
  className?: string;
  children?: ReactNode;
  showSeparator?: boolean;
  actions?: ReactNode;
}

const Topbar = ({
  title,
  className,
  children,
  actions,
}: TopbarProps) => {
  const location = useLocation();

  const getPageTitle = (pathname: string): string => {
    const path = pathname.split("/").pop();

    const routes: Record<string, string> = {
      dashboard: "Dashboard",
      genres: "Genres Management",
      authors: "Authors Management",
      books: "Books Management",
      currencies: "Currencies Settings",
      profile: "My Profile",
      orders: "Orders",
    };

    if (path && routes[path]) {
      return routes[path];
    }

    return "Dashboard";
  };

  const pageTitle = title ?? getPageTitle(location.pathname);

  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-white px-4 transition-all",
        className,
      )}
    >
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1 text-muted-foreground hover:text-foreground transition-colors" />
        {children || (
          <h3 className="text-lg font-medium text-foreground">{pageTitle}</h3>
        )}
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </header>
  );
};

export default Topbar;
