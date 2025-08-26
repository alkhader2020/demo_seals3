"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface DialogueScenario {
  id: string
  title: string
  role: string
  roleDescription: string
  objective: string
  difficulty: "初级" | "中级" | "高级"
  estimatedTime: string
}

export default function DialoguePracticePage() {
  const [selectedScenario, setSelectedScenario] = useState<DialogueScenario | null>(null)
  const [isInDialogue, setIsInDialogue] = useState(false)
  const [messages, setMessages] = useState<Array<{ role: "ai" | "user"; content: string; timestamp: Date }>>([])
  const [userInput, setUserInput] = useState("")
  const [currentObjective, setCurrentObjective] = useState("")
  const [objectiveProgress, setObjectiveProgress] = useState(0)
  const [showFeedback, setShowFeedback] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [showHints, setShowHints] = useState(true)
  const [currentHints, setCurrentHints] = useState({
    scriptExample: "",
    structure: "",
    keywords: [] as string[],
  })

  // 对话场景配置
  const scenarios: DialogueScenario[] = [
    {
      id: "client-intro",
      title: "客户产品介绍",
      role: "企业IT经理",
      roleDescription: "李经理，40岁，负责公司网络安全采购决策",
      objective: "完整介绍云盾防火墙的核心功能和优势",
      difficulty: "初级",
      estimatedTime: "5-8分钟",
    },
    {
      id: "budget-inquiry",
      title: "预算获取对话",
      role: "财务总监",
      roleDescription: "王总监，45岁，关注成本效益和投资回报",
      objective: "了解客户预算范围并推荐合适方案",
      difficulty: "中级",
      estimatedTime: "8-12分钟",
    },
    {
      id: "technical-discussion",
      title: "技术深度交流",
      role: "技术架构师",
      roleDescription: "张架构师，35岁，关注技术细节和兼容性",
      objective: "解答技术疑问并建立技术信任",
      difficulty: "高级",
      estimatedTime: "10-15分钟",
    },
    {
      id: "boss-report",
      title: "向上级汇报",
      role: "销售总监",
      roleDescription: "陈总监，50岁，关注销售进展和客户反馈",
      objective: "汇报客户沟通进展和下一步计划",
      difficulty: "中级",
      estimatedTime: "6-10分钟",
    },
  ]

  const getHintsForScenario = (scenarioId: string, messageCount: number) => {
    const hints = {
      "client-intro": {
        scriptExample:
          messageCount === 1
            ? "您好李经理，赛博坦云盾防火墙是专为企业级用户设计的新一代网络安全解决方案..."
            : "我们的产品在威胁检测方面采用了AI智能分析技术，能够实时监控网络流量...",
        structure:
          messageCount === 1
            ? "开场问候 → 产品定位 → 核心功能介绍 → 客户价值"
            : "功能详述 → 技术优势 → 应用场景 → 询问需求",
        keywords:
          messageCount === 1
            ? ["企业级", "网络安全", "云端部署", "智能防护"]
            : ["威胁检测", "流量监控", "安全隔离", "实时防护"],
      },
      "budget-inquiry": {
        scriptExample: "根据您的企业规模，我们有不同的方案配置。基础版适合中小企业，企业版更适合大型组织...",
        structure: "了解规模 → 方案介绍 → 价格区间 → 投资回报分析",
        keywords: ["性价比", "投资回报", "分期付款", "维护成本"],
      },
      "technical-discussion": {
        scriptExample: "在架构兼容性方面，我们支持主流的网络设备和管理平台，提供标准的API接口...",
        structure: "技术规格 → 兼容性说明 → 性能指标 → 部署方案",
        keywords: ["架构兼容", "API接口", "性能指标", "技术支持"],
      },
      "boss-report": {
        scriptExample: "陈总，目前客户对我们的产品表现出浓厚兴趣，技术评估已通过第一轮...",
        structure: "现状汇报 → 客户反馈 → 进展分析 → 下步计划",
        keywords: ["客户反馈", "进展情况", "时间节点", "成交概率"],
      },
    }

    return (
      hints[scenarioId as keyof typeof hints] || {
        scriptExample: "请根据对话情况灵活回应...",
        structure: "分析情况 → 组织语言 → 清晰表达",
        keywords: ["专业", "准确", "清晰"],
      }
    )
  }

  const startDialogue = (scenario: DialogueScenario) => {
    setSelectedScenario(scenario)
    setIsInDialogue(true)
    setCurrentObjective(scenario.objective)
    setObjectiveProgress(0)
    setShowFeedback(false)

    setCurrentHints(getHintsForScenario(scenario.id, 1))

    // AI开场白
    const openingMessage = getOpeningMessage(scenario)
    setMessages([
      {
        role: "ai",
        content: openingMessage,
        timestamp: new Date(),
      },
    ])
  }

  const getOpeningMessage = (scenario: DialogueScenario) => {
    switch (scenario.id) {
      case "client-intro":
        return "你好，我是李经理。听说你们有一款云盾防火墙产品，我们公司正在考虑升级网络安全设备。能简单介绍一下这个产品吗？"
      case "budget-inquiry":
        return "我是财务总监王总。关于防火墙采购，我们需要了解大概的投资预算。你们的产品价格区间是怎样的？"
      case "technical-discussion":
        return "我是技术架构师张工。我们现有系统比较复杂，想了解你们的防火墙在技术架构上有什么特点，兼容性如何？"
      case "boss-report":
        return "小李，最近云盾防火墙这个项目进展如何？客户那边反馈怎么样？下一步有什么计划？"
      default:
        return "你好，我们开始对话练习吧。"
    }
  }

  const sendMessage = () => {
    if (!userInput.trim()) return

    const newUserMessage = {
      role: "user" as const,
      content: userInput,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, newUserMessage])

    const messageCount = messages.length + 1
    setCurrentHints(getHintsForScenario(selectedScenario!.id, messageCount))

    // 分析用户回答并生成AI回复
    setTimeout(() => {
      const aiResponse = generateAIResponse(userInput, selectedScenario!)
      const newAIMessage = {
        role: "ai" as const,
        content: aiResponse.content,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newAIMessage])
      setObjectiveProgress(aiResponse.progress)

      // 检查是否完成目标
      if (aiResponse.progress >= 100) {
        setTimeout(() => {
          setShowFeedback(true)
          setFinalScore(aiResponse.score)
        }, 2000)
      }
    }, 1500)

    setUserInput("")
  }

  const generateAIResponse = (userInput: string, scenario: DialogueScenario) => {
    // 关键词检测和评分逻辑
    const keywords = {
      "client-intro": ["企业级", "安全防护", "云端部署", "威胁检测", "流量监控"],
      "budget-inquiry": ["性价比", "投资回报", "分期付款", "维护成本", "升级方案"],
      "technical-discussion": ["架构兼容", "API接口", "性能指标", "部署方式", "技术支持"],
      "boss-report": ["客户反馈", "进展情况", "下一步", "时间节点", "成交概率"],
    }

    const scenarioKeywords = keywords[scenario.id as keyof typeof keywords] || []
    const matchedKeywords = scenarioKeywords.filter((keyword) =>
      userInput.toLowerCase().includes(keyword.toLowerCase()),
    )

    const progress = Math.min(objectiveProgress + matchedKeywords.length * 25, 100)
    const score = Math.min(60 + matchedKeywords.length * 10, 95)

    // 生成对应的AI回复
    const responses = {
      "client-intro": [
        "听起来不错，那在安全防护方面有什么特色功能吗？",
        "这个云端部署的优势是什么？我们担心数据安全问题。",
        "明白了，那与传统防火墙相比，你们的产品有什么突出优势？",
      ],
      "budget-inquiry": [
        "这个价格区间我们可以接受，那后续的维护成本大概是多少？",
        "投资回报率确实重要，你们有没有成功案例可以参考？",
        "分期付款的话，具体的付款方式是怎样的？",
      ],
      "technical-discussion": [
        "API接口的兼容性很重要，你们支持哪些主流的管理平台？",
        "性能指标看起来不错，在高并发场景下表现如何？",
        "部署过程中如果遇到技术问题，你们的技术支持响应时间是多久？",
      ],
      "boss-report": [
        "客户反馈积极，那我们的竞争优势在哪里？",
        "时间节点要把握好，下周能安排技术演示吗？",
        "成交概率如何？需要我这边配合什么资源？",
      ],
    }

    const scenarioResponses = responses[scenario.id as keyof typeof responses] || ["请继续说明。"]
    const randomResponse = scenarioResponses[Math.floor(Math.random() * scenarioResponses.length)]

    return {
      content: randomResponse,
      progress,
      score,
    }
  }

  const resetDialogue = () => {
    setIsInDialogue(false)
    setSelectedScenario(null)
    setMessages([])
    setUserInput("")
    setCurrentObjective("")
    setObjectiveProgress(0)
    setShowFeedback(false)
    setFinalScore(0)
    setShowHints(true)
    setCurrentHints({ scriptExample: "", structure: "", keywords: [] })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "初级":
        return "bg-green-100 text-green-800"
      case "中级":
        return "bg-yellow-100 text-yellow-800"
      case "高级":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (showFeedback) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-foreground">🎭 对话练习完成</h1>
              <Link href="/training">
                <Button variant="outline" size="sm">
                  返回培训
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="max-w-4xl mx-auto px-4 py-8">
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-green-800">🎉 练习完成！</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl font-bold text-green-600">{finalScore}分</div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-green-800 mb-2">目标完成度</h3>
                  <Progress value={objectiveProgress} className="h-3" />
                  <p className="text-sm text-green-700 mt-1">{objectiveProgress}% 完成</p>
                </div>

                <div className="bg-white/50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-800 mb-2">话术建议</h3>
                  <ul className="text-sm text-green-700 space-y-1 text-left">
                    <li>• 多使用具体的技术参数和数据支撑观点</li>
                    <li>• 主动询问客户的具体需求和痛点</li>
                    <li>• 适时提供成功案例增强说服力</li>
                    <li>• 保持专业且友好的沟通语调</li>
                  </ul>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <Button onClick={resetDialogue} className="bg-green-600 hover:bg-green-700">
                  重新练习
                </Button>
                <Link href="/training">
                  <Button variant="outline">返回培训主页</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  if (isInDialogue && selectedScenario) {
    return (
      <div className="min-h-screen bg-background">
        <header className="bg-card border-b border-border">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-xl font-bold text-foreground">🎭 {selectedScenario.title}</h1>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowHints(!showHints)}
                  variant="outline"
                  size="sm"
                  className={showHints ? "bg-primary/10" : ""}
                >
                  {showHints ? "🔔 隐藏提醒" : "🔔 显示提醒"}
                </Button>
                <Button onClick={resetDialogue} variant="outline" size="sm">
                  结束对话
                </Button>
              </div>
            </div>

            <div className="bg-primary/5 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-primary">对话目标：{currentObjective}</span>
                <span className="text-sm text-muted-foreground">{objectiveProgress}% 完成</span>
              </div>
              <Progress value={objectiveProgress} className="h-2" />
            </div>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-6">
          {/* 角色信息卡片 */}
          <Card className="mb-6 bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {selectedScenario.role.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800">{selectedScenario.role}</h3>
                  <p className="text-sm text-blue-600">{selectedScenario.roleDescription}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 主要内容区域 - 左右布局 */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：用户提问款和回答款 */}
            <div className="lg:col-span-2">
              {/* 对话区域 */}
              <Card className="mb-6">
                <CardContent className="p-0">
                  <div className="h-96 overflow-y-auto p-4 space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.role === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 右侧：陪练提醒款 */}
            <div>
              {showHints && (
                <Card className="bg-amber-50 border-amber-200">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-amber-800 flex items-center gap-2">💡 陪练提醒</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between text-amber-700 hover:bg-amber-100">
                          📝 话术示例
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <div className="bg-white/70 rounded-lg p-3 text-sm text-amber-800">
                          {currentHints.scriptExample}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    <Collapsible>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between text-amber-700 hover:bg-amber-100">
                          🏗️ 演讲结构建议
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="mt-2">
                        <div className="bg-white/70 rounded-lg p-3 text-sm text-amber-800">{currentHints.structure}</div>
                      </CollapsibleContent>
                    </Collapsible>

                    <div className="bg-white/70 rounded-lg p-3">
                      <h4 className="text-sm font-medium text-amber-800 mb-2">🎯 关键词提示</h4>
                      <div className="flex flex-wrap gap-2">
                        {currentHints.keywords.map((keyword, index) => (
                          <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-800 text-xs">
                            {keyword}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* 输入区域 */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="输入你的回答..."
                  className="min-h-20"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      sendMessage()
                    }
                  }}
                />
                <div className="flex gap-2">
                  <Button onClick={sendMessage} className="flex-1" disabled={!userInput.trim()}>
                    发送回答
                  </Button>
                  <Button variant="outline" size="sm">
                    💡 提示
                  </Button>
                  <Button variant="outline" size="sm">
                    🔄 重说
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">💬 自由对话练习</h1>
            <Link href="/training">
              <Button variant="outline" size="sm">
                返回培训
              </Button>
            </Link>
          </div>
          <p className="text-muted-foreground mt-2">选择对话场景，与AI进行真实的销售对话模拟</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold">{scenario.title}</CardTitle>
                  <Badge className={getDifficultyColor(scenario.difficulty)}>{scenario.difficulty}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-foreground">扮演角色：</span>
                    <span className="text-sm font-semibold text-primary">{scenario.role}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{scenario.roleDescription}</p>
                </div>

                <div className="bg-muted/50 rounded-lg p-3">
                  <span className="text-sm font-medium text-foreground">对话目标：</span>
                  <p className="text-sm text-muted-foreground mt-1">{scenario.objective}</p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>预计时长：{scenario.estimatedTime}</span>
                </div>

                <Button onClick={() => startDialogue(scenario)} className="w-full">
                  开始对话练习
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-muted/50">
          <CardContent className="p-6 text-center">
            <h4 className="font-semibold text-foreground mb-2">练习说明</h4>
            <p className="text-sm text-muted-foreground">
              AI会根据不同角色特点进行对话，系统将实时跟踪目标完成度并提供话术建议。建议多次练习不同场景以提升综合能力。
            </p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
