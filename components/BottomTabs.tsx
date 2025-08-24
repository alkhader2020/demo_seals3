"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, LayoutDashboard, UserCircle } from "lucide-react";

const TABS = [
  { href: "/", label: "学习中心", icon: BookOpen },
  { href: "/management-center", label: "管理中心", icon: LayoutDashboard },
  { href: "/account", label: "账号", icon: UserCircle },
];

export default function BottomTabs() {
  const pathname = usePathname();

  return (
    <nav
      className="
        fixed bottom-0 inset-x-0 z-50 md:hidden
        backdrop-blur bg-white/85 border-t
        px-3 pt-2 pb-[calc(env(safe-area-inset-bottom)+8px)]
      "
      role="navigation"
      aria-label="bottom tabs"
    >
      <ul className="grid grid-cols-3 gap-2">
        {TABS.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname.startsWith(href);

          return (
            <li key={href}>
              <Link
                href={href}
                className={`
                  flex flex-col items-center justify-center rounded-xl py-2
                  transition-colors
                  ${active ? "text-indigo-600" : "text-gray-500 hover:text-gray-700"}
                `}
              >
                <Icon className={`h-5 w-5 ${active ? "" : "opacity-90"}`} />
                <span className="mt-0.5 text-[12px]">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
