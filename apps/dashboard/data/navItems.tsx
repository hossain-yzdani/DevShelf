import {
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  FolderOpen,
  Tag,
  BarChart3,
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  {
    title: "داشبورد",
    href: "/",
    icon: <LayoutDashboard size={18} />,
  },
  {
    title: "منابع",
    href: "/resources",
    icon: <BookOpen size={18} />,
  },
  {
    title: "دسته‌بندی‌ها",
    href: "/categories",
    icon: <FolderOpen size={18} />,
  },
  {
    title: "تگ‌ها",
    href: "/tags",
    icon: <Tag size={18} />,
  },
  {
    title: "کاربران",
    href: "/users",
    icon: <Users size={18} />,
  },
  {
    title: "آمار",
    href: "/analytics",
    icon: <BarChart3 size={18} />,
  },
  {
    title: "تنظیمات",
    href: "/settings",
    icon: <Settings size={18} />,
  },
];

export default navItems;