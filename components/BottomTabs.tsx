// components/ui/BottomTabs.tsx
"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { BookOpen, Settings, UserCircle } from "lucide-react";

type Item = { name: string; href: string; icon: React.ComponentType<any> };

const items: Item[] = [
  // 学习中心链接
  { name: "学习中心", href: "/?tab=learning", icon: BookOpen },
  { name: "管理中心", href: "/?tab=management", icon: Settings },
  { name: "账户", href: "/account", icon: UserCircle },
];

function useActive(href: string) {
  const pathname = usePathname();
  const search = useSearchParams();
  if (!pathname) return false;

  if (href.startsWith("/?")) {
    // 处理主页选项卡
    const tab = search.get("tab") ?? "learning";
    const targetTab = href.includes("tab=management") ? "management" : "learning";
    return pathname === "/" && tab === targetTab;
  }
  return pathname === href || pathname.startsWith(href + "/");
}

export default function BottomTabs() {
  const router = useRouter();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 backdrop-blur"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto grid h-[64px] max-w-screen-md grid-cols-3">
        {items.map(({ name, href, icon: Icon }) => {
          const active = useActive(href);
          return (
            <button
              key={href}
              onClick={() => {
                router.push(href);
                // 改善手机端的用户体验
                setTimeout(() => {
                  if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" as any });
                }, 0);
              }}
              className={`tappable flex items-center justify-center gap-1 select-none ${
                active && href.includes("management") ? "text-green-600" : active ? "text-indigo-600" : "text-gray-600"
              }`}
              aria-label={name}
            >
              <Icon className="h-6 w-6" />
              <span className="text-[12px] leading-none">{name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
