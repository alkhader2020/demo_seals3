
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, User, TrendingUp, Download, Play, BarChart3, Calendar, Clock, FileText, MessageSquare, Users } from "lucide-react"

export default function StudentAnalysisPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedMode, setSelectedMode] = useState("all")

  // 模拟训练模式
  const trainingModes = [
    { id: "all", name: "全部模式" },
    { id: "choice", name: "选择题模式", icon: FileText },
    { id: "qa", name: "开放问答模式", icon: MessageSquare },
    { id: "dialogue", name: "自由对话练习", icon: MessageSquare },
    { id: "roleplay", name: "销售角色实训", icon: Users },
  ]

  const studentData = {
    zhang: {
      name: "张三",
      department: "销售一部",
      totalSessions: 24,
      averageScore: 85,
      improvementRate: 15,
      lastActive: "2024-01-10",

      // 选择题模式数据
      choiceMode: {
        totalSessions: 5,
        averageScore: 88,
        scoreHistory: [
          { date: "12-05", score: 82 },
          { date: "12-12", score: 84 },
          { date: "12-19", score: 86 },
          { date: "12-26", score: 87 },
          { date: "01-02", score: 90 },
        ],
        skillAnalysis: [
          { skill: "产品知识", score: 95, trend: "up" },
          { skill: "销售流程", score: 85, trend: "up" },
          { skill: "客户分析", score: 82, trend: "stable" },
        ],
        trainingHistory: [
          {
            id: 1,
            date: "2024-01-03",
            task: "产品知识测试",
            type: "选择题",
            mode: "choice",
            score: 92,
            duration: "15分钟",
            keyPoints: ["产品知识掌握全面", "细节记忆准确", "需加强应用理解"],
          },
          {
            id: 2,
            date: "2023-12-26",
            task: "销售流程选择题",
            type: "选择题",
            mode: "choice",
            score: 87,
            duration: "18分钟",
            keyPoints: ["流程理解清晰", "步骤掌握完整", "需加强特殊情况处理"],
          },
        ],
      },

      // 开放问答模式数据
      qaMode: {
        totalSessions: 8,
        averageScore: 82,
        scoreHistory: [
          { date: "12-01", score: 78 },
          { date: "12-08", score: 79 },
          { date: "12-15", score: 80 },
          { date: "12-22", score: 83 },
          { date: "12-29", score: 85 },
        ],
        skillAnalysis: [
          { skill: "问题分析", score: 85, trend: "up" },
          { skill: "回答逻辑", score: 80, trend: "stable" },
          { skill: "知识应用", score: 78, trend: "up" },
        ],
        trainingHistory: [
          {
            id: 1,
            date: "2024-01-08",
            task: "异议处理练习",
            type: "角色扮演",
            mode: "qa",
            score: 82,
            duration: "30分钟",
            keyPoints: ["应对策略得当", "语言表达流畅", "需提升说服力"],
          },
          {
            id: 2,
            date: "2023-12-29",
            task: "客户需求分析",
            type: "问答",
            mode: "qa",
            score: 85,
            duration: "25分钟",
            keyPoints: ["需求分析准确", "回答全面", "需加强深度思考"],
          },
        ],
      },

      // 自由对话练习数据
      dialogueMode: {
        totalSessions: 7,
        averageScore: 84,
        scoreHistory: [
          { date: "12-03", score: 80 },
          { date: "12-10", score: 81 },
          { date: "12-17", score: 83 },
          { date: "12-24", score: 85 },
          { date: "12-31", score: 87 },
        ],
        skillAnalysis: [
          { skill: "沟通表达", score: 88, trend: "up" },
          { skill: "倾听能力", score: 82, trend: "stable" },
          { skill: "应变能力", score: 80, trend: "up" },
        ],
        trainingHistory: [
          {
            id: 1,
            date: "2024-01-05",
            task: "报价谈判模拟",
            type: "情景模拟",
            mode: "dialogue",
            score: 79,
            duration: "35分钟",
            keyPoints: ["谈判思路清晰", "价格策略合理", "需增强成交技巧"],
          },
          {
            id: 2,
            date: "2023-12-31",
            task: "客户拜访对话",
            type: "对话练习",
            mode: "dialogue",
            score: 87,
            duration: "28分钟",
            keyPoints: ["开场白自然", "话题引导得当", "需加强产品介绍"],
          },
        ],
      },

      // 销售角色实训数据
      roleplayMode: {
        totalSessions: 4,
        averageScore: 86,
        scoreHistory: [
          { date: "12-07", score: 82 },
          { date: "12-14", score: 84 },
          { date: "12-21", score: 86 },
          { date: "12-28", score: 88 },
        ],
        skillAnalysis: [
          { skill: "角色扮演", score: 90, trend: "up" },
          { skill: "销售技巧", score: 85, trend: "up" },
          { skill: "情绪控制", score: 82, trend: "stable" },
        ],
        trainingHistory: [
          {
            id: 1,
            date: "2024-01-10",
            task: "产品介绍训练",
            type: "对话练习",
            mode: "roleplay",
            score: 88,
            duration: "25分钟",
            keyPoints: ["产品定位准确", "功能介绍清晰", "需加强价值阐述"],
          },
          {
            id: 2,
            date: "2023-12-28",
            task: "客户角色扮演",
            type: "角色扮演",
            mode: "roleplay",
            score: 86,
            duration: "30分钟",
            keyPoints: ["角色理解深入", "表达自然", "需加强应变能力"],
          },
        ],
      },

      // 综合数据（用于展示全部模式时）
      trainingHistory: [
        {
          id: 1,
          date: "2024-01-10",
          task: "产品介绍训练",
          type: "对话练习",
          mode: "roleplay",
          score: 88,
          duration: "25分钟",
          keyPoints: ["产品定位准确", "功能介绍清晰", "需加强价值阐述"],
        },
        {
          id: 2,
          date: "2024-01-08",
          task: "异议处理练习",
          type: "角色扮演",
          mode: "qa",
          score: 82,
          duration: "30分钟",
          keyPoints: ["应对策略得当", "语言表达流畅", "需提升说服力"],
        },
        {
          id: 3,
          date: "2024-01-05",
          task: "报价谈判模拟",
          type: "情景模拟",
          mode: "dialogue",
          score: 79,
          duration: "35分钟",
          keyPoints: ["谈判思路清晰", "价格策略合理", "需增强成交技巧"],
        },
        {
          id: 4,
          date: "2024-01-03",
          task: "产品知识测试",
          type: "选择题",
          mode: "choice",
          score: 92,
          duration: "15分钟",
          keyPoints: ["产品知识掌握全面", "细节记忆准确", "需加强应用理解"],
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
      modeAnalysis: [
        { mode: "选择题模式", count: 5, avgScore: 88 },
        { mode: "开放问答模式", count: 8, avgScore: 82 },
        { mode: "自由对话练习", count: 7, avgScore: 84 },
        { mode: "销售角色实训", count: 4, avgScore: 86 },
      ],
    },
  }

  const currentStudent = studentData.zhang

  // 根据选择的模式获取对应的数据
  const getModeData = () => {
    switch(selectedMode) {
      case "choice":
        return currentStudent.choiceMode;
      case "qa":
        return currentStudent.qaMode;
      case "dialogue":
        return currentStudent.dialogueMode;
      case "roleplay":
        return currentStudent.roleplayMode;
      default:
        return currentStudent; // "all" 模式返回综合数据
    }
  }

  const modeData = getModeData()

  // 根据选择的模式获取训练记录
  const getTrainingHistory = () => {
    if (selectedMode === "all") {
      return currentStudent.trainingHistory
    }
    return modeData.trainingHistory || []
  }

  const filteredTrainingHistory = getTrainingHistory()

  // 根据选择的模式获取得分历史
  const getScoreHistory = () => {
    if (selectedMode === "all") {
      return currentStudent.scoreHistory
    }
    return modeData.scoreHistory || []
  }

  // 根据选择的模式获取技能分析
  const getSkillAnalysis = () => {
    if (selectedMode === "all") {
      return currentStudent.skillAnalysis
    }
    return modeData.skillAnalysis || []
  }

  // 根据选择的模式获取概览数据
  const getOverviewData = () => {
    if (selectedMode === "all") {
      return {
        totalSessions: currentStudent.totalSessions,
        averageScore: currentStudent.averageScore,
        improvementRate: currentStudent.improvementRate
      }
    }
    return {
      totalSessions: modeData.totalSessions || 0,
      averageScore: modeData.averageScore || 0,
      improvementRate: currentStudent.improvementRate // 保持总体提升率不变
    }
  }

  const overviewData = getOverviewData()

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

  const getModeIcon = (mode: string) => {
    const modeObj = trainingModes.find(m => m.id === mode)
    if (modeObj && modeObj.icon) {
      const Icon = modeObj.icon
      return <Icon className="w-4 h-4" />
    }
    return null
  }

  const getModeName = (mode: string) => {
    const modeObj = trainingModes.find(m => m.id === mode)
    return modeObj ? modeObj.name : mode
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-2 block">训练模式</label>
            <Select value={selectedMode} onValueChange={setSelectedMode}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {trainingModes.map((mode) => (
                  <SelectItem key={mode.id} value={mode.id}>
                    {mode.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
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
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            导出Excel
          </Button>
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
                <div className="text-2xl font-bold text-primary">{overviewData.totalSessions}</div>
                <p className="text-sm text-muted-foreground">训练次数</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${getScoreColor(overviewData.averageScore)}`}>
                  {overviewData.averageScore}
                </div>
                <p className="text-sm text-muted-foreground">平均得分</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">+{overviewData.improvementRate}%</div>
                <p className="text-sm text-muted-foreground">提升幅度</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trends" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="trends">趋势分析</TabsTrigger>
            <TabsTrigger value="skills">技能分析</TabsTrigger>
            <TabsTrigger value="modes">模式分析</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  得分变化趋势
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getScoreHistory().map((point, index) => (
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
          </TabsContent>

          <TabsContent value="skills" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  技能分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {getSkillAnalysis().map((skill, index) => (
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
          </TabsContent>

          <TabsContent value="modes" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  训练模式分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {currentStudent.modeAnalysis.map((mode, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{mode.mode}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">训练次数: {mode.count}</span>
                          <span className={`text-sm ${getScoreColor(mode.avgScore)}`}>{mode.avgScore}分</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${mode.avgScore}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
              {filteredTrainingHistory.map((session) => (
                <div key={session.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold">{session.task}</h4>
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getModeIcon(session.mode)}
                          {getModeName(session.mode)}
                        </Badge>
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
