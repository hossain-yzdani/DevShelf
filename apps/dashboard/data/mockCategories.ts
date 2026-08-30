import { Category } from "@/types/Category";

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "برنامه‌نویسی وب",
    description: "منابع مرتبط با توسعه وب، فرانت‌اند و بک‌اند",
    icon: "🌐",
    resourceCount: 24,
    sortOrder: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "هوش مصنوعی",
    description: "یادگیری ماشین، شبکه‌های عصبی و علم داده",
    icon: "🤖",
    resourceCount: 18,
    sortOrder: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "امنیت سایبری",
    description: "آموزش امنیت شبکه، تست نفوذ و رمزنگاری",
    icon: "🔒",
    resourceCount: 12,
    sortOrder: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "پایگاه داده",
    description: "مدیریت دیتابیس، SQL و NoSQL",
    icon: "🗄️",
    resourceCount: 15,
    sortOrder: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "سیستم‌عامل",
    description: "لینوکس، ویندوز و مفاهیم سیستم‌عامل",
    icon: "💻",
    resourceCount: 8,
    sortOrder: 5,
    createdAt: new Date().toISOString(),
  },
];