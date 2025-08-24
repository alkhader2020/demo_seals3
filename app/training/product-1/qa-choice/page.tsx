"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function QAChoicePage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])

  // 模拟题库数据 - 实际应从知识库获取
  const questions = [
    {
      id: 1,
      category: "产品介绍",
      question: "赛博坦-云盾防火墙主要适用于哪类企业？",
      options: [
        { id: "A", text: "小型公司", correct: false },
        { id: "B", text: "中大型企业", correct: true },
        { id: "C", text: "个人用户", correct: false },
        { id: "D", text: "政府机构", correct: false },
      ],
      explanation: "赛博坦-云盾防火墙专为中大型企业设计，具备企业级安全防护能力和高并发处理性能。",
      tips: "强调'企业级'、'规模化部署'等关键词能更好地突出产品定位。",
    },
    {
      id: 2,
      category: "技术参数",
      question: "云盾防火墙的最大并发连接数是多少？",
      options: [
        { id: "A", text: "10万", correct: false },
        { id: "B", text: "50万", correct: false },
        { id: "C", text: "100万", correct: true },
        { id: "D", text: "200万", correct: false },
      ],
      explanation: "云盾防火墙支持最大100万并发连接，满足大型企业的高并发访问需求。",
      tips: "在介绍技术参数时，要结合客户的实际业务场景来说明参数的价值。",
    },
    {
      id: 3,
      category: "报价信息",
      question: "云盾防火墙的基础版年费大约是多少？",
      options: [
        { id: "A", text: "5万元", correct: false },
        { id: "B", text: "12万元", correct: true },
        { id: "C", text: "20万元", correct: false },
        { id: "D", text: "30万元", correct: false },
      ],
      explanation: "基础版年费约12万元，包含基础防护功能和标准技术支持服务。",
      tips: "报价时要强调性价比和ROI，让客户理解投资价值。",
    },
  ]

  const currentQ = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  const handleAnswerSelect = (optionId: string) => {
    if (showFeedback) return
    setSelectedAnswer(optionId)
  }

  const handleSubmitAnswer = () => {
    if (!selectedAnswer) return

    const isCorrect = currentQ.options.find((opt) => opt.id === selectedAnswer)?.correct || false
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // 跳转到结果页面
      return
    }

    setCurrentQuestion(currentQuestion + 1)
    setSelectedAnswer(null)
    setShowFeedback(false)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setSelectedAnswer(null)
    setShowFeedback(false)
    setScore(0)
    setAnswers([])
  }

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  // 显示最终结果
  if (isLastQuestion && showFeedback) {
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">📝 选择题训练 - 结果</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle className="text-2xl">训练完成！</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl mb-4">{percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "💪"}</div>

              <div>
                <div className={`text-4xl font-bold ${getScoreColor(percentage)}`}>
                  {score}/{questions.length}
                </div>
                <div className={`text-xl ${getScoreColor(percentage)}`}>正确率：{percentage}%</div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">评价反馈</h4>
                <p className="text-muted-foreground">
                  {percentage >= 80
                    ? "优秀！您已经很好地掌握了产品知识，可以自信地向客户介绍产品。"
                    : percentage >= 60
                      ? "良好！基础知识掌握不错，建议重点复习错误的知识点。"
                      : "需要加强！建议重新学习相关模块内容，多做练习。"}
                </p>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={handleRestart}>重新练习</Button>
                <Link href="/training/product-1/qa-open">
                  <Button variant="outline">尝试开放问答</Button>
                </Link>
                <Link href="/training">
                  <Button variant="outline">返回培训</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">📝 选择题训练</h1>
            <Link href="/training">
              <Button variant="outline" size="sm">
                返回培训
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="secondary">{currentQ.category}</Badge>
            <span className="text-sm text-muted-foreground">
              第 {currentQuestion + 1} 题 / 共 {questions.length} 题
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{currentQ.question}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {currentQ.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswer === option.id
                    ? showFeedback
                      ? option.correct
                        ? "border-green-500 bg-green-50 text-green-800"
                        : "border-red-500 bg-red-50 text-red-800"
                      : "border-primary bg-primary/5"
                    : showFeedback && option.correct
                      ? "border-green-500 bg-green-50 text-green-800"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                } ${showFeedback ? "cursor-default" : "cursor-pointer"}`}
              >
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-primary">{option.id}.</span>
                  <span>{option.text}</span>
                  {showFeedback && selectedAnswer === option.id && (
                    <span className="ml-auto">{option.correct ? "✅" : "❌"}</span>
                  )}
                  {showFeedback && option.correct && selectedAnswer !== option.id && (
                    <span className="ml-auto">✅</span>
                  )}
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Feedback Card */}
        {showFeedback && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">
                  {currentQ.options.find((opt) => opt.id === selectedAnswer)?.correct ? "🎉" : "💡"}
                </span>
                <div>
                  <h4 className="font-semibold text-lg mb-2">
                    {currentQ.options.find((opt) => opt.id === selectedAnswer)?.correct ? "回答正确！" : "回答错误"}
                  </h4>
                  <p className="text-muted-foreground mb-3">{currentQ.explanation}</p>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                    <p className="text-sm text-blue-800">
                      <strong>话术建议：</strong>
                      {currentQ.tips}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          {!showFeedback ? (
            <Button onClick={handleSubmitAnswer} disabled={!selectedAnswer} className="px-8">
              确认答案
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="px-8">
              {isLastQuestion ? "查看结果" : "下一题"}
            </Button>
          )}
        </div>

        {/* Current Score */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted-foreground">
            当前得分：{score}/{currentQuestion + (showFeedback ? 1 : 0)}
          </p>
        </div>
      </main>
    </div>
  )
}
