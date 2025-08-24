"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function LiveTrainingPage() {
  const [iframeUrl, setIframeUrl] = useState("")

  if (iframeUrl) {
    // ✅ بعد اختيار سيناريو: نعرض الـ iframe كاملاً تقريبًا بارتفاع الشاشة
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="mb-4">
          <Button variant="secondary" onClick={() => setIframeUrl("")}>
            返回上一页
          </Button>
        </div>

        <div className="w-full h-[calc(100vh-120px)]">
          <iframe
            src={iframeUrl}
            title="live-training"
            className="w-full h-full rounded-lg border-0"
            // صلاحيات الصوت/الصورة + التشغيل التلقائي داخل الإطار
            allow="microphone; camera; autoplay; clipboard-read; clipboard-write"
            // لو الموقع داخل iframe يحتاج ملء الشاشة
            allowFullScreen
            // تحميل فوري (مهم للكاميرا/المايك)
            loading="eager"
          />
        </div>

        {/* تلميح مفيد للمطورين */}
        <p className="mt-3 text-xs text-gray-500">
          提示：若麦克风无法使用，请确保本页面使用 HTTPS（或 localhost）。
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-6">销售角色实训</h1>
      <p className="text-gray-500 mb-8">
        以下是我们提供的实际培训场景示例，每个场景都模拟了真实销售环境中的常见情况，通过角色扮演方式提升销售技巧。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            title: "产品介绍场景",
            desc: "学习如何向客户有效介绍产品特点与优势。",
            level: "初级",
            duration: "15分钟",
            url: "https://avatargpt.cybotstar.cn/chat/112/1732774021-7809/avatar",
          },
          {
            title: "异议处理场景",
            desc: "掌握处理客户常见异议的技巧与方法。",
            level: "中级",
            duration: "20分钟",
            url: "https://avatargpt.cybotstar.cn/chat/h5/112/1732774021-7809/fe65206b-c135-45f9-9cb5-d4c6a9cb9436",
          },
          {
            title: "价格谈判场景",
            desc: "提升价格谈判能力，达成双赢交易。",
            level: "高级",
            duration: "25分钟",
            url: "https://avatargpt.cybotstar.cn/chat/h5/112/1732774021-7809/fe65206b-c135-45f9-9cb5-d4c6a9cb9436",
          },
          {
            title: "客户跟进场景",
            desc: "学习有效的客户跟进策略与技巧。",
            level: "中级",
            duration: "18分钟",
            url: "https://avatargpt.cybotstar.cn/chat/h5/112/1732774021-7809/fe65206b-c135-45f9-9cb5-d4c6a9cb9436",
          },
        ].map((scene, idx) => (
          <Card key={idx}>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{scene.title}</CardTitle>
                <Badge>{scene.level}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{scene.desc}</p>
              <div className="text-sm text-muted-foreground mb-4 flex gap-4">
                <span>👥 2人</span>
                <span>📄 {scene.duration}</span>
              </div>
              <Button className="w-full" onClick={() => setIframeUrl(scene.url)}>
                开始场景
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
