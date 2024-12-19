"use client";
import { BarChart, Compass, Layout, List } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: Compass,
    label: "Browse",
    path: "/search",
  },
];

const teacherRoutes = [
  {
    icon: List,
    label: "Courses",
    path: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    path: "/teacher/analytics",
  },
];

export function SidebarRoutes() {
  const pathname = usePathname();
  const isTeacherPage = pathname?.includes("teacher");
  const routes = !isTeacherPage ? guestRoutes : teacherRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => {
        return (
          <SidebarItem
            key={route.path}
            icon={route.icon}
            label={route.label}
            href={route.path}
          />
        );
      })}
    </div>
  );
}
