import { Outlet } from "react-router-dom";
import DriverSidebar from "./DriverSidebar";

export default function DriverLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-background to-green-50/30">
      <DriverSidebar />
      <main className="main-content">
        <div className="p-4 md:p-6 lg:p-8 pt-16 lg:pt-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}