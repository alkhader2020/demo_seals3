"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  GraduationCap,
  Users,
  ClipboardList,
  BarChart3,
  UserCog,
  Scale,
  LogOut,
  BookOpen,
  Settings,
  ChevronUp,
} from "lucide-react";

const Item = ({ icon: Icon, title, desc, href, cta, isLearning }: any) => (
  <div className="rounded-2xl bg-white shadow-md border p-4 md:p-5 h-full flex flex-col transition-all duration-300 hover:scale-[1.02]">
    <div className="flex items-start gap-3 mb-3">
      <div
        className={`${
          isLearning ? "bg-indigo-100 text-indigo-600" : "bg-green-100 text-green-600"
        } rounded-xl w-10 h-10 flex items-center justify-center shadow-inner flex-shrink-0`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-bold text-gray-900 tracking-tight truncate md:text-xl">{title}</h3>
        <p className="text-gray-600 text-xs mt-1 leading-relaxed line-clamp-2 md:text-sm">{desc}</p>
      </div>
    </div>
    <div className="mt-auto pt-3">
      <Link href={href}>
        <button
          className={`mt-3 inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm md:text-base text-white bg-gradient-to-r ${
            isLearning ? "from-indigo-500 to-purple-500" : "from-green-500 to-teal-500"
          } w-full font-semibold transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg flex items-center justify-center gap-2 shadow-md`}
        >
          {isLearning ? <BookOpen className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
          {cta}
        </button>
      </Link>
    </div>
  </div>
);

const Section = ({ title, subtitle, items, isLearning }: any) => (
  <section className="mb-8 space-y-6 pb-safe">
    <div className="flex items-center gap-3 mb-4">
      {isLearning ? (
        <div className="bg-indigo-100 text-indigo-600 rounded-xl w-10 h-10 flex items-center justify-center shadow-inner flex-shrink-0">
          <BookOpen className="w-5 h-5" />
        </div>
      ) : (
        <div className="bg-green-100 text-green-600 rounded-xl w-10 h-10 flex items-center justify-center shadow-inner flex-shrink-0">
          <Settings className="w-5 h-5" />
        </div>
      )}
      <div className="min-w-0">
        <h2
          className={`text-lg font-bold ${isLearning ? "text-indigo-700" : "text-green-700"} tracking-tight truncate md:text-xl`}
        >
          {title}
        </h2>
        <p className="text-gray-600 text-xs mt-1 md:text-sm">{subtitle}</p>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
      {items.map((item: any) => (
        <div key={item.title} className="h-full">
          <Item {...item} isLearning={isLearning} />
        </div>
      ))}
    </div>
  </section>
);

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tabParam = searchParams?.get("tab");
  const [activeTab, setActiveTab] = useState<"learning" | "management">(
    tabParam === "management" ? "management" : "learning"
  );
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [contentHeight, setContentHeight] = useState("auto");

  useEffect(() => {
    const handleUrlParams = () => {
      const sp = new URLSearchParams(window.location.search);
      const t = sp.get("tab");
      if (t === "management") setActiveTab("management");
      else if (t === "learning") setActiveTab("learning");
    };

    handleUrlParams();

    const handlePopState = () => handleUrlParams();
    window.addEventListener("popstate", handlePopState);

    const checkLoginStatus = () => {
      let isLoggedIn = false;

      try {
        isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      } catch (error) {
        console.error("Error checking localStorage:", error);
      }

      if (!isLoggedIn) {
        try {
          isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
        } catch (error) {
          console.error("Error checking sessionStorage:", error);
        }
      }

      if (!isLoggedIn) {
        try {
          const cookies = document.cookie.split(";");
          const found = cookies.find((c) => c.trim().startsWith("isLoggedIn="));
          const cookieVal = found ? found.split("=")[1] : undefined;
          isLoggedIn = cookieVal === "true";
        } catch (error) {
          console.error("Error checking cookies:", error);
        }
      }

      if (!isLoggedIn) {
        router.push("/login");
      }
    };

    checkLoginStatus();

    const handleStorageChange = () => checkLoginStatus();
    window.addEventListener("storage", handleStorageChange);

    const handleScroll = () => setShowBackToTop(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);

    const adjustContentHeight = () => {
      const windowHeight = window.innerHeight;
      const headerHeight = document.querySelector("header")?.clientHeight || 0;
      const tabsHeight = document.querySelector('[class*="relative bg-white p-3"]')?.clientHeight || 0;
      const availableHeight = windowHeight - headerHeight - tabsHeight - 100;
      setContentHeight(`${Math.max(availableHeight, 500)}px`);
    };
    adjustContentHeight();
    window.addEventListener("resize", adjustContentHeight);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", adjustContentHeight);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  const learning = [
    { icon: GraduationCap, title: "销售基础训练", desc: "系统学习产品知识和销售技巧", href: "/training", cta: "开始学习" },
    { icon: Users, title: "销售角色实训", desc: "通过角色扮演提升销售技能", href: "/live-training", cta: "开始实训" },
    { icon: ClipboardList, title: "学习任务模式", desc: "自主学习与任务管理", href: "/learning-modes", cta: "进入任务" },
    { icon: BarChart3, title: "学员成绩分析", desc: "查看个人训练记录与成长轨迹", href: "/student-analysis", cta: "查看分析" },
  ];

  const manage = [
    { icon: ClipboardList, title: "任务管理中心", desc: "创建和管理陪练任务", href: "/tasks", cta: "开始任务" },
    { icon: UserCog, title: "管理员后台", desc: "项目管理与报告生成", href: "/admin", cta: "进入后台" },
    { icon: Scale, title: "评分修正", desc: "申诉和人工评分处理", href: "/score-review", cta: "进入系统" },
    { icon: BarChart3, title: "仪表盘可视化", desc: "数据分析导出", href: "/dashboard", cta: "查看数据" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex flex-col">
      {/* 退出登录按钮 */}
      <button
        onClick={() => {
          try {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("username");
          } catch (error) {
            console.error("Error clearing localStorage:", error);
          }
          try {
            sessionStorage.removeItem("isLoggedIn");
            sessionStorage.removeItem("username");
          } catch (error) {
            console.error("Error clearing sessionStorage:", error);
          }
          try {
            document.cookie = "isLoggedIn=; path=/; max-age=0";
            document.cookie = "username=; path=/; max-age=0";
          } catch (error) {
            console.error("Error clearing cookies:", error);
          }
          router.push("/login");
        }}
        className="
          absolute
          top-4 left-4
          flex items-center gap-1
          bg-gradient-to-r from-red-500 to-pink-500
          hover:from-pink-500 hover:to-red-500
          text-white font-semibold px-3 py-1.5
          rounded-full shadow-md
          transition-all duration-300 ease-in-out
          hover:scale-105 hover:shadow-lg
          text-xs
          z-10
          sm:gap-2
          sm:px-4
          sm:py-2
          sm:text-sm
        "
      >
        <LogOut className="w-3 h-3 sm:w-4 sm:h-4" />
        <span className="hidden sm:inline">退出登录</span>
        <span className="sm:hidden">退出</span>
      </button>

      {/* Header */}
      <header className="relative max-w-6xl mx-auto px-4 py-4 pt-12 flex items-center justify-center sm:py-6 sm:pt-6 md:py-8 md:pt-8">
        <div className="bg-gradient-to-r from-indigo-100 via-white to-indigo-100 p-4 rounded-2xl border w-full mx-auto shadow-sm relative sm:p-5 md:p-8">
          <h1 className="text-xl font-bold text-gray-900 text-center tracking-tight sm:text-2xl md:text-4xl">
            智能销售培训系统
          </h1>
          <p className="text-gray-600 text-center mt-1 text-xs sm:mt-2 sm:text-sm md:text-base">
            提升销售技能，实现业绩突破
          </p>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 mb-4 sm:mb-6 md:mb-8">
        <div className="relative bg-white p-1 rounded-xl shadow-md mb-4 sm:mb-6 md:mb-8">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={() => {
                setActiveTab("learning");
                router.push("/?tab=learning", { scroll: false });
              }}
              className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl font-bold flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 flex-1 ${
                activeTab === "learning"
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-[1.02]"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent"
              }`}
            >
              <BookOpen size={16} className={activeTab === "learning" ? "text-white" : "text-purple-600"} />
              <span className="text-xs sm:text-sm sm:text-base">学习中心</span>
            </button>
            <button
              onClick={() => {
                setActiveTab("management");
                router.push("/?tab=management", { scroll: false });
              }}
              className={`px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl font-bold flex items-center gap-1 sm:gap-2 transition-all duration-300 ${
                activeTab === "management"
                  ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg scale-105 border-2 border-green-400"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent"
              }`}
            >
              <Settings size={16} className={activeTab === "management" ? "text-white" : "text-green-600"} />
              <span className="text-xs sm:text-sm sm:text-base">管理中心</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sections */}
      <main
        className="max-w-6xl mx-auto px-4 flex-grow pb-6 sm:pb-8"
        style={{ minHeight: contentHeight }}
      >
        {activeTab === "learning" && (
          <div className="slide-in">
            <Section title="学习中心" subtitle="系统化的销售技能培训与提升" items={learning} isLearning={true} />
          </div>
        )}
        {activeTab === "management" && (
          <div className="slide-in">
            <Section title="管理中心" subtitle="全面的培训管理与数据分析" items={manage} isLearning={false} />
          </div>
        )}
      </main>

      {/* 返回顶部按钮 */}
      <div
        className={`back-to-top ${showBackToTop ? "visible" : ""}`}
        onClick={scrollToTop}
        aria-label="返回顶部"
      >
        <ChevronUp size={24} />
      </div>
    </div>
  );
}
