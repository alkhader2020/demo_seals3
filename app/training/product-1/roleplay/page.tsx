"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  id: number
  sender: "ai" | "user"
  content: string
  timestamp: Date
}

export default function RolePlayPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "ai",
      content: "你们这个云盾防火墙是干什么用的？",
      timestamp: new Date(),
    },
  ])
  const [currentInput, setCurrentInput] = useState("")
  const [currentRound, setCurrentRound] = useState(1)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showRating, setShowRating] = useState(false)
  const [rating, setRating] = useState(0)

  // AI responses for each round
  const aiResponses = {
    2: "和别家的防火墙比起来，有什么不同？",
    3: "听起来不错，我回去和 IT 部门讨论一下。",
  }

  // Keywords for positive feedback detection
  const positiveKeywords = ["企业级", "安全隔离", "高性能", "云端", "智能防护", "多层防护"]

  const handleSendMessage = () => {
    if (!currentInput.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      sender: "user",
      content: currentInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Check for positive keywords
    const hasPositiveKeywords = positiveKeywords.some((keyword) => currentInput.includes(keyword))

    // Add AI response after a short delay
    setTimeout(() => {
      if (currentRound < 3) {
        const aiMessage: Message = {
          id: messages.length + 2,
          sender: "ai",
          content: aiResponses[(currentRound + 1) as keyof typeof aiResponses],
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
        setCurrentRound((prev) => prev + 1)
      } else {
        // Final round completed
        const finalMessage: Message = {
          id: messages.length + 2,
          sender: "ai",
          content: hasPositiveKeywords
            ? "听起来不错，我回去和 IT 部门讨论一下。你的介绍很专业！"
            : "听起来不错，我回去和 IT 部门讨论一下。",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, finalMessage])
        setIsCompleted(true)
        setTimeout(() => setShowRating(true), 1000)
      }
    }, 1000)

    setCurrentInput("")
  }

  const handleRetry = () => {
    setCurrentInput("")
  }

  const handleHint = () => {
    const hints = {
      1: "提示：可以从企业级安全防护、云端部署、智能威胁检测等方面介绍",
      2: "提示：可以强调我们的多层防护技术、AI智能分析、部署灵活性等优势",
      3: "提示：可以提供技术支持、试用期、定制化服务等后续服务",
    }
    alert(hints[currentRound as keyof typeof hints])
  }

  const handleSkip = () => {
    if (currentRound < 3) {
      setCurrentRound((prev) => prev + 1)
      const aiMessage: Message = {
        id: messages.length + 1,
        sender: "ai",
        content: aiResponses[(currentRound + 1) as keyof typeof aiResponses],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    } else {
      setIsCompleted(true)
      setShowRating(true)
    }
  }

  const handleRatingSubmit = () => {
    // Here you would typically save the rating to backend
    router.push("/training")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">销售角色扮演</h1>
            <Link href="/training">
              <Button variant="outline" size="sm">
                返回培训
              </Button>
            </Link>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">对话进度</span>
            <div className="flex-1">
              <Progress value={(currentRound / 3) * 100} className="h-2" />
            </div>
            <span className="text-sm font-medium text-foreground">第 {currentRound} 轮 / 3</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Role Introduction */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-primary">角色设定</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">👨‍💼</span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground">张总 - 企业高管</h3>
                <p className="text-sm text-muted-foreground">45岁，负责网络安全，正在了解防火墙解决方案</p>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-500 rounded">
              <p className="text-sm text-blue-800">
                <strong>你的任务：</strong>
                作为销售人员，向张总介绍"赛博坦-云盾防火墙"产品，运用刚学到的产品知识进行专业介绍。
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Chat Messages */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">对话记录</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium">{message.sender === "user" ? "你" : "张总"}</span>
                      <span className="text-xs opacity-70">{message.timestamp.toLocaleTimeString()}</span>
                    </div>
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Input Area */}
        {!isCompleted && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="space-y-4">
                <Textarea
                  placeholder="输入你的回答..."
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex flex-wrap gap-2">
                  <Button onClick={handleSendMessage} disabled={!currentInput.trim()}>
                    发送回答
                  </Button>
                  <Button variant="outline" onClick={handleRetry}>
                    重新说一次
                  </Button>
                  <Button variant="outline" onClick={handleHint}>
                    提示语
                  </Button>
                  <Button variant="ghost" onClick={handleSkip}>
                    跳过
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rating Modal */}
        {showRating && (
          <Card className="border-2 border-primary">
            <CardHeader>
              <CardTitle className="text-xl text-center">角色扮演完成！</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">请为本次角色扮演体验评分：</p>
              <div className="flex justify-center gap-2 mb-6">
                {[1, 2, 3].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`text-3xl transition-colors ${star <= rating ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    ⭐
                  </button>
                ))}
              </div>
              <div className="space-y-3">
                <Button onClick={handleRatingSubmit} className="w-full">
                  提交评价
                </Button>
                <Button variant="outline" onClick={() => router.push("/training")} className="w-full">
                  返回培训主页
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href="/training/product-1/quiz">
            <Button variant="outline">← 返回测验</Button>
          </Link>
          <div className="text-sm text-muted-foreground">
            {isCompleted ? "角色扮演已完成" : `第 ${currentRound} 轮对话`}
          </div>
        </div>
      </main>
    </div>
  )
}
