"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function QAOpenPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [showFeedback, setShowFeedback] = useState(false)
  const [scores, setScores] = useState<number[]>([])
  const [feedbacks, setFeedbacks] = useState<string[]>([])

  // 模拟开放问答题库 - 实际应从知识库获取
  const questions = [
    {
      id: 1,
      category: "产品介绍",
      question: "请向客户介绍一下赛博坦-云盾防火墙的主要功能和优势。",
      keyWords: ["企业级", "安全防护", "云端部署", "智能识别", "高性能"],
      sampleAnswer:
        "赛博坦-云盾防火墙是专为中大型企业设计的企业级安全防护解决方案。它采用云端部署架构，具备智能威胁识别能力，能够实时监控和阻断各类网络攻击。产品具有高性能处理能力，支持100万并发连接，确保企业网络的安全稳定运行。",
      tips: "介绍时要突出'企业级'定位，强调'云端部署'的便利性和'智能识别'的先进性。",
    },
    {
      id: 2,
      category: "技术参数",
      question: "客户询问防火墙的性能指标，请详细说明技术参数。",
      keyWords: ["并发连接", "吞吐量", "延迟", "可用性", "扩展性"],
      sampleAnswer:
        "我们的云盾防火墙在性能方面表现优异：支持最大100万并发连接数，网络吞吐量可达10Gbps，平均延迟低于1ms。系统可用性达到99.99%，支持水平扩展，可根据业务增长灵活调整性能配置。",
      tips: "用具体数字说话，并解释这些参数对客户业务的实际意义。",
    },
    {
      id: 3,
      category: "报价信息",
      question: "客户关心成本问题，请介绍产品的定价策略和性价比优势。",
      keyWords: ["基础版", "企业版", "定制化", "ROI", "总体拥有成本"],
      sampleAnswer:
        "我们提供灵活的定价方案：基础版年费12万元，包含核心防护功能；企业版年费25万元，增加高级威胁检测和专属技术支持。相比传统硬件防火墙，我们的云端方案可节省60%的总体拥有成本，ROI回报周期仅需8个月。",
      tips: "强调性价比和ROI，用对比数据证明产品价值。",
    },
  ]

  const currentQ = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1

  // 智能评分函数
  const evaluateAnswer = (answer: string, question: any) => {
    let score = 0
    const feedback = []

    // 检查关键词覆盖
    const keyWordCount = question.keyWords.filter((keyword) =>
      answer.toLowerCase().includes(keyword.toLowerCase()),
    ).length

    const keyWordScore = (keyWordCount / question.keyWords.length) * 40
    score += keyWordScore

    if (keyWordCount >= question.keyWords.length * 0.8) {
      feedback.push("✅ 关键信息点覆盖完整")
    } else {
      feedback.push(
        `⚠️ 建议补充关键词：${question.keyWords
          .filter((kw) => !answer.toLowerCase().includes(kw.toLowerCase()))
          .join("、")}`,
      )
    }

    // 检查内容长度和详细程度
    if (answer.length >= 100) {
      score += 30
      feedback.push("✅ 回答详细充分")
    } else if (answer.length >= 50) {
      score += 20
      feedback.push("⚠️ 回答可以更详细一些")
    } else {
      score += 10
      feedback.push("❌ 回答过于简单，需要更多细节")
    }

    // 检查专业性
    const professionalWords = ["解决方案", "企业级", "性能", "安全", "技术", "服务"]
    const professionalCount = professionalWords.filter((word) => answer.includes(word)).length

    if (professionalCount >= 3) {
      score += 20
      feedback.push("✅ 表达专业规范")
    } else {
      score += 10
      feedback.push("⚠️ 可以使用更多专业术语")
    }

    // 检查结构性
    if (answer.includes("。") && answer.split("。").length >= 3) {
      score += 10
      feedback.push("✅ 回答结构清晰")
    } else {
      feedback.push("⚠️ 建议分点说明，结构更清晰")
    }

    return { score: Math.min(score, 100), feedback }
  }

  const handleSubmitAnswer = () => {
    if (!userAnswer.trim()) return

    const evaluation = evaluateAnswer(userAnswer, currentQ)
    setScores([...scores, evaluation.score])
    setFeedbacks([...feedbacks, evaluation.feedback.join("\n")])
    setShowFeedback(true)
  }

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      // 显示最终结果
      return
    }

    setCurrentQuestion(currentQuestion + 1)
    setUserAnswer("")
    setShowFeedback(false)
  }

  const handleRestart = () => {
    setCurrentQuestion(0)
    setUserAnswer("")
    setShowFeedback(false)
    setScores([])
    setFeedbacks([])
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  // 显示最终结果
  if (isLastQuestion && showFeedback) {
    const averageScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)

    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">💬 开放问答 - 结果</h1>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="text-center mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">训练完成！</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-6xl mb-4">{averageScore >= 80 ? "🎉" : averageScore >= 60 ? "👍" : "💪"}</div>

              <div>
                <div className={`text-4xl font-bold ${getScoreColor(averageScore)}`}>{averageScore}分</div>
                <div className="text-muted-foreground">平均得分</div>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-semibold mb-2">综合评价</h4>
                <p className="text-muted-foreground">
                  {averageScore >= 80
                    ? "优秀！您的产品介绍能力很强，能够准确传达产品价值，建议继续保持。"
                    : averageScore >= 60
                      ? "良好！基本掌握了产品介绍技巧，建议加强关键信息点的表达。"
                      : "需要提升！建议重新学习产品知识，多练习表达技巧。"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* 详细分数 */}
          <div className="grid gap-4 mb-6">
            {questions.map((q, index) => (
              <Card key={q.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="secondary">{q.category}</Badge>
                    <span className={`font-bold ${getScoreColor(scores[index])}`}>{scores[index]}分</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">{q.question}</p>
                  <div className="bg-muted p-3 rounded text-sm">
                    {feedbacks[index]?.split("\n").map((line, i) => (
                      <div key={i}>{line}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={handleRestart}>重新练习</Button>
            <Link href="/training/product-1/qa-choice">
              <Button variant="outline">尝试选择题</Button>
            </Link>
            <Link href="/training">
              <Button variant="outline">返回培训</Button>
            </Link>
          </div>
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
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">💬 开放问答训练</h1>
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
          <CardContent>
            <Textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="请输入您的回答..."
              className="min-h-32 mb-4"
              disabled={showFeedback}
            />
            <div className="text-sm text-muted-foreground">建议包含关键词：{currentQ.keyWords.join("、")}</div>
          </CardContent>
        </Card>

        {/* Feedback Card */}
        {showFeedback && (
          <Card className="mb-6 border-primary/20 bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-start gap-3 mb-4">
                <span className="text-2xl">📊</span>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="font-semibold text-lg">AI评分结果</h4>
                    <span className={`text-2xl font-bold ${getScoreColor(scores[scores.length - 1])}`}>
                      {scores[scores.length - 1]}分
                    </span>
                  </div>

                  <div className="bg-white p-4 rounded-lg mb-4">
                    <h5 className="font-medium mb-2">详细反馈：</h5>
                    <div className="space-y-1 text-sm">
                      {feedbacks[feedbacks.length - 1]?.split("\n").map((line, i) => (
                        <div key={i}>{line}</div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded">
                    <h5 className="font-medium text-blue-800 mb-1">参考答案：</h5>
                    <p className="text-sm text-blue-700 mb-2">{currentQ.sampleAnswer}</p>
                    <p className="text-sm text-blue-600">
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
            <Button onClick={handleSubmitAnswer} disabled={!userAnswer.trim()} className="px-8">
              提交答案
            </Button>
          ) : (
            <Button onClick={handleNextQuestion} className="px-8">
              {isLastQuestion ? "查看结果" : "下一题"}
            </Button>
          )}
        </div>

        {/* Current Progress */}
        {scores.length > 0 && (
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              当前平均分：{Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)}分
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
