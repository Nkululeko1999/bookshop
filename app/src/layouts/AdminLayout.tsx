import { AppSidebar } from "@/components/app-sidebar";
import Topbar from "@/components/topbar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
 <div className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <main className="flex-1">
            <Topbar />
            <div className="p-6">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default AdminLayout;
