"use client"

import type React from "react"
import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { PlayCircle } from "lucide-react" // ✅ أيقونة 开学习

interface Employee {
  id: string
  name: string
  department: string
  position: string
  email: string
}

interface Task {
  id: string
  title: string
  description: string
  assignees: Employee[]
  startDate: string
  deadline: string
  supervisor: string
  status: "pending" | "in-progress" | "completed"
  createdAt: string
  type: "销售基础训练" | "销售角色实训"
  mode?: "选择题模式" | "开放问答模式" | "自由对话练习"
  taskType: string
}

interface KbItem {
  id: string | number
  title: string
}

export default function TaskManagementPage() {
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create")
  const [selectionMethod, setSelectionMethod] = useState<"department" | "position">("department")
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskDetail, setShowTaskDetail] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])

  // ==== 知识库选择 ====
  const [titleValue, setTitleValue] = useState("")
  const [kbItems, setKbItems] = useState<KbItem[]>([])
  const [showKbPicker, setShowKbPicker] = useState(false)
  const [kbSearch, setKbSearch] = useState("")

  useEffect(() => {
    // ---- tasks
    const savedTasks = JSON.parse(localStorage.getItem("tasksManagement") || "[]")
    if (savedTasks.length > 0) {
      setTasks(savedTasks)
    } else {
      setTasks([
        {
          id: "1",
          title: "产品介绍陪练",
          description: "完成赛博坦-云盾防火墙产品介绍训练",
          assignees: [
            { id: "1", name: "张三", department: "销售部", position: "销售专员", email: "zhangsan@company.com" },
            { id: "2", name: "李四", department: "销售部", position: "销售经理", email: "lisi@company.com" },
          ],
          startDate: "2024-01-01",
          deadline: "2024-01-15",
          supervisor: "王经理",
          status: "in-progress",
          createdAt: "2024-01-01",
          type: "销售基础训练",
          taskType: "官方任务",
        },
      ])
    }

    const handleTasksUpdate = () => {
      const updatedTasks = JSON.parse(localStorage.getItem("tasksManagement") || "[]")
      setTasks(updatedTasks)
    }
    window.addEventListener("tasksManagementUpdated", handleTasksUpdate)

    // ---- kb
    const loadKb = () => {
      const raw = localStorage.getItem("knowledgeBase")
      let list: KbItem[] = []
      if (raw) {
        try {
          const parsed = JSON.parse(raw)
          const arr = Array.isArray(parsed)
            ? parsed
            : Array.isArray(parsed?.items)
            ? parsed.items
            : Array.isArray(parsed?.data)
            ? parsed.data
            : Array.isArray(parsed?.list)
            ? parsed.list
            : []

          list = (arr || [])
            .map((it: any) => ({
              id: it?.id ?? it?.fileId ?? it?.title ?? crypto.randomUUID(),
              title: it?.title ?? it?.name ?? it?.heading ?? it?.subject ?? "",
            }))
            .filter((it: KbItem) => it.title)
        } catch (e) {
          console.error("解析 knowledgeBase 失败:", e)
        }
      }
      setKbItems(list)
    }
    loadKb()

    const handleKbUpdate = () => loadKb()
    window.addEventListener("knowledgeBaseUpdated", handleKbUpdate)

    return () => {
      window.removeEventListener("tasksManagementUpdated", handleTasksUpdate)
      window.removeEventListener("knowledgeBaseUpdated", handleKbUpdate)
    }
  }, [])

  // قائمة المكتبة مع الفلترة
  const filteredKb = useMemo(() => {
    const q = kbSearch.trim().toLowerCase()
    if (!q) return kbItems
    return kbItems.filter((k) => k.title.toLowerCase().includes(q))
  }, [kbItems, kbSearch])

  // ---- موظفين وهميين
  const mockEmployees: Employee[] = [
    { id: "1", name: "张三", department: "销售部", position: "销售专员", email: "zhangsan@company.com" },
    { id: "2", name: "李四", department: "销售部", position: "销售经理", email: "lisi@company.com" },
    { id: "3", name: "王五", department: "技术部", position: "解决方案专家", email: "wangwu@company.com" },
    { id: "4", name: "赵六", department: "市场部", position: "市场专员", email: "zhaoliu@company.com" },
    { id: "5", name: "钱七", department: "销售部", position: "解决方案专家", email: "qianqi@company.com" },
  ]
  const departments = ["销售部", "技术部", "市场部", "客服部"]
  const positions = ["销售专员", "销售经理", "解决方案专家", "技术支持", "市场专员"]

  const handleEmployeeSelect = (employee: Employee) => {
    if (selectedEmployees.find((e) => e.id === employee.id)) {
      setSelectedEmployees(selectedEmployees.filter((e) => e.id !== employee.id))
    } else {
      setSelectedEmployees([...selectedEmployees, employee])
    }
  }

  // ✅ 开学习
  const handleStartLearning = (task: Task) => {
    // ضع هنا التوجيه لصفحة التعلم إذا أردت
    alert(`开始学习：${task.title}`)
  }

  // إنشاء مهمة
  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)

    const titleFromForm = (formData.get("title") as string) || titleValue
    if (!titleFromForm) {
      alert("请填写或选择任务标题")
      return
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: titleFromForm,
      description: formData.get("description") as string,
      assignees: selectedEmployees,
      startDate: formData.get("startDate") as string,
      deadline: formData.get("deadline") as string,
      supervisor: formData.get("supervisor") as string,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
      type: formData.get("type") as "销售基础训练" | "销售角色实训",
      mode: formData.get("mode") as "选择题模式" | "开放问答模式" | "自由对话练习" | undefined,
      taskType: "官方任务",
    }

    const updatedTasks = [...tasks, newTask]
    setTasks(updatedTasks)
    localStorage.setItem("tasksManagement", JSON.stringify(updatedTasks))
    setSelectedEmployees([])

    // مزامنة إلى officialTasks (صفحة التعلم)
    const existingOfficialTasks = JSON.parse(localStorage.getItem("officialTasks") || "[]")
    const newOfficialTask = {
      id: parseInt(newTask.id),
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
    const taskIndex = existingOfficialTasks.findIndex((task: any) => task.id === newOfficialTask.id)
    const updatedOfficialTasks =
      taskIndex !== -1
        ? Object.assign([...existingOfficialTasks], { [taskIndex]: newOfficialTask })
        : [...existingOfficialTasks, newOfficialTask]

    localStorage.setItem("officialTasks", JSON.stringify(updatedOfficialTasks))
    if (typeof window !== "undefined") window.dispatchEvent(new Event("officialTasksUpdated"))

    alert("任务创建成功！")
    setTitleValue("")
    form.reset()
  }

  const getFilteredEmployees = () => {
    if (selectionMethod === "department") return mockEmployees
    if (selectionMethod === "position") return mockEmployees
    return mockEmployees
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pb-safe">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-emerald-600 hover:text-emerald-700">
                ← 返回首页
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">📌 任务管理中心</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm">
            <button
              onClick={() => setActiveTab("create")}
              className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
                activeTab === "create" ? "bg-emerald-500 text-white shadow-md" : "text-gray-600 hover:text-emerald-600"
              }`}
            >
              创建任务
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
                activeTab === "manage" ? "bg-emerald-500 text-white shadow-md" : "text-gray-600 hover:text-emerald-600"
              }`}
            >
              任务管理
            </button>
          </div>
        </div>

        {/* Create Task */}
        {activeTab === "create" && (
          <div className="max-w-6xl mx-auto">
            <form onSubmit={handleCreateTask} className="space-y-8">
              {/* Task Info */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">任务信息</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 任务标题 + 知识库 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      任务标题 * <span className="text-xs text-gray-400">(可直接从知识库选择)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="title"
                        value={titleValue}
                        onChange={(e) => setTitleValue(e.target.value)}
                        list="kbTitles"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="输入或从下拉列表选择知识库标题"
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <datalist id="kbTitles">
                      {kbItems.length > 0 ? (
                        kbItems.map((item) => <option key={item.id} value={item.title} />)
                      ) : (
                        <option value="">暂无知识库标题</option>
                      )}
                    </datalist>
                    <div className="flex gap-2 mt-2">
                      <button
                        type="button"
                        onClick={() => setShowKbPicker(true)}
                        className="text-xs text-emerald-600 hover:text-emerald-800 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                        高级选择
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const possibleKeys = ["knowledgeBase", "knowledgeItems", "kbData", "knowledgeData", "trainingMaterials"]
                          let list: KbItem[] = []
                          for (const key of possibleKeys) {
                            const raw = localStorage.getItem(key)
                            if (raw) {
                              try {
                                const parsed = JSON.parse(raw)
                                const arr = Array.isArray(parsed)
                                  ? parsed
                                  : Array.isArray(parsed?.items)
                                  ? parsed.items
                                  : Array.isArray(parsed?.data)
                                  ? parsed.data
                                  : Array.isArray(parsed?.list)
                                  ? parsed.list
                                  : []
                                list = (arr || [])
                                  .map((it: any) => ({
                                    id: it?.id ?? it?.fileId ?? it?.title ?? crypto.randomUUID(),
                                    title: it?.title ?? it?.name ?? it?.heading ?? it?.subject ?? "",
                                  }))
                                  .filter((it: KbItem) => it.title)
                                if (list.length > 0) break
                              } catch (e) {
                                console.error(`解析 ${key} 失败:`, e)
                              }
                            }
                          }
                          setKbItems(list)
                          console.log(`重新加载了 ${list.length} 个知识库项目`)
                        }}
                        className="text-xs text-emerald-600 hover:text-emerald-800 flex items-center"
                        title="重新读取知识库标题"
                      >
                        <svg className="w-4 h-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        刷新知识库
                      </button>
                    </div>
                    <p className="mt-1 text-xs text-gray-400">
                      {kbItems.length > 0 ? `已读取 ${kbItems.length} 个知识库文件` : "未找到知识库数据，请先在“知识库管理”上传资料"}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">开始时间 *</label>
                    <input
                      type="date"
                      name="startDate"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">截止时间 *</label>
                    <input
                      type="date"
                      name="deadline"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">任务描述</label>
                    <textarea
                      name="description"
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="请输入任务描述"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">负责人 *</label>
                    <input
                      type="text"
                      name="supervisor"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="请输入负责人姓名"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">任务类型 *</label>
                    <select
                      name="type"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      onChange={(e) => {
                        const node = document.getElementById("taskModeContainer")
                        if (!node) return
                        if (e.target.value === "销售基础训练") node.classList.remove("hidden")
                        else node.classList.add("hidden")
                      }}
                    >
                      <option value="">选择任务类</option>
                      <option value="销售基础训练">销售基础训练</option>
                      <option value="销售角色实训">销售角色实训</option>
                    </select>
                  </div>

                  <div id="taskModeContainer" className="hidden">
                    <label className="block text-sm font-medium text-gray-700 mb-2">任务模式 *</label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input type="radio" name="mode" value="选择题模式" className="mr-2" />
                        选择题模式
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="mode" value="开放问答模式" className="mr-2" />
                        开放问答模式
                      </label>
                      <label className="flex items-center">
                        <input type="radio" name="mode" value="自由对话练习" className="mr-2" />
                        自由对话练习
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* 选择人员 */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">选择人员</h2>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="selectionMethod"
                        value="department"
                        checked={selectionMethod === "department"}
                        onChange={(e) => setSelectionMethod(e.target.value as any)}
                        className="mr-2"
                      />
                      按组织架构筛选
                    </label>
                  </div>
                </div>

                {selectionMethod === "department" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">选择部门</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option value="">全部部门</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {selectionMethod === "position" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">选择岗位</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500">
                      <option value="">全部岗位</option>
                      {positions.map((pos) => (
                        <option key={pos} value={pos}>
                          {pos}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-4">员工列表</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                    {getFilteredEmployees().map((employee) => (
                      <div
                        key={employee.id}
                        onClick={() => handleEmployeeSelect(employee)}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedEmployees.find((e) => e.id === employee.id)
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-gray-200 hover:border-emerald-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-800">{employee.name}</div>
                            <div className="text-sm text-gray-600">{employee.department}</div>
                            <div className="text-sm text-gray-500">{employee.position}</div>
                          </div>
                          {selectedEmployees.find((e) => e.id === employee.id) && (
                            <div className="text-emerald-500">✓</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selectedEmployees.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-800 mb-4">已选择人员 ({selectedEmployees.length})</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedEmployees.map((employee) => (
                        <span
                          key={employee.id}
                          className="inline-flex items-center px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                        >
                          {employee.name}
                          <button
                            type="button"
                            onClick={() => handleEmployeeSelect(employee)}
                            className="ml-2 text-emerald-600 hover:text-emerald-800"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={selectedEmployees.length === 0}
                  className="px-8 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  创建并下发任务
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Manage Tasks */}
        {activeTab === "manage" && (
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">任务列表</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">任务信息</th>
                      {/* ✅ 分配人员 已移除 */}
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">任务类型</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">开始时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">截止时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
                      {/* ✅ عمود 开学习 الجديد قبل 操作 */}
                      
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">操作</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {tasks.map((task) => (
                      <tr key={task.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{task.title}</div>
                            <div className="text-sm text-gray-500">{task.description}</div>
                            <div className="text-xs text-gray-400">负责人: {task.supervisor}</div>
                          </div>
                        </td>

                        {/* 任务类型 كبادج */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                              task.type === "销售基础训练"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }`}
                          >
                            {task.type}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.startDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{task.deadline}</td>

                        <td className="px-6 py-4 whitespace-nowrap">
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
                        </td>

                        {/* 操作 */}
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            className="text-emerald-600 hover:text-emerald-900 mr-3"
                            onClick={() => {
                              setSelectedTask(task)
                              setShowTaskDetail(true)
                            }}
                          >
                            查看详情
                          </button>
                          <button className="text-red-600 hover:text-red-900">删除</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* === 选择知识库文件的 Modal === */}
      {showKbPicker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-xl max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">从知识库选择标题</h3>
              <button onClick={() => setShowKbPicker(false)} className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200">
                关闭
              </button>
            </div>

            <div className="p-4 border-b">
              <input
                type="text"
                value={kbSearch}
                onChange={(e) => setKbSearch(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="搜索知识库标题…"
              />
              <p className="mt-1 text-xs text-gray-400">{filteredKb.length} 个结果</p>
            </div>

            <div className="p-2 overflow-y-auto" style={{ maxHeight: "55vh" }}>
              {filteredKb.length === 0 ? (
                <div className="p-6 text-center text-gray-500">未找到结果</div>
              ) : (
                <ul className="divide-y">
                  {filteredKb.map((item) => (
                    <li
                      key={item.id}
                      className="p-3 hover:bg-emerald-50 cursor-pointer"
                      onClick={() => {
                        setTitleValue(item.title)
                        setShowKbPicker(false)
                      }}
                    >
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <div className="text-xs text-gray-400">ID: {String(item.id)}</div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Task Detail Modal */}
      {showTaskDetail && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">任务详情</h2>
              <button onClick={() => setShowTaskDetail(false)} className="text-gray-500 hover:text-gray-700">
                ×
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">任务信息</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">任务标题</p>
                      <p className="font-medium">{selectedTask.title}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">任务类型</p>
                      <p className="font-medium">{selectedTask.type}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">负责人</p>
                      <p className="font-medium">{selectedTask.supervisor}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">状态</p>
                      <p className="font-medium">
                        {selectedTask.status === "completed" ? "已完成" : selectedTask.status === "in-progress" ? "进行中" : "待开始"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">任务描述</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p>{selectedTask.description || "无描述"}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">时间安排</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">开始时间</p>
                      <p className="font-medium">{selectedTask.startDate}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">截止时间</p>
                      <p className="font-medium">{selectedTask.deadline}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">分配人员</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    {selectedTask.assignees.map((assignee) => (
                      <div key={assignee.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{assignee.name}</p>
                          <p className="text-sm text-gray-600">
                            {assignee.department} - {assignee.position}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {selectedTask.mode && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">任务模式</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium">{selectedTask.mode}</p>
                  </div>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600" onClick={() => setShowTaskDetail(false)}>
                关闭
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
