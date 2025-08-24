"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, FileText, Download, Eye } from "lucide-react"

export default function KnowledgeExtractionPage() {
  const [activeTab, setActiveTab] = useState<"dedicated" | "automatic">("dedicated")

  // 模拟数据 - 实际应从后端获取
  const dedicatedScenarios = [
    {
      id: 1,
      title: "报价异议处理",
      description: "客户对价格提出异议时的标准应对话术",
      status: "已完成",
      participantCount: 15,
      extractedCount: 8,
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      title: "技术方案介绍",
      description: "向技术决策者介绍产品技术优势",
      status: "进行中",
      participantCount: 12,
      extractedCount: 5,
      lastUpdated: "2024-01-14",
    },
    {
      id: 3,
      title: "竞品对比说明",
      description: "与竞争对手产品进行对比的话术模板",
      status: "待开始",
      participantCount: 0,
      extractedCount: 0,
      lastUpdated: "-",
    },
  ]

  const automaticExtractions = [
    {
      id: 1,
      source: "产品介绍训练",
      type: "问答陪练",
      participantCount: 25,
      bestPractices: 12,
      avgScore: 85,
      lastExtracted: "2024-01-15",
    },
    {
      id: 2,
      source: "自由对话练习",
      type: "角色扮演",
      participantCount: 18,
      bestPractices: 8,
      avgScore: 78,
      lastExtracted: "2024-01-14",
    },
    {
      id: 3,
      source: "技术参数训练",
      type: "问答陪练",
      participantCount: 22,
      bestPractices: 15,
      avgScore: 92,
      lastExtracted: "2024-01-13",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "已完成":
        return "bg-green-100 text-green-800"
      case "进行中":
        return "bg-yellow-100 text-yellow-800"
      case "待开始":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回首页
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">📚 业务经验萃取</h1>
              <p className="text-sm text-muted-foreground">提炼标准话术，沉淀最佳实践</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "dedicated" ? "default" : "outline"}
            onClick={() => setActiveTab("dedicated")}
            className="flex-1"
          >
            专门萃取
          </Button>
          <Button
            variant={activeTab === "automatic" ? "default" : "outline"}
            onClick={() => setActiveTab("automatic")}
            className="flex-1"
          >
            附带萃取
          </Button>
        </div>

        {/* Dedicated Extraction */}
        {activeTab === "dedicated" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">专门萃取场景</h2>
              <Link href="/knowledge/create-scenario">
                <Button>创建新场景</Button>
              </Link>
            </div>

            <div className="grid gap-4">
              {dedicatedScenarios.map((scenario) => (
                <Card key={scenario.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{scenario.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{scenario.description}</p>
                      </div>
                      <Badge className={getStatusColor(scenario.status)}>{scenario.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{scenario.participantCount}</div>
                        <div className="text-xs text-muted-foreground">参与人数</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">{scenario.extractedCount}</div>
                        <div className="text-xs text-muted-foreground">已萃取话术</div>
                      </div>
                      <div className="text-center">
                        <div className="text-sm font-medium">{scenario.lastUpdated}</div>
                        <div className="text-xs text-muted-foreground">最后更新</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="w-4 h-4 mr-1" />
                          查看
                        </Button>
                        {scenario.status === "已完成" && (
                          <Button size="sm" variant="outline">
                            <Download className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Automatic Extraction */}
        {activeTab === "automatic" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">自动萃取结果</h2>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                导出全部
              </Button>
            </div>

            <div className="grid gap-4">
              {automaticExtractions.map((extraction) => (
                <Card key={extraction.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{extraction.source}</CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {extraction.type}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">最后萃取</div>
                        <div className="text-sm font-medium">{extraction.lastExtracted}</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{extraction.participantCount}</div>
                        <div className="text-xs text-muted-foreground">参与人数</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-emerald-600">{extraction.bestPractices}</div>
                        <div className="text-xs text-muted-foreground">最佳实践</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{extraction.avgScore}%</div>
                        <div className="text-xs text-muted-foreground">平均得分</div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <Eye className="w-4 h-4 mr-1" />
                          查看
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Knowledge Base Summary */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              知识库统计
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">156</div>
                <div className="text-sm text-muted-foreground">标准话术</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 mb-1">89</div>
                <div className="text-sm text-muted-foreground">最佳实践</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">23</div>
                <div className="text-sm text-muted-foreground">场景模板</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">12</div>
                <div className="text-sm text-muted-foreground">文档输出</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
