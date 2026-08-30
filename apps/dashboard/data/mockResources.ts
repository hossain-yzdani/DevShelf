import { Resource } from "@/types/Resource";

const mockResources: Resource[] = [
  {
    id: "1",
    title: "Clean Code",
    description: "راهنمای عملی برای نوشتن کدهای تمیز و قابل نگهداری",
    author: "Robert C. Martin",
    type: "BOOK",
    coverUrl: null,
    downloadCount: 1240,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "JavaScript: The Good Parts",
    description: "بخش‌های خوب جاوااسکریپت و نکات کلیدی آن",
    author: "Douglas Crockford",
    type: "BOOK",
    coverUrl: null,
    downloadCount: 980,
    isFeatured: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Next.js 14 Mastery",
    description: "دوره جامع یادگیری Next.js از صفر تا صد",
    author: "Hossain Yazdani",
    type: "COURSE",
    coverUrl: null,
    downloadCount: 560,
    isFeatured: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Design Patterns Cheat Sheet",
    description: "خلاصه‌ای از الگوهای طراحی با مثال‌های عملی",
    author: "Unknown",
    type: "CHEATSHEET",
    coverUrl: null,
    downloadCount: 320,
    isFeatured: false,
    createdAt: new Date().toISOString(),
  },
];

export default mockResources;