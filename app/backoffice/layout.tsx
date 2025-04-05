import { AppSidebar } from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        {/* Sidebar (ถ้าต้องการให้ซ่อนใน mobile ใช้ hidden md:block) */}
        <AppSidebar />

        {/* Main Content */}
        <div className="flex flex-col flex-1 ">
          {/* Navbar */}
          <div className="relative">
            <Navbar />
            {/* ย้าย SidebarTrigger มาอยู่ใน Navbar และตั้งตำแหน่งชิดซ้าย */}
            <SidebarTrigger className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-200 p-2 rounded-md" />
          </div>

          {/* Content หลัก */}
          <main className="flex-1 p-4">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
