"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Users, Calendar, BookOpen, Target } from "lucide-react"

interface Employee {
  id: string
  name: string
  department: string
  position: string
  email: string
}

type TaskStatus = "pending" | "in-progress" | "completed"
type TaskType = "销售基础训练" | "销售角色实训"
type TaskMode = "选择题模式" | "开放问答模式" | "自由对话练习"

interface Task {
  id: string
  title: string
  description: string
  assignees: Employee[]
  startDate: string
  deadline: string
  supervisor: string
  status: TaskStatus
  createdAt: string
  type: TaskType
  mode?: TaskMode
  taskType: string
}

/** نفس الشكل الذي تخزّنه في officialTasks */
interface OfficialTask {
  id: number
  title: string
  description: string
  difficulty: string
  duration: string
  completed: boolean
  materials: string[]
  taskType: string
  status: string
  startDate: string
  deadline: string
  supervisor: string
  type: TaskType
  mode?: TaskMode
  assignees: string[]
}

export default function ManagementCenterPage() {
  const [selectionMethod, setSelectionMethod] = useState<"department" | "position">("department")
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])
  const [tasks, setTasks] = useState<Task[]>([])

  // 模拟员工数据
  const mockEmployees: Employee[] = [
    { id: "1", name: "张三", department: "销售部", position: "销售专员", email: "zhangsan@company.com" },
    { id: "2", name: "李四", department: "销售部", position: "销售经理", email: "lisi@company.com" },
    { id: "3", name: "王五", department: "技术部", position: "解决方案专家", email: "wangwu@company.com" },
    { id: "4", name: "赵六", department: "市场部", position: "市场专员", email: "zhaoliu@company.com" },
    { id: "5", name: "钱七", department: "销售部", position: "解决方案专家", email: "qianqi@company.com" },
  ]

  const departments = ["销售部", "技术部", "市场部", "客服部"]
  const positions = ["销售专员", "销售经理", "解决方案专家", "技术支持", "市场专员"]

  // 页面加载时从localStorage获取已保存的任务
  useEffect(() => {
    const savedTasks = localStorage.getItem("managementTasks")
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks) as Task[])
    }
  }, [])

  const handleEmployeeSelect = (employee: Employee) => {
    if (selectedEmployees.find((e) => e.id === employee.id)) {
      setSelectedEmployees(selectedEmployees.filter((e) => e.id !== employee.id))
    } else {
      setSelectedEmployees([...selectedEmployees, employee])
    }
  }

  const handleCreateTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    const newTask: Task = {
      id: Date.now().toString(),
      title: (formData.get("title") as string) ?? "",
      description: (formData.get("description") as string) ?? "",
      assignees: selectedEmployees,
      startDate: (formData.get("startDate") as string) ?? "",
      deadline: (formData.get("deadline") as string) ?? "",
      supervisor: (formData.get("supervisor") as string) ?? "",
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
      type: formData.get("type") as TaskType,
      mode: (formData.get("mode") as TaskMode) || undefined,
      taskType: "官方任务",
    }

    // 保存到管理中心的任务列表
    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    localStorage.setItem("managementTasks", JSON.stringify(updatedTasks))

    setSelectedEmployees([])

    // 同步到学习中心的 officialTasks
    const existingOfficialTasks: OfficialTask[] = JSON.parse(
      localStorage.getItem("officialTasks") || "[]"
    ) as OfficialTask[]

    const newOfficialTask: OfficialTask = {
      id: parseInt(newTask.id, 10),
      title: newTask.title,
      description: newTask.description,
      difficulty: "中级",
      duration: "45分钟",
      completed: false,
      materials: ["任务说明"],
      taskType: "官方任务",
      status: "开始学习",
      startDate: newTask.startDate,
      deadline: newTask.deadline,
      supervisor: newTask.supervisor,
      type: newTask.type,
      mode: newTask.mode,
      assignees: newTask.assignees.map((emp) => emp.name),
    }

    const taskIndex = existingOfficialTasks.findIndex(
      (task: OfficialTask) => task.id === newOfficialTask.id
    )
    let updatedOfficialTasks: OfficialTask[]
    if (taskIndex !== -1) {
      updatedOfficialTasks = [...existingOfficialTasks]
      updatedOfficialTasks[taskIndex] = newOfficialTask
    } else {
      updatedOfficialTasks = [...existingOfficialTasks, newOfficialTask]
    }
    localStorage.setItem("officialTasks", JSON.stringify(updatedOfficialTasks))

    // 同步到任务管理页面 tasksManagement
    const existingTasksManagement: Task[] = JSON.parse(
      localStorage.getItem("tasksManagement") || "[]"
    ) as Task[]

    const newTaskForManagement: Task = { ...newTask }

    const taskMgmtIndex = existingTasksManagement.findIndex(
      (task: Task) => task.id === newTaskForManagement.id
    )
    let updatedTasksManagement: Task[]
    if (taskMgmtIndex !== -1) {
      updatedTasksManagement = [...existingTasksManagement]
      updatedTasksManagement[taskMgmtIndex] = newTaskForManagement
    } else {
      updatedTasksManagement = [...existingTasksManagement, newTaskForManagement]
    }
    localStorage.setItem("tasksManagement", JSON.stringify(updatedTasksManagement))

    // 通知其他页面
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("officialTasksUpdated"))
      window.dispatchEvent(new Event("tasksManagementUpdated"))
    }

    alert("任务创建成功！已同步到任务管理页面和学习中心页面")
    e.currentTarget.reset()
  }

  const getFilteredEmployees = () => {
    // فيما بعد يمكنك تطبيق الترشيح الحقيقي حسب department/position
    return mockEmployees
  }

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="hidden md:block">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                返回首页
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">管理中心</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">创建新任务</h2>
            <p className="text-muted-foreground">创建的任务将同步展示在任务管理页面和学习中心页面</p>
          </div>

          <form onSubmit={handleCreateTask} className="space-y-8">
            {/* Task Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  任务信息
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">任务标题 *</label>
                    <Input type="text" name="title" required placeholder="请输入任务标题" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">开始时间 *</label>
                    <Input type="date" name="startDate" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">截止时间 *</label>
                    <Input type="date" name="deadline" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">负责人 *</label>
                    <Input type="text" name="supervisor" required placeholder="请输入负责人姓名" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">任务描述</label>
                    <Textarea name="description" rows={3} placeholder="请输入任务描述" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">任务类型 *</label>
                    {/* ملاحظة: Select من shadcn لا يدعم name افتراضياً.
                        إن أردت التقاط القيمة عبر FormData، ضع input مخفي وحدثه onValueChange. */}
                    <Select name="type" required>
                      <SelectTrigger>
                        <SelectValue placeholder="选择任务类型" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="销售基础训练">销售基础训练</SelectItem>
                        <SelectItem value="销售角色实训">销售角色实训</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div id="taskModeContainer">
                    <label className="block text-sm font-medium mb-2">任务模式 *</label>
                    <Select name="mode">
                      <SelectTrigger>
                        <SelectValue placeholder="选择任务模式" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="选择题模式">选择题模式</SelectItem>
                        <SelectItem value="开放问答模式">开放问答模式</SelectItem>
                        <SelectItem value="自由对话练习">自由对话练习</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Employee Selection */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  选择人员
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Selection Method */}
                <div>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="selectionMethod"
                        value="department"
                        checked={selectionMethod === "department"}
                        onChange={(e) => setSelectionMethod(e.target.value as "department" | "position")}
                        className="mr-2"
                      />
                      按组织架构筛选
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="selectionMethod"
                        value="position"
                        checked={selectionMethod === "position"}
                        onChange={(e) => setSelectionMethod(e.target.value as "department" | "position")}
                        className="mr-2"
                      />
                      按岗位名称筛选
                    </label>
                  </div>
                </div>

                {/* Filter Options */}
                {selectionMethod === "department" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">选择部门</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="全部部门" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {selectionMethod === "position" && (
                  <div>
                    <label className="block text-sm font-medium mb-2">选择岗位</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="全部岗位" />
                      </SelectTrigger>
                      <SelectContent>
                        {positions.map((pos) => (
                          <SelectItem key={pos} value={pos}>
                            {pos}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Employee List */}
                <div>
                  <h3 className="text-lg font-medium mb-4">员工列表</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {getFilteredEmployees().map((employee) => (
                      <div
                        key={employee.id}
                        onClick={() => handleEmployeeSelect(employee)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedEmployees.find((e) => e.id === employee.id)
                            ? "border-primary bg-primary/10"
                            : "border-border hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{employee.name}</div>
                            <div className="text-sm text-muted-foreground">{employee.department}</div>
                            <div className="text-sm text-muted-foreground">{employee.position}</div>
                          </div>
                          {selectedEmployees.find((e) => e.id === employee.id) && (
                            <div className="text-primary">✓</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Employees */}
                {selectedEmployees.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">已选择人员 ({selectedEmployees.length})</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployees.map((employee) => (
                        <span
                          key={employee.id}
                          className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                        >
                          {employee.name}
                          <button
                            type="button"
                            onClick={() => handleEmployeeSelect(employee)}
                            className="ml-2 text-primary hover:text-primary/80"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={selectedEmployees.length === 0} className="px-8">
                创建并下发任务
              </Button>
            </div>
          </form>

          {/* Created Tasks List */}
          {tasks.length > 0 && (
            <Card className="mt-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  已创建的任务
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tasks.map((task: Task) => (
                    <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">{task.title}</h3>
                          <p className="text-muted-foreground text-sm">{task.description}</p>
                        </div>
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            task.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : task.status === "in-progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {task.status === "completed" ? "已完成" : task.status === "in-progress" ? "进行中" : "待开始"}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground mt-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          开始：{task.startDate}
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          截止：{task.deadline}
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          分配给 {task.assignees.length} 人
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
