import type { Metadata } from "next";
import "./globals.css";
import BottomTabs from "@/components/BottomTabs";

export const metadata: Metadata = {
  title: "智能销售培训系统",
  description: "AI驱动的销售训练，支持PC & 手机端使用",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh" className="light" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ffffff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </head>
      <body className="bg-gray-50 text-gray-900 antialiased">
        {/* 主容器，确保在移动端有足够的底部内边距 */}
        <div className="min-h-screen pb-safe flex justify-center">
          <div className="w-full max-w-[1280px] px-4">{children}</div>
        </div>

        {/* شريط التنقل السفلي للموبايل */}
        <BottomTabs />
      </body>
    </html>
  );
}