"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

function isMobile(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(navigator.userAgent);
}

export default function LiveTrainingPage() {
  const [iframeUrl, setIframeUrl] = useState("");

  const startScene = (url: string) => {
    // على الجوال: افتح المشهد في تبويب/نافذة كاملة لتفادي شريط النسخ/التحديد
    if (isMobile()) {
      window.location.assign(url);
      return;
    }
    // على الديسكتوب: اعرض داخل iframe
    setIframeUrl(url);
  };

  if (iframeUrl) {
    // عرض iframe على الديسكتوب
    return (
      <div className="min-h-screen bg-white p-4">
        <div className="mb-4 flex gap-2">
          <Button variant="secondary" onClick={() => setIframeUrl("")}>
            返回上一页
          </Button>
          <Link href="/">
            <Button variant="outline">退出</Button>
          </Link>
        </div>

        <div className="w-full h-[calc(100vh-120px)]">
          <iframe
            src={iframeUrl}
            title="live-training"
            className="w-full h-full rounded-lg border-0"
            // صلاحيات الصوت/الصورة + التشغيل التلقائي داخل الإطار
            allow="microphone; camera; autoplay; clipboard-read; clipboard-write"
            // sandbox لرفع الأمان والسماح بالميزات اللازمة
            sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-downloads"
            // السماح بملء الشاشة (لو المشهد يدعمه)
            allowFullScreen
            // تحميل فوري (مفيد للكاميرا/المايك)
            loading="eager"
            // تحسين اللمس على الشاشات
            style={{
              WebkitTapHighlightColor: "transparent",
              touchAction: "manipulation",
              WebkitUserSelect: "none",
              userSelect: "none",
            }}
          />
        </div>

        <p className="mt-3 text-xs text-gray-500">
          提示：若麦克风无法使用，请确保本页面使用 HTTPS（或 localhost）。
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">销售角色实训</h1>
        <Link href="/">
          <Button variant="outline">退出</Button>
        </Link>
      </div>

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
            url: "https://avatargpt.cybotstar.cn/chat/preview/112/1732774021-7809/2cbc17a9-5dab-4215-bcac-fbde8e2560ea/iframe",
          },
          {
            title: "异议处理场景",
            desc: "掌握处理客户常见异议的技巧与方法。",
            level: "中级",
            duration: "20分钟",
            url: "https://avatargpt.cybotstar.cn/chat/h5/112/1732774021-7809/8b69ff2d-a2c5-47bc-8fd7-fdf08b147829e",
          },
          {
            title: "价格谈判场景",
            desc: "提升价格谈判能力，达成双赢交易。",
            level: "高级",
            duration: "25分钟",
            url: "https://avatargpt.cybotstar.cn/chat/h5/112/1732774021-7809/58ae8134-df3a-4278-9cff-23f794d3c538",
          },
          {
            title: "客户跟进场景",
            desc: "学习有效的客户跟进策略与技巧。",
            level: "中级",
            duration: "18分钟",
            url: "https://avatargpt.cybotstar.cn/chat/h5/112/1732774021-7809/58ae8134-df3a-4278-9cff-23f794d3c538",
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
              <Button className="w-full" onClick={() => startScene(scene.url)}>
                开始场景
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
