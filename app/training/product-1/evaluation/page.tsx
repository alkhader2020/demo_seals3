"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface EvaluationCriteria {
  id: string
  name: string
  description: string
  keywords: string[]
  weight: number
  score: number
  feedback: string
}

interface EvaluationResult {
  totalScore: number
  missingPoints: string[]
  suggestions: string[]
  criteriaScores: EvaluationCriteria[]
}

export default function EvaluationPage() {
  const router = useRouter()
  const [userInput, setUserInput] = useState("")
  const [isEvaluating, setIsEvaluating] = useState(false)
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null)

  // Evaluation criteria based on cloud firewall introduction
  const evaluationCriteria: EvaluationCriteria[] = [
    {
      id: "positioning",
      name: "产品定位",
      description: "是否准确说明产品的市场定位和目标客户",
      keywords: ["企业级", "中大型企业", "云端", "专业", "商用"],
      weight: 30,
      score: 0,
      feedback: "",
    },
    {
      id: "security",
      name: "安全功能",
      description: "是否详细介绍防火墙的核心安全功能",
      keywords: ["防护", "安全隔离", "威胁检测", "入侵防护", "流量监控", "恶意软件"],
      weight: 40,
      score: 0,
      feedback: "",
    },
    {
      id: "scenarios",
      name: "适用场景",
      description: "是否说明产品的具体应用场景和使用环境",
      keywords: ["数据中心", "网络边界", "远程办公", "混合云", "多分支", "业务连续性"],
      weight: 30,
      score: 0,
      feedback: "",
    },
  ]

  const evaluateContent = (content: string): EvaluationResult => {
    const contentLower = content.toLowerCase()
    const evaluatedCriteria = evaluationCriteria.map((criteria) => {
      const matchedKeywords = criteria.keywords.filter((keyword) => contentLower.includes(keyword.toLowerCase()))

      const keywordScore = (matchedKeywords.length / criteria.keywords.length) * 100
      const lengthScore = Math.min((content.length / 200) * 100, 100) // Bonus for detailed explanation
      const finalScore = Math.round(keywordScore * 0.7 + lengthScore * 0.3)

      let feedback = ""
      if (finalScore >= 80) {
        feedback = "优秀！很好地覆盖了这个方面的关键内容。"
      } else if (finalScore >= 60) {
        feedback = "良好，但可以更详细地说明相关要点。"
      } else {
        feedback = "需要改进，缺少关键信息点。"
      }

      return {
        ...criteria,
        score: finalScore,
        feedback,
      }
    })

    const totalScore = Math.round(
      evaluatedCriteria.reduce((sum, criteria) => sum + (criteria.score * criteria.weight) / 100, 0),
    )

    const missingPoints = evaluatedCriteria.filter((criteria) => criteria.score < 60).map((criteria) => criteria.name)

    const suggestions = []
    if (evaluatedCriteria[0].score < 60) {
      suggestions.push("建议明确说明产品面向企业级客户的定位")
    }
    if (evaluatedCriteria[1].score < 60) {
      suggestions.push("需要详细介绍防火墙的核心安全防护功能")
    }
    if (evaluatedCriteria[2].score < 60) {
      suggestions.push("应该具体说明产品的应用场景和部署环境")
    }
    if (content.length < 100) {
      suggestions.push("介绍内容过于简短，建议提供更详细的说明")
    }

    return {
      totalScore,
      missingPoints,
      suggestions,
      criteriaScores: evaluatedCriteria,
    }
  }

  const handleEvaluate = async () => {
    if (!userInput.trim()) return

    setIsEvaluating(true)

    // Simulate evaluation processing
    setTimeout(() => {
      const result = evaluateContent(userInput)
      setEvaluationResult(result)
      setIsEvaluating(false)
    }, 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600"
    if (score >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return "default"
    if (score >= 60) return "secondary"
    return "destructive"
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">讲解效果评估</h1>
            <Link href="/training">
              <Button variant="outline" size="sm">
                返回培训
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground">请输入您对"赛博坦-云盾防火墙"的产品介绍，系统将评估您的讲解效果</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Evaluation Criteria */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-primary">评估标准</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              {evaluationCriteria.map((criteria) => (
                <div key={criteria.id} className="p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold text-foreground mb-2">{criteria.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{criteria.description}</p>
                  <div className="text-xs text-primary">权重: {criteria.weight}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Input Area */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">请输入您的产品介绍</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Textarea
                placeholder="请详细介绍赛博坦-云盾防火墙的产品定位、安全功能和适用场景..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="min-h-[200px]"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">已输入 {userInput.length} 字符 (建议至少200字符)</span>
                <Button onClick={handleEvaluate} disabled={!userInput.trim() || isEvaluating} className="min-w-[120px]">
                  {isEvaluating ? "评估中..." : "开始评估"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Evaluation Progress */}
        {isEvaluating && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
                <p className="text-muted-foreground">正在分析您的讲解内容...</p>
                <Progress value={66} className="mt-4" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Evaluation Results */}
        {evaluationResult && (
          <div className="space-y-6">
            {/* Overall Score */}
            <Card className="border-2 border-primary">
              <CardHeader>
                <CardTitle className="text-xl text-center">评估结果</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <div className="mb-4">
                  <div className={`text-6xl font-bold ${getScoreColor(evaluationResult.totalScore)}`}>
                    {evaluationResult.totalScore}
                  </div>
                  <div className="text-lg text-muted-foreground">分 / 100分</div>
                </div>
                <Badge variant={getScoreBadgeVariant(evaluationResult.totalScore)} className="text-sm">
                  {evaluationResult.totalScore >= 80 ? "优秀" : evaluationResult.totalScore >= 60 ? "良好" : "需要改进"}
                </Badge>
              </CardContent>
            </Card>

            {/* Detailed Scores */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">详细评分</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {evaluationResult.criteriaScores.map((criteria) => (
                    <div key={criteria.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{criteria.name}</h3>
                        <Badge variant={getScoreBadgeVariant(criteria.score)}>{criteria.score}分</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{criteria.description}</p>
                      <p className="text-sm">{criteria.feedback}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Missing Points */}
            {evaluationResult.missingPoints.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-red-600">缺失要点</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {evaluationResult.missingPoints.map((point, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-red-500">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Improvement Suggestions */}
            {evaluationResult.suggestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600">改进建议</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {evaluationResult.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">💡</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => {
                  setUserInput("")
                  setEvaluationResult(null)
                }}
                variant="outline"
                className="flex-1"
              >
                重新评估
              </Button>
              <Button onClick={() => router.push("/training")} className="flex-1">
                返回培训主页
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {!evaluationResult && (
          <div className="flex justify-between items-center">
            <Link href="/training/product-1/roleplay">
              <Button variant="outline">← 返回角色扮演</Button>
            </Link>
            <div className="text-sm text-muted-foreground">讲解效果评估系统</div>
          </div>
        )}
      </main>
    </div>
  )
}
