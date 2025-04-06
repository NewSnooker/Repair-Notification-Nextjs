"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  Users,
  Wrench,
  Settings,
  BarChart3,
  FileText,
  Package,
  Store,
} from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";
import Link from "next/link";
import { usePathname } from "next/navigation";
// สมมุติว่าคุณมีฟังก์ชัน cn สำหรับรวม class names
import { cn } from "@/lib/utils";

const items = [
  { title: "แดชบอร์ด", href: "/backoffice/dashboard", icon: LayoutDashboard },
  { title: "พนักงานร้าน", href: "/backoffice/dashboard/user", icon: Users },
  {
    title: "บันทึกการซ่อม",
    href: "/backoffice/dashboard/repair-record",
    icon: Wrench,
  },
  {
    title: "สถานะการซ่อม",
    href: "/backoffice/dashboard/repair-status",
    icon: Settings,
  },
  {
    title: "สถิติการซ่อมของช่าง",
    href: "/backoffice/dashboard/mechanic-report",
    icon: BarChart3,
  },
  {
    title: "รายงานรายได้",
    href: "/backoffice/dashboard/income-report",
    icon: FileText,
  },
  {
    title: "ทะเบียนวัสดุ อุปกรณ์",
    href: "/backoffice/dashboard/devices",
    icon: Package,
  },
  { title: "ข้อมูลร้าน", href: "/backoffice/dashboard/company", icon: Store },
];

export function AppSidebar() {
  const pathname = usePathname(); // ดึงเส้นทางปัจจุบัน

  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent>
        <SidebarGroup className="gap-4">
          <SidebarGroupLabel className="flex items-center gap-2">
            <Image src={logo} alt="logo" width={25} height={25} />
            <h1 className="text-lg font-bold">ระบบแจ้งซ่อม</h1>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                // กำหนด active state โดยเปรียบเทียบ URL ปัจจุบันกับ item.href
                const isActive = pathname === item.href;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className={cn(
                        "flex items-center gap-2 group-data-[collapsible=icon]:justify-center transition-colors duration-200",
                        isActive
                          ? "bg-zinc-200 hover:bg-zinc-100" // กำหนด active state: ปรับสีพื้นหลังและข้อความ
                          : ""
                      )}
                    >
                      <Link href={item.href}>
                        <item.icon className="h-4 w-4" />
                        <span className="group-data-[collapsible=icon]:hidden">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
