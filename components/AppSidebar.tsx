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

const items = [
  { title: "แดชบอร์ด", href: "/dashboard", icon: LayoutDashboard },
  { title: "พนักงานร้าน", href: "/dashboard/user", icon: Users },
  { title: "บันทึกการซ่อม", href: "/dashboard/repair-record", icon: Wrench },
  { title: "สถานะการซ่อม", href: "/dashboard/repair-status", icon: Settings },
  {
    title: "สถิติการซ่อมของช่าง",
    href: "/dashboard/mechanic-report",
    icon: BarChart3,
  },
  {
    title: "รายงานรายได้",
    href: "/dashboard/income-report",
    icon: FileText,
  },
  {
    title: "ทะเบียนวัสดุ อุปกรณ์",
    href: "/dashboard/devices",
    icon: Package,
  },
  { title: "ข้อมูลร้าน", href: "/dashboard/company", icon: Store },
];

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="sidebar">
      <SidebarContent>
        <SidebarGroup className="gap-4">
          <SidebarGroupLabel className="flex items-center  gap-2">
            {" "}
            <Image src={logo} alt="logo" width={25} height={25} className="" />
            <h1 className="text-lg font-bold">ระบบแจ้งซ่อม</h1>
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {/* ถ้าต้องการจัดให้ไอคอนอยู่ตรงกลางเวลาไม่มีข้อความ
                      อาจเพิ่ม justify-center ตอน icon mode */}
                  <SidebarMenuButton
                    asChild
                    className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      {/* ซ่อนข้อความเฉพาะตอน icon mode */}
                      <span className="group-data-[collapsible=icon]:hidden">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
