"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  GraduationCap,
  Users,
  ClipboardList,
  BarChart3,
  UserCog,
  Scale,
  LayoutDashboard,
  LogOut,
  BookOpen,
  Settings,
  ChevronUp,
  Moon,
  Sun,
} from "lucide-react"

const Item = ({ icon: Icon, title, desc, href, cta, isLearning }: any) => (
  <div className="bg-white rounded-xl p-6 border card-shadow transition-all duration-300 hover:scale-[1.02] h-full flex flex-col shadow-sm hover:shadow-md">
    <div className="flex items-start gap-4 mb-4">
      <div className={`${isLearning ? "bg-indigo-100 text-indigo-600" : "bg-green-100 text-green-600"} rounded-xl w-14 h-14 flex items-center justify-center shadow-inner`}>
        <Icon className="h-7 w-7" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-bold text-gray-900 tracking-tight">{title}</h3>
        <p className="text-secondary text-base mt-2 leading-relaxed line-clamp-2">{desc}</p>
      </div>
    </div>
    <div className="mt-auto pt-4">
      <Link href={href}>
        <button className={`w-full mobile-full-btn ${isLearning ? "bg-gradient-to-r from-indigo-500 to-purple-500" : "bg-gradient-to-r from-green-500 to-teal-500"} text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.03] hover:shadow-lg flex items-center justify-center gap-2 shadow-md`}>
          {isLearning ? <BookOpen className="w-4 h-4" /> : <Settings className="w-4 h-4" />}
          {cta}
        </button>
      </Link>
    </div>
  </div>
)

const Section = ({ title, subtitle, items, isLearning }: any) => (
  <section className="mb-16 space-y-8">
    <div className="flex items-center gap-4 mb-6">
      {isLearning ? (
        <div className="bg-indigo-100 text-indigo-600 rounded-xl w-12 h-12 flex items-center justify-center shadow-inner">
          <BookOpen className="w-6 h-6" />
        </div>
      ) : (
        <div className="bg-green-100 text-green-600 rounded-xl w-12 h-12 flex items-center justify-center shadow-inner">
          <Settings className="w-6 h-6" />
        </div>
      )}
      <div>
        <h2 className={`text-2xl font-bold ${isLearning ? "text-indigo-700" : "text-green-700"} tracking-tight`}>{title}</h2>
        <p className="text-secondary text-base mt-1">{subtitle}</p>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {items.map((item: any) => (
        <div key={item.title} className="h-full">
          <Item {...item} isLearning={isLearning} />
        </div>
      ))}
    </div>
  </section>
)

