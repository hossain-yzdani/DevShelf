import { Category } from "../../../packages/types";

export const mockCategories: Category[] = [
  {
    id: "1",
    name: "برنامه‌نویسی وب",
    description: "منابع مرتبط با توسعه وب، فرانت‌اند و بک‌اند",
    slug: "web",
    resourcesCount: 24,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "هوش مصنوعی",
    description: "یادگیری ماشین، شبکه‌های عصبی و علم داده",
    slug: "ai",
    resourcesCount: 18,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "امنیت سایبری",
    description: "آموزش امنیت شبکه، تست نفوذ و رمزنگاری",
    slug: "cybersecurity",
    resourcesCount: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "پایگاه داده",
    description: "مدیریت دیتابیس، SQL و NoSQL",
    slug: "database",
    resourcesCount: 15,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "سیستم‌عامل",
    description: "لینوکس، ویندوز و مفاهیم سیستم‌عامل",
    slug: "os",
    resourcesCount: 8,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
