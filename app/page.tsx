"use client"

import { useEffect } from "react"
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
} from "lucide-react"

const Item = ({ icon: Icon, title, desc, href, cta }: any) => (
  <div className="bg-white rounded-xl p-5 border hover:shadow-lg transition-all hover:scale-[1.02]">
    <div className="flex items-start gap-4">
      <div className="bg-indigo-100 text-indigo-600 rounded-xl w-12 h-12 flex items-center justify-center shadow-inner">
        <Icon className="h-6 w-6" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-1">{desc}</p>
        <Link href={href}>
          <button className="mt-3 w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-4 rounded-lg font-medium text-sm transition-all">
            {cta}
          </button>
        </Link>
      </div>
    </div>
  </div>
)

const Section = ({ title, subtitle, items }: any) => (
  <section className="mb-10 space-y-4">
    <div className="flex items-center gap-3">
      <LayoutDashboard className="text-indigo-600 w-5 h-5" />
      <div>
        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
      {items.map((item: any) => (
        <Item key={item.title} {...item} />
      ))}
    </div>
  </section>
)

export default function HomePage() {
  const router = useRouter()

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

    // 立即检查一次
    checkLoginStatus()

    // 添加storage事件监听，以便在其他标签页更改登录状态时能够响应
    const handleStorageChange = () => {
      checkLoginStatus()
    }

    window.addEventListener('storage', handleStorageChange)

    // 清理函数
    return () => {
      window.removeEventListener('storage', handleStorageChange)
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      {/* Header */}
      <header className="relative max-w-6xl mx-auto px-4 py-8">
        {/* عنوان في المنتصف */}
        <div className="bg-gradient-to-r from-indigo-100 via-white to-indigo-100 p-6 rounded-2xl border w-full mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            智能销售培训系统
          </h1>
        </div>

        {/* زر الخروج صغير في أعلى اليمين */}
        <button
          onClick={() => {
            localStorage.removeItem("isLoggedIn")
            localStorage.removeItem("username")
            router.push("/login")
          }}
         className="absolute right-4 bg-gradient-to-r from-indigo-100 via-white to-indigo-100 border border-indigo-300 text-gray-700 hover:bg-indigo-200 py-2 px-4 rounded-lg text-sm font-medium shadow-sm transition-colors"
         style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          <LogOut className="w-2 h-2" />
          <span>退出登录</span>
        </button>
      </header>

      {/* Sections */}
      <main className="max-w-6xl mx-auto px-4">
        <Section title="学习中心" subtitle="系统化的销售技能培训与提升" items={learning} />
        <Section title="管理中心" subtitle="全面的培训管理与数据分析" items={manage} />
      </main>
    </div>
  )
}
