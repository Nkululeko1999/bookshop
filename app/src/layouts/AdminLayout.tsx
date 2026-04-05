import { Outlet } from "react-router-dom";


const AdminLayout = () => {
  return (
      <div className="flex min-h-screen">


        <main className="flex-1">

          <Outlet />
        </main>
      </div>
  );
};

export default AdminLayout;
