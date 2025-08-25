import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 pb-20 flex flex-col dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-800">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-800">📘 销售基础培训</h1>
            <Link href="/">
              <Button
                variant="outline"
                size="sm"
                className="text-slate-600 border-slate-300 hover:bg-slate-50 bg-transparent"
              >
                返回首页
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <Card className="mb-8 shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
            <CardTitle className="text-xl font-bold text-indigo-800 flex items-center gap-3">
              🤖 产品理解训练
              <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">AI陪练</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-slate-600 mb-8 text-lg leading-relaxed max-w-prose">
              通过 AI 问答训练，快速掌握产品知识点。支持多种互动模式，提升学习效果。
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              <Link href="/training/product-1/qa-choice">
                <Button className="w-full h-20 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] flex flex-col items-center justify-center text-lg min-h-[44px] min-w-[44px]">
                  <span className="text-3xl mb-1"></span>
                  <span className="font-semibold">选择题模式</span>
                  <span className="text-xs opacity-80">Choice Quiz</span>
                </Button>
              </Link>

              <Link href="/training/product-1/qa-open">
                <Button className="w-full h-20 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] flex flex-col items-center justify-center text-lg min-h-[44px] min-w-[44px]">
                  <span className="text-3xl mb-1"></span>
                  <span className="font-semibold">开放问答模式</span>
                  <span className="text-xs opacity-80">Open QA</span>
                </Button>
              </Link>

              <Link href="/training/product-1/dialogue">
                <Button className="w-full h-20 bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] flex flex-col items-center justify-center text-lg min-h-[44px] min-w-[44px]">
                  <span className="text-3xl mb-1"></span>
                  <span className="font-semibold">自由对话练习</span>
                  <span className="text-xs opacity-80">Role Play</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md border-slate-200">
          <CardContent className="p-6">
            <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <span className="text-3xl">📌</span>
              学习提示
            </h4>
            <p className="text-slate-600 leading-relaxed max-w-prose">
              请使用上方的 AI 陪练功能进行产品知识学习。系统会根据您的回答提供个性化反馈，帮助您快速提升销售技能。
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
