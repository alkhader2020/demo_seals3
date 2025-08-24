"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export default function ProductQuizPage() {
  const router = useRouter()
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)

  const quizData = {
    question: "赛博坦-云盾防火墙适用于哪类企业？",
    options: [
      { id: "A", text: "小型公司", isCorrect: false },
      { id: "B", text: "中大型企业", isCorrect: true },
      { id: "C", text: "个人用户", isCorrect: false },
    ],
    correctAnswer: "B",
    explanation: "赛博坦-云盾防火墙是企业级网络安全解决方案，专为中大型企业的复杂网络环境和高安全需求而设计。",
  }

  const handleAnswerSelect = (optionId: string) => {
    setSelectedAnswer(optionId)
    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    router.push("/training/product-1/quiz-q2")
  }

  const isCorrect = selectedAnswer === quizData.correctAnswer

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">产品测验</h1>
            <Link href="/training">
              <Button variant="outline" size="sm">
                返回培训
              </Button>
            </Link>
          </div>

          {/* Progress */}
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">测验进度</span>
            <div className="flex-1">
              <Progress value={33} className="h-2" />
            </div>
            <span className="text-sm font-medium text-foreground">题目 1 / 3</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Question Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl text-primary">第 1 题</CardTitle>
          </CardHeader>
          <CardContent>
            <h3 className="text-lg font-semibold text-foreground mb-6">{quizData.question}</h3>

            <div className="space-y-3">
              {quizData.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  disabled={showFeedback}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                    selectedAnswer === option.id
                      ? showFeedback
                        ? option.isCorrect
                          ? "border-green-500 bg-green-50 text-green-800"
                          : "border-red-500 bg-red-50 text-red-800"
                        : "border-primary bg-primary/5 text-primary"
                      : showFeedback && option.isCorrect
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-primary/5"
                  } ${showFeedback ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-sm bg-muted px-2 py-1 rounded">{option.id}</span>
                    <span>{option.text}</span>
                    {showFeedback && option.isCorrect && <span className="ml-auto text-green-600">✅</span>}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {showFeedback && (
          <Card className={`mb-6 border-2 ${isCorrect ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"}`}>
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                <span className="text-2xl">{isCorrect ? "✅" : "❌"}</span>
                <div className="flex-1">
                  <h4 className={`font-semibold mb-2 ${isCorrect ? "text-green-800" : "text-red-800"}`}>
                    {isCorrect
                      ? "回答正确，我们继续下一题。"
                      : `回答错误，正确答案是 ${quizData.correctAnswer}：${quizData.options.find((opt) => opt.isCorrect)?.text}。`}
                  </h4>
                  <p className={`text-sm ${isCorrect ? "text-green-700" : "text-red-700"}`}>{quizData.explanation}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-current/20">
                <Button onClick={handleNextQuestion} className="w-full sm:w-auto">
                  下一题 →
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Link href="/training/product-1/intro">
            <Button variant="outline">← 返回课程</Button>
          </Link>
          <div className="text-sm text-muted-foreground">题目 1 / 3</div>
        </div>
      </main>
    </div>
  )
}
