// app/training/page.tsx （或相应路径）
// 说明：为移动端预留底部安全区（pb-safe），统一 PC/手机 布局尺寸

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-100 flex flex-col">
      {/* 顶部栏：在手机端保持粘性，避免滚动丢失返回 */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="mx-auto max-w-screen-xl px-4 md:px-6 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-3xl font-bold text-slate-800">📘 销售基础培训</h1>
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

      {/* 内容区：pb-safe 确保不被底部导航遮挡 */}
      <main className="mx-auto max-w-screen-xl px-4 md:px-6 py-6 md:py-10 pb-safe">
        {/* 产品理解训练 */}
        <Card className="mb-6 md:mb-8 shadow-lg border-0 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-indigo-100">
            <CardTitle className="text-lg md:text-xl font-bold text-indigo-800 flex items-center gap-3">
              🤖 产品理解训练
              <span className="bg-indigo-100 text-indigo-700 text-xs px-3 py-1 rounded-full font-medium">AI陪练</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-5 md:p-8">
            <p className="text-slate-600 mb-6 md:mb-8 text-base md:text-lg leading-relaxed max-w-prose">
              通过 AI 问答训练，快速掌握产品知识点。支持多种互动模式，提升学习效果。
            </p>

            {/* 按钮网格：手机1列 / 平板2列 / 桌面3列 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              <Link href="/training/product-1/qa-choice">
                <Button className="w-full h-20 bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] flex flex-col items-center justify-center text-lg min-h-[44px]">
                  <span className="font-semibold">选择题模式</span>
                  <span className="text-xs opacity-80">Choice Quiz</span>
                </Button>
              </Link>

              <Link href="/training/product-1/qa-open">
                <Button className="w-full h-20 bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] flex flex-col items-center justify-center text-lg min-h-[44px]">
                  <span className="font-semibold">开放问答模式</span>
                  <span className="text-xs opacity-80">Open QA</span>
                </Button>
              </Link>

              <Link href="/training/product-1/dialogue">
                <Button className="w-full h-20 bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] flex flex-col items-center justify-center text-lg min-h-[44px]">
                  <span className="font-semibold">自由对话练习</span>
                  <span className="text-xs opacity-80">Role Play</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 学习提示 */}
        <Card className="shadow-md border-slate-200">
          <CardContent className="p-5 md:p-6">
            <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <span className="text-2xl md:text-3xl">📌</span>
              学习提示
            </h4>
            <p className="text-slate-600 leading-relaxed max-w-prose text-sm md:text-base">
              请使用上方的 AI 陪练功能进行产品知识学习。系统会根据您的回答提供个性化反馈，帮助您快速提升销售技能。
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
