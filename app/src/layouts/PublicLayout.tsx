import Header from "@/components/header";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default PublicLayout;
