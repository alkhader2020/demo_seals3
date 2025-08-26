"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, User, TrendingUp, Download, Play, BarChart3, Calendar, Clock } from "lucide-react"

export default function StudentAnalysisPage() {
  const [selectedStudent, setSelectedStudent] = useState("zhang")
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // 模拟学员数据
  const students = [
    { id: "zhang", name: "张三", department: "销售一部" },
    { id: "wang", name: "王五", department: "销售二部" },
    { id: "zhao", name: "赵六", department: "销售一部" },
  ]

  const studentData = {
    zhang: {
      name: "张三",
      department: "销售一部",
      totalSessions: 24,
      averageScore: 85,
      improvementRate: 15,
      lastActive: "2024-01-10",
      trainingHistory: [
        {
          id: 1,
          date: "2024-01-10",
          task: "产品介绍训练",
          type: "对话练习",
          score: 88,
          duration: "25分钟",
          keyPoints: ["产品定位准确", "功能介绍清晰", "需加强价值阐述"],
        },
        {
          id: 2,
          date: "2024-01-08",
          task: "异议处理练习",
          type: "角色扮演",
          score: 82,
          duration: "30分钟",
          keyPoints: ["应对策略得当", "语言表达流畅", "需提升说服力"],
        },
        {
          id: 3,
          date: "2024-01-05",
          task: "报价谈判模拟",
          type: "情景模拟",
          score: 79,
          duration: "35分钟",
          keyPoints: ["谈判思路清晰", "价格策略合理", "需增强成交技巧"],
        },
      ],
      scoreHistory: [
        { date: "12-01", score: 72 },
        { date: "12-08", score: 75 },
        { date: "12-15", score: 78 },
        { date: "12-22", score: 81 },
        { date: "12-29", score: 83 },
        { date: "01-05", score: 85 },
        { date: "01-10", score: 88 },
      ],
      skillAnalysis: [
        { skill: "产品知识", score: 90, trend: "up" },
        { skill: "沟通技巧", score: 85, trend: "up" },
        { skill: "异议处理", score: 80, trend: "stable" },
        { skill: "成交技能", score: 75, trend: "up" },
      ],
    },
  }

  const currentStudent = studentData[selectedStudent as keyof typeof studentData] || studentData.zhang

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return "📈"
      case "down":
        return "📉"
      default:
        return "➡️"
    }
  }

  return (
    <div className="min-h-screen bg-background pb-safe">
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
            <h1 className="text-2xl font-bold text-foreground">👤 学员分析</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">选择学员</label>
            <Select value={selectedStudent} onValueChange={setSelectedStudent}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {students.map((student) => (
                  <SelectItem key={student.id} value={student.id}>
                    {student.name} - {student.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">分析周期</label>
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">最近一周</SelectItem>
                <SelectItem value="month">最近一月</SelectItem>
                <SelectItem value="quarter">最近三月</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end gap-2">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              导出PDF
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              导出Excel
            </Button>
          </div>
        </div>

        {/* Student Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <User className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">{currentStudent.name}</h3>
                  <p className="text-sm text-muted-foreground">{currentStudent.department}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{currentStudent.totalSessions}</div>
                <p className="text-sm text-muted-foreground">训练次数</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(currentStudent.averageScore)}`}>
                  {currentStudent.averageScore}
                </div>
                <p className="text-sm text-muted-foreground">平均得分</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">+{currentStudent.improvementRate}%</div>
                <p className="text-sm text-muted-foreground">提升幅度</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Score Trend Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                得分变化趋势
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentStudent.scoreHistory.map((point, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{point.date}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: `${point.score}%` }}></div>
                      </div>
                      <span className={`text-sm font-medium ${getScoreColor(point.score)}`}>{point.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Skill Analysis */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                技能分析
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentStudent.skillAnalysis.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{skill.skill}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${getScoreColor(skill.score)}`}>{skill.score}</span>
                        <span>{getTrendIcon(skill.trend)}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.score}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              训练历史记录
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentStudent.trainingHistory.map((session) => (
                <div key={session.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{session.task}</h4>
                        <Badge variant="outline">{session.type}</Badge>
                        <Badge className={getScoreColor(session.score)}>{session.score}分</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {session.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {session.duration}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Play className="w-4 h-4 mr-1" />
                      回放
                    </Button>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-sm font-medium mb-2">关键点评价：</p>
                    <div className="flex flex-wrap gap-2">
                      {session.keyPoints.map((point, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {point}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