export default function HomePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"learning" | "management">("learning")
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [contentHeight, setContentHeight] = useState("auto")
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // 检查登录状态
    const checkLoginStatus = () => {
      try {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
        if (!isLoggedIn) {
          router.push("/login")
        }
      } catch (error) {
        console.error("Error checking login status:", error)
        // 如果localStorage不可用，重定向到登录页
        router.push("/login")
      }
    }

    // 检查暗黑模式设置
    const checkDarkMode = () => {
      try {
        const savedDarkMode = localStorage.getItem("darkMode") === "true"
        setDarkMode(savedDarkMode)
        if (savedDarkMode) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      } catch (error) {
        console.error("Error checking dark mode setting:", error)
      }
    }

    // 立即检查一次
    checkLoginStatus()
    checkDarkMode()

    // 添加storage事件监听，以便在其他标签页更改设置时能够响应
    const handleStorageChange = () => {
      checkLoginStatus()
      checkDarkMode()
    }

    window.addEventListener('storage', handleStorageChange)

    // 监听滚动事件，控制返回顶部按钮显示
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    
    window.addEventListener('scroll', handleScroll)

    // 动态调整内容高度
    const adjustContentHeight = () => {
      const windowHeight = window.innerHeight
      const headerHeight = document.querySelector("header")?.clientHeight || 0
      const tabsHeight = document.querySelector('[class*="relative bg-white p-3"]')?.clientHeight || 0
      const availableHeight = windowHeight - headerHeight - tabsHeight - 100 // 100为底部留白
      setContentHeight(`${Math.max(availableHeight, 500)}px`) // 最小高度为500px
    }
    
    // 初始调整和窗口大小变化时调整
    adjustContentHeight()
    window.addEventListener('resize', adjustContentHeight)

    // 清理函数
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', adjustContentHeight)
    }
  }, [router])

  const learning = [
    { icon: GraduationCap, title: "销售基础训练", desc: "系统学习产品知识和销售技巧", href: "/training", cta: "开始学习" },
    { icon: Users, title: "销售角色实训", desc: "通过角色扮演提升销售技能", href: "/live-training", cta: "开始实训" },
    { icon: ClipboardList, title: "学习任务模式", desc: "自主学习与任务管理", href: "/learning-modes", cta: "进入任务" },
    { icon: BarChart3, title: "学员成绩分析", desc: "查看个人训练记录与成长轨迹", href: "/student-analysis", cta: "查看分析" },
  ]

  const manage = [
    { icon: ClipboardList, title: "任务管理中心", desc: "创建和管理陪练任务", href: "/tasks", cta: "开始任务" },
    { icon: UserCog, title: "管理员后台", desc: "项目管理与报告生成", href: "/admin", cta: "进入后台" },
    { icon: Scale, title: "评分修正", desc: "申诉和人工评分处理", href: "/score-review", cta: "进入系统" },
    { icon: BarChart3, title: "仪表盘可视化", desc: "数据分析导出", href: "/dashboard", cta: "查看数据" },
  ]

  // 返回顶部函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // 切换暗黑模式
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    
    try {
      localStorage.setItem("darkMode", newDarkMode.toString())
      if (newDarkMode) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
    } catch (error) {
      console.error("Error saving dark mode setting:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 pb-20 flex flex-col dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800">

      {/* 暗黑模式切换按钮 */}
      <div 
        className="fixed top-6 right-6 z-50 bg-white dark:bg-slate-800 w-12 h-12 rounded-full flex items-center justify-center shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-xl"
        onClick={toggleDarkMode}
        aria-label={darkMode ? "切换至亮色模式" : "切换至暗色模式"}
      >
        {darkMode ? <Sun size={22} className="text-yellow-400" /> : <Moon size={22} className="text-slate-700" />}
      </div>

      {/* 退出登录按钮 */}
      <button
        onClick={() => {
          localStorage.removeItem("isLoggedIn")
          localStorage.removeItem("username")
          router.push("/login")
        }}
        className="
         absolute 
        top-1/13 
        left-1/11 
        transform -translate-y-1/2
        flex items-center gap-2
        bg-gradient-to-r from-red-500 to-pink-500 
        hover:from-pink-500 hover:to-red-500
        text-white font-semibold px-5 py-2 
        rounded-full shadow-md
        transition-all duration-300 ease-in-out
        hover:scale-105 hover:shadow-lg
        "
      >
        <LogOut className="w-4 h-4" />
        <span>退出登录</span>
      </button>

      {/* Header */}
      <header className="relative max-w-6xl mx-auto px-4 py-8 flex items-center justify-between">

        {/* 标题区域 */}
        <div className="bg-gradient-to-r from-indigo-100 via-white to-indigo-100 p-8 rounded-2xl border w-full mx-auto shadow-sm relative">
          <h1 className="text-4xl font-bold text-gray-900 text-center tracking-tight">
            智能销售培训系统
          </h1>
          <p className="text-gray-600 text-center mt-2 dark:text-gray-300 text-sm sm:text-base">提升销售技能，实现业绩突破</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4 mb-8">
        <div className="relative bg-white p-1 rounded-xl shadow-md mb-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            <button
              onClick={() => setActiveTab("learning")}
              className={`px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-300 flex-1 ${
                activeTab === "learning" 
                  ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg scale-[1.02]" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent"
              }`}
            >
              <BookOpen size={20} className={activeTab === "learning" ? "text-white" : "text-purple-600"} />
              <span>学习中心</span>
            </button>
            <button
              onClick={() => setActiveTab("management")}
              className={`px-5 py-3 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 ${
                activeTab === "management" 
                  ? "bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-lg scale-105 border-2 border-green-400" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 border-2 border-transparent"
              }`}
            >
              <Settings size={20} className={activeTab === "management" ? "text-white" : "text-green-600"} />
              <span>管理中心</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sections */}
      <main className="max-w-6xl mx-auto px-4 flex-grow" style={{ minHeight: contentHeight }}>
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
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="返回顶部"
      >
        <ChevronUp size={24} />
      </div>
      
      {/* 暗黑模式切换按钮（移动端） */}
      <div 
        className="md:hidden theme-toggle"
        onClick={toggleDarkMode}
        aria-label={darkMode ? "切换至亮色模式" : "切换至暗色模式"}
        style={{ bottom: "80px" }}
      >
        {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-gray-700" />}
      </div>
    </div>
  )
}
