"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"

export default function ManagerDashboard() {
  const [selectedProject, setSelectedProject] = useState("product-1")

  // 模拟数据
  const projects = [
    { id: "product-1", name: "赛博坦-云盾防火墙", participants: 24, avgScore: 85 },
    { id: "product-2", name: "企业安全解决方案", participants: 18, avgScore: 78 },
    { id: "product-3", name: "网络监控系统", participants: 15, avgScore: 82 },
  ]

  const teamMembers = [
    { id: 1, name: "张三", department: "销售一部", score: 92, progress: 85, status: "优秀" },
    { id: 2, name: "李四", department: "销售一部", score: 78, progress: 70, status: "良好" },
    { id: 3, name: "王五", department: "销售二部", score: 88, progress: 90, status: "优秀" },
    { id: 4, name: "赵六", department: "销售二部", score: 65, progress: 45, status: "待提升" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">📊 可视化仪表盘</h1>
              <p className="text-muted-foreground mt-1"></p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">导出报告</Button>
              <Link href="/">
                <Button variant="outline">返回首页</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">总览</TabsTrigger>
            <TabsTrigger value="projects">项目维度</TabsTrigger>
            <TabsTrigger value="team">团队维度</TabsTrigger>
            <TabsTrigger value="individual">个人维度</TabsTrigger>
          </TabsList>

          {/* 总览 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">团队总人数</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 本月新增</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">平均得分</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">81.5</div>
                  <p className="text-xs text-muted-foreground">+3.2 较上月</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">完成率</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">87%</div>
                  <p className="text-xs text-muted-foreground">+5% 较上月</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">优秀率</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">42%</div>
                  <p className="text-xs text-muted-foreground">+8% 较上月</p>
                </CardContent>
              </Card>
            </div>

            {/* 图表区域 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>成绩分布</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">优秀 (90-100)</span>
                      <span className="text-sm font-medium">10人</span>
                    </div>
                    <Progress value={42} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">良好 (80-89)</span>
                      <span className="text-sm font-medium">8人</span>
                    </div>
                    <Progress value={33} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">合格 (70-79)</span>
                      <span className="text-sm font-medium">4人</span>
                    </div>
                    <Progress value={17} className="h-2" />

                    <div className="flex items-center justify-between">
                      <span className="text-sm">待提升 (&lt;70)</span>
                      <span className="text-sm font-medium">2人</span>
                    </div>
                    <Progress value={8} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>部门对比</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">销售一部</span>
                      <div className="flex items-center gap-2">
                        <Progress value={85} className="w-20 h-2" />
                        <span className="text-sm font-medium">85分</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">销售二部</span>
                      <div className="flex items-center gap-2">
                        <Progress value={78} className="w-20 h-2" />
                        <span className="text-sm font-medium">78分</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm">销售三部</span>
                      <div className="flex items-center gap-2">
                        <Progress value={82} className="w-20 h-2" />
                        <span className="text-sm font-medium">82分</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* 项目维度 */}
          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className={`cursor-pointer transition-all ${selectedProject === project.id ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setSelectedProject(project.id)}
                >
                  <CardHeader>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">参与人数</span>
                        <span className="font-medium">{project.participants}人</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">平均得分</span>
                        <span className="font-medium">{project.avgScore}分</span>
                      </div>
                      <Progress value={project.avgScore} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 选中项目的详细信息 */}
            <Card>
              <CardHeader>
                <CardTitle>项目详细分析 - {projects.find((p) => p.id === selectedProject)?.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">模块完成情况</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">产品介绍</span>
                        <Badge variant="secondary">95%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">技术参数</span>
                        <Badge variant="secondary">88%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">部署方式</span>
                        <Badge variant="secondary">82%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">竞品对比</span>
                        <Badge variant="secondary">76%</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">报价信息</span>
                        <Badge variant="secondary">71%</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3">常见问题</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p>• 技术参数记忆不准确 (35%)</p>
                      <p>• 竞品对比缺乏亮点 (28%)</p>
                      <p>• 报价策略不够灵活 (22%)</p>
                      <p>• 部署方案解释不清 (18%)</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 团队维度 */}
          <TabsContent value="team" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>团队成员表现</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teamMembers.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-4 border border-border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{member.name[0]}</span>
                        </div>
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">{member.department}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">得分</div>
                          <div className="font-medium">{member.score}</div>
                        </div>

                        <div className="text-center">
                          <div className="text-sm text-muted-foreground">进度</div>
                          <div className="font-medium">{member.progress}%</div>
                        </div>

                        <Badge
                          variant={
                            member.status === "优秀"
                              ? "default"
                              : member.status === "良好"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {member.status}
                        </Badge>

                        <Button variant="outline" size="sm">
                          查看详情
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 个人维度 */}
          <TabsContent value="individual" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>个人陪练记录查询</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="text-sm font-medium">选择员工</label>
                    <select className="w-full mt-1 p-2 border border-border rounded-md">
                      <option>张三</option>
                      <option>李四</option>
                      <option>王五</option>
                      <option>赵六</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">选择项目</label>
                    <select className="w-full mt-1 p-2 border border-border rounded-md">
                      <option>赛博坦-云盾防火墙</option>
                      <option>企业安全解决方案</option>
                      <option>网络监控系统</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium">时间范围</label>
                    <select className="w-full mt-1 p-2 border border-border rounded-md">
                      <option>最近7天</option>
                      <option>最近30天</option>
                      <option>最近90天</option>
                    </select>
                  </div>
                </div>

                {/* 个人记录展示 */}
                <div className="space-y-4">
                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">第3轮 - 产品介绍练习</div>
                      <Badge>得分: 88</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">2024-01-15 14:30</div>
                    <div className="text-sm">
                      <p>
                        <strong>AI角色:</strong> 企业IT经理
                      </p>
                      <p>
                        <strong>练习目标:</strong> 完整介绍云盾防火墙核心功能
                      </p>
                      <p>
                        <strong>关键改进点:</strong> 技术参数表达更准确，增加客户价值说明
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        查看对话记录
                      </Button>
                      <Button variant="outline" size="sm">
                        重新练习
                      </Button>
                    </div>
                  </div>

                  <div className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="font-medium">第2轮 - 异议处理练习</div>
                      <Badge variant="secondary">得分: 76</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">2024-01-12 10:15</div>
                    <div className="text-sm">
                      <p>
                        <strong>AI角色:</strong> 财务总监
                      </p>
                      <p>
                        <strong>练习目标:</strong> 处理价格异议，展示ROI价值
                      </p>
                      <p>
                        <strong>关键改进点:</strong> 需要更多量化数据支撑，提升说服力
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm">
                        查看对话记录
                      </Button>
                      <Button variant="outline" size="sm">
                        重新练习
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
