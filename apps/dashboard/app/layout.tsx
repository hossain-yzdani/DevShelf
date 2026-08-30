import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const myFont = localFont({
  src: [
    {
      path: "../public/fonts/KalamehWeb-Light.woff2",
      weight: "400",
      style: "light",
    },
    {
      path: "../public/fonts/KalamehWeb-Medium.woff2",
      weight: "800",
      style: "light",
    },
    {
      path: "../public/fonts/KalamehWeb-Regular.woff2",
      weight: "600",
      style: "light",
    },
  ],
});


export const metadata: Metadata = {
  title: "مدیریت کتابخانه دو شلف",
  description: "مدیریت منابع، کاربران، دسته بندی ها و تگ های کتابخانه برنامه نویسی دو شلف",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${myFont.className} font-sans antialiased text-white`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
