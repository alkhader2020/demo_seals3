"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Users, Trophy, TrendingUp, Download, BarChart3, Target, Award } from "lucide-react"

export default function TeamAnalysisPage() {
  const [selectedTask, setSelectedTask] = useState("all")
  const [selectedDimension, setSelectedDimension] = useState("overall")
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // 模拟团队数据
  const teamData = {
    overview: {
      totalMembers: 15,
      averageScore: 82,
      completionRate: 87,
      topPerformer: "张三",
    },
    rankings: [
      {
        rank: 1,
        name: "张三",
        department: "销售一部",
        overallScore: 92,
        completionRate: 100,
        improvement: 18,
        skills: {
          product: 95,
          communication: 90,
          objection: 88,
          closing: 94,
        },
      },
      {
        rank: 2,
        name: "李四",
        department: "销售二部",
        overallScore: 89,
        completionRate: 95,
        improvement: 15,
        skills: {
          product: 90,
          communication: 92,
          objection: 85,
          closing: 89,
        },
      },
      {
        rank: 3,
        name: "王五",
        department: "销售一部",
        overallScore: 86,
        completionRate: 90,
        improvement: 12,
        skills: {
          product: 88,
          communication: 85,
          objection: 90,
          closing: 81,
        },
      },
      {
        rank: 4,
        name: "赵六",
        department: "销售三部",
        overallScore: 83,
        completionRate: 85,
        improvement: 10,
        skills: {
          product: 85,
          communication: 80,
          objection: 82,
          closing: 85,
        },
      },
      {
        rank: 5,
        name: "陈七",
        department: "销售二部",
        overallScore: 79,
        completionRate: 80,
        improvement: 8,
        skills: {
          product: 82,
          communication: 78,
          objection: 75,
          closing: 81,
        },
      },
    ],
    departmentStats: [
      {
        department: "销售一部",
        members: 6,
        averageScore: 85,
        completionRate: 92,
        topSkill: "产品知识",
      },
      {
        department: "销售二部",
        members: 5,
        averageScore: 83,
        completionRate: 88,
        topSkill: "沟通技巧",
      },
      {
        department: "销售三部",
        members: 4,
        averageScore: 80,
        completionRate: 85,
        topSkill: "异议处理",
      },
    ],
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-600 bg-yellow-50"
      case 2:
        return "text-gray-600 bg-gray-50"
      case 3:
        return "text-orange-600 bg-orange-50"
      default:
        return "text-blue-600 bg-blue-50"
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600"
    if (score >= 80) return "text-blue-600"
    if (score >= 70) return "text-yellow-600"
    return "text-red-600"
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇"
      case 2:
        return "🥈"
      case 3:
        return "🥉"
      default:
        return `#${rank}`
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
            <h1 className="text-2xl font-bold text-foreground">👥 团队分析</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="text-sm font-medium mb-2 block">任务筛选</label>
            <Select value={selectedTask} onValueChange={setSelectedTask}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全部任务</SelectItem>
                <SelectItem value="product">产品介绍</SelectItem>
                <SelectItem value="objection">异议处理</SelectItem>
                <SelectItem value="pricing">报价谈判</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">排名维度</label>
            <Select value={selectedDimension} onValueChange={setSelectedDimension}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overall">综合得分</SelectItem>
                <SelectItem value="product">产品知识</SelectItem>
                <SelectItem value="communication">沟通技巧</SelectItem>
                <SelectItem value="objection">异议处理</SelectItem>
                <SelectItem value="closing">成交技能</SelectItem>
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
          <div className="flex items-end">
            <Button variant="outline" className="w-full bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              导出报告
            </Button>
          </div>
        </div>

        {/* Team Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <div className="text-2xl font-bold">{teamData.overview.totalMembers}</div>
                  <p className="text-sm text-muted-foreground">团队成员</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <BarChart3 className="w-8 h-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{teamData.overview.averageScore}</div>
                  <p className="text-sm text-muted-foreground">平均得分</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Target className="w-8 h-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{teamData.overview.completionRate}%</div>
                  <p className="text-sm text-muted-foreground">完成率</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-600" />
                <div>
                  <div className="text-lg font-bold text-yellow-600">{teamData.overview.topPerformer}</div>
                  <p className="text-sm text-muted-foreground">最佳表现</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Team Rankings */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  团队排名
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamData.rankings.map((member) => (
                    <div key={member.rank} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${getRankColor(member.rank)}`}
                          >
                            {getRankIcon(member.rank)}
                          </div>
                          <div>
                            <h4 className="font-semibold">{member.name}</h4>
                            <p className="text-sm text-muted-foreground">{member.department}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-lg font-bold ${getScoreColor(member.overallScore)}`}>
                            {member.overallScore}
                          </div>
                          <p className="text-xs text-muted-foreground">综合得分</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="text-center">
                          <div className="font-medium text-green-600">{member.completionRate}%</div>
                          <div className="text-muted-foreground">完成率</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-blue-600">+{member.improvement}%</div>
                          <div className="text-muted-foreground">提升幅度</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{member.skills.product}</div>
                          <div className="text-muted-foreground">产品知识</div>
                        </div>
                        <div className="text-center">
                          <div className="font-medium">{member.skills.communication}</div>
                          <div className="text-muted-foreground">沟通技巧</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Department Stats */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  部门统计
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamData.departmentStats.map((dept, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h4 className="font-semibold mb-3">{dept.department}</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">成员数量</span>
                          <span className="font-medium">{dept.members}人</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">平均得分</span>
                          <span className={`font-medium ${getScoreColor(dept.averageScore)}`}>{dept.averageScore}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">完成率</span>
                          <span className="font-medium text-green-600">{dept.completionRate}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">优势技能</span>
                          <Badge variant="secondary" className="text-xs">
                            {dept.topSkill}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Comprehensive Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              综合分析报告
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">团队优势</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    产品知识掌握度较高，平均分达到88分
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    整体学习积极性强，完成率超过85%
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600">✓</span>
                    销售一部表现突出，可作为标杆部门
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">改进建议</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-600">!</span>
                    加强成交技能训练，该项平均分偏低
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-600">!</span>
                    销售三部需要重点关注和辅导
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-yellow-600">!</span>
                    建议增加异议处理的实战练习
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
