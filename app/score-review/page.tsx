"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, AlertCircle, CheckCircle, Clock, MessageSquare } from "lucide-react"

export default function ScoreReviewPage() {
  const [selectedTab, setSelectedTab] = useState("appeals")
  const [appealReason, setAppealReason] = useState("")
  const [selectedScoreItem, setSelectedScoreItem] = useState("")

  // 模拟数据
  const appeals = [
    {
      id: 1,
      student: "张三",
      session: "产品介绍练习",
      originalScore: 75,
      appealReason: "我认为我的回答涵盖了所有关键点，评分偏低",
      status: "pending",
      submitTime: "2024-01-15 14:30",
      scoreItems: ["产品定位", "功能介绍"],
    },
    {
      id: 2,
      student: "李四",
      session: "异议处理练习",
      originalScore: 82,
      appealReason: "对话中我成功化解了客户疑虑，应该得到更高分数",
      status: "approved",
      submitTime: "2024-01-14 16:20",
      newScore: 88,
      reviewComment: "经复核，确实处理得当，分数调整为88分",
    },
    {
      id: 3,
      student: "王五",
      session: "报价谈判练习",
      originalScore: 68,
      appealReason: "AI可能没有理解我的策略性报价方法",
      status: "rejected",
      submitTime: "2024-01-13 10:15",
      reviewComment: "经复核，原评分合理，建议加强报价技巧练习",
    },
  ]

  const scoreItems = [
    "产品定位准确性",
    "功能介绍完整性",
    "客户需求理解",
    "异议处理技巧",
    "报价策略合理性",
    "沟通表达能力",
  ]

  const handleSubmitAppeal = () => {
    if (!selectedScoreItem || !appealReason.trim()) {
      alert("请选择评分项并填写申诉理由")
      return
    }

    // 模拟提交申诉
    alert("申诉已提交，我们会在24小时内处理")
    setSelectedScoreItem("")
    setAppealReason("")
  }

  const handleReview = (appealId: number, action: "approve" | "reject", newScore?: number, comment?: string) => {
    // 模拟处理申诉
    alert(`申诉已${action === "approve" ? "通过" : "驳回"}`)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回首页
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">🛠️ 陪练评分修正</h1>
            </div>
            <div className="flex space-x-2">
              <Button
                variant={selectedTab === "appeals" ? "default" : "outline"}
                onClick={() => setSelectedTab("appeals")}
              >
                申诉管理
              </Button>
              <Button
                variant={selectedTab === "submit" ? "default" : "outline"}
                onClick={() => setSelectedTab("submit")}
              >
                提交申诉
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {selectedTab === "appeals" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>申诉处理列表</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appeals.map((appeal) => (
                    <div key={appeal.id} className="border border-border rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {appeal.student} - {appeal.session}
                          </h3>
                          <p className="text-sm text-muted-foreground">提交时间：{appeal.submitTime}</p>
                        </div>
                        <Badge
                          variant={
                            appeal.status === "pending"
                              ? "secondary"
                              : appeal.status === "approved"
                                ? "default"
                                : "destructive"
                          }
                        >
                          {appeal.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                          {appeal.status === "approved" && <CheckCircle className="w-3 h-3 mr-1" />}
                          {appeal.status === "rejected" && <AlertCircle className="w-3 h-3 mr-1" />}
                          {appeal.status === "pending" ? "待处理" : appeal.status === "approved" ? "已通过" : "已驳回"}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground">原始分数</p>
                          <p className="text-2xl font-bold text-red-500">{appeal.originalScore}</p>
                        </div>
                        {appeal.newScore && (
                          <div>
                            <p className="text-sm text-muted-foreground">调整后分数</p>
                            <p className="text-2xl font-bold text-green-500">{appeal.newScore}</p>
                          </div>
                        )}
                      </div>

                      <div className="mb-4">
                        <p className="text-sm text-muted-foreground mb-2">申诉理由：</p>
                        <p className="text-sm bg-muted p-3 rounded">{appeal.appealReason}</p>
                      </div>

                      {appeal.reviewComment && (
                        <div className="mb-4">
                          <p className="text-sm text-muted-foreground mb-2">处理意见：</p>
                          <p className="text-sm bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                            {appeal.reviewComment}
                          </p>
                        </div>
                      )}

                      {appeal.status === "pending" && (
                        <div className="flex space-x-2">
                          <Button size="sm" onClick={() => handleReview(appeal.id, "approve", 85, "经复核，评分调整")}>
                            通过申诉
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleReview(appeal.id, "reject", undefined, "原评分合理")}
                          >
                            驳回申诉
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {selectedTab === "submit" && (
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>提交评分申诉</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">选择评分项</label>
                  <Select value={selectedScoreItem} onValueChange={setSelectedScoreItem}>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择需要申诉的评分项" />
                    </SelectTrigger>
                    <SelectContent>
                      {scoreItems.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">申诉理由</label>
                  <Textarea
                    placeholder="请详细说明您认为评分不合理的原因，包括具体的对话内容或表现..."
                    value={appealReason}
                    onChange={(e) => setAppealReason(e.target.value)}
                    rows={6}
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-start space-x-2">
                    <MessageSquare className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900">申诉说明</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        • 请提供具体的对话内容或表现细节
                        <br />• 说明您认为评分不合理的具体原因
                        <br />• 我们会在24小时内处理您的申诉
                        <br />• 处理结果将通过系统通知您
                      </p>
                    </div>
                  </div>
                </div>

                <Button onClick={handleSubmitAppeal} className="w-full">
                  提交申诉
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
