"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Trash2 } from "lucide-react"

export default function CreateScenarioPage() {
  const [questions, setQuestions] = useState([{ id: 1, question: "", expectedKeywords: "" }])

  const addQuestion = () => {
    const newId = Math.max(...questions.map((q) => q.id)) + 1
    setQuestions([...questions, { id: newId, question: "", expectedKeywords: "" }])
  }

  const removeQuestion = (id: number) => {
    if (questions.length > 1) {
      setQuestions(questions.filter((q) => q.id !== id))
    }
  }

  const updateQuestion = (id: number, field: string, value: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, [field]: value } : q)))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/knowledge">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回萃取中心
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-foreground">创建萃取场景</h1>
              <p className="text-sm text-muted-foreground">设计对话任务，提炼标准话术</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-4xl">
        <form className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>基本信息</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">场景名称</Label>
                <Input id="title" placeholder="例如：报价异议处理" className="mt-1" />
              </div>

              <div>
                <Label htmlFor="description">场景描述</Label>
                <Textarea id="description" placeholder="详细描述这个场景的目标和背景..." className="mt-1" rows={3} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">场景分类</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pricing">报价相关</SelectItem>
                      <SelectItem value="objection">异议处理</SelectItem>
                      <SelectItem value="technical">技术介绍</SelectItem>
                      <SelectItem value="competition">竞品对比</SelectItem>
                      <SelectItem value="closing">成交促进</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="difficulty">难度等级</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择难度" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">初级</SelectItem>
                      <SelectItem value="intermediate">中级</SelectItem>
                      <SelectItem value="advanced">高级</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Role Configuration */}
          <Card>
            <CardHeader>
              <CardTitle>AI 角色设定</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="aiRole">AI 扮演角色</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="选择 AI 角色" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="customer">潜在客户</SelectItem>
                    <SelectItem value="technical">技术决策者</SelectItem>
                    <SelectItem value="financial">财务负责人</SelectItem>
                    <SelectItem value="manager">部门经理</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="aiPersonality">角色性格特点</Label>
                <Textarea
                  id="aiPersonality"
                  placeholder="例如：谨慎型决策者，对价格敏感，注重性价比..."
                  className="mt-1"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="aiObjectives">角色目标</Label>
                <Textarea
                  id="aiObjectives"
                  placeholder="例如：了解产品功能，获取详细报价，对比竞品优势..."
                  className="mt-1"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>

          {/* Dialogue Questions */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>对话问题设计</CardTitle>
                <Button type="button" onClick={addQuestion} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  添加问题
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {questions.map((q, index) => (
                <div key={q.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="font-medium">问题 {index + 1}</Label>
                    {questions.length > 1 && (
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeQuestion(q.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div>
                    <Label htmlFor={`question-${q.id}`}>AI 提问内容</Label>
                    <Textarea
                      id={`question-${q.id}`}
                      placeholder="例如：你们这个防火墙和华为的有什么区别？"
                      value={q.question}
                      onChange={(e) => updateQuestion(q.id, "question", e.target.value)}
                      className="mt-1"
                      rows={2}
                    />
                  </div>

                  <div>
                    <Label htmlFor={`keywords-${q.id}`}>期望关键词</Label>
                    <Input
                      id={`keywords-${q.id}`}
                      placeholder="例如：企业级,安全隔离,性能优势"
                      value={q.expectedKeywords}
                      onChange={(e) => updateQuestion(q.id, "expectedKeywords", e.target.value)}
                      className="mt-1"
                    />
                    <p className="text-xs text-muted-foreground mt-1">用逗号分隔多个关键词，用于评估回答质量</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Extraction Settings */}
          <Card>
            <CardHeader>
              <CardTitle>萃取设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="extractionCriteria">萃取标准</Label>
                <Textarea
                  id="extractionCriteria"
                  placeholder="定义什么样的回答会被提取为标准话术..."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="minScore">最低得分要求</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="选择最低分数" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="60">60分</SelectItem>
                      <SelectItem value="70">70分</SelectItem>
                      <SelectItem value="80">80分</SelectItem>
                      <SelectItem value="90">90分</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="maxParticipants">参与人数上限</Label>
                  <Input id="maxParticipants" type="number" placeholder="例如：50" className="mt-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4 justify-end">
            <Link href="/knowledge">
              <Button variant="outline">取消</Button>
            </Link>
            <Button type="button" variant="outline">
              保存草稿
            </Button>
            <Button type="submit">创建场景</Button>
          </div>
        </form>
      </main>
    </div>
  )
}
