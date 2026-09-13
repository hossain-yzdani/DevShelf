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
  title: "کتابخانه برنامه نویسی دو شلف",
  description: "مرجع کتاب و منابع متنی برنامه نویسی",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${myFont.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
