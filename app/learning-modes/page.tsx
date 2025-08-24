"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"

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
  taskType: "官方任务" | "自主任务"
}

export default function TaskManagementPage() {
  const [activeTab, setActiveTab] = useState<"create" | "manage">("create")

  // 官方任务（تبويب manage）
  const [tasks, setTasks] = useState<Task[]>([])

  // 自主任务（تبويب create）
  const [autonomousTasks, setAutonomousTasks] = useState<Task[]>([])
  const [showAutonomousTaskForm, setShowAutonomousTaskForm] = useState(false)

  // نافذة تفاصيل مشتركة
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [showTaskDetail, setShowTaskDetail] = useState(false)
  const [showScenarioPage, setShowScenarioPage] = useState(false)
  const [showProductIntro, setShowProductIntro] = useState(false)

  // load data from localStorage
  useEffect(() => {
    const savedOfficial = JSON.parse(localStorage.getItem("tasksManagement") || "[]")
    if (savedOfficial.length > 0) setTasks(savedOfficial)

    const savedAutonomous = JSON.parse(localStorage.getItem("autonomousTasks") || "[]")
    if (savedAutonomous.length > 0) setAutonomousTasks(savedAutonomous)
  }, [])

  // handlers: 自主任务
  const handleCreateAutonomousTask: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)

    const newTask: Task = {
      id: Date.now().toString(),
      title: (fd.get("title") as string) || "",
      description: (fd.get("description") as string) || "",
      assignees: [], // الطالب ينجزها بنفسه
      startDate: (fd.get("startDate") as string) || "",
      deadline: (fd.get("deadline") as string) || "",
      supervisor: "自主任务",
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
      type: fd.get("type") as Task["type"],
      taskType: "自主任务",
    }

    const updated = [...autonomousTasks, newTask]
    setAutonomousTasks(updated)
    localStorage.setItem("autonomousTasks", JSON.stringify(updated))
    setShowAutonomousTaskForm(false)
    ;(e.target as HTMLFormElement).reset()
  }

  const startAutonomousTask = (taskId: string) => {
    const task = autonomousTasks.find(t => t.id === taskId)
    const updated = autonomousTasks.map(t =>
      t.id === taskId ? { ...t, status: "in-progress" } : t
    )
    setAutonomousTasks(updated)
    localStorage.setItem("autonomousTasks", JSON.stringify(updated))

    // 如果是销售角色实训，导航到产品介绍页面
    if (task && (task.type === "销售角色实训" || task.title?.includes("产品介绍") || task.title?.includes("异议处理") || task.title?.includes("价格谈判") || task.title?.includes("客户跟进"))) {
      window.location.href = `/product-intro?taskId=${taskId}`
    }
  }

  const completeAutonomousTask = (taskId: string) => {
    const updated = autonomousTasks.map(t =>
      t.id === taskId ? { ...t, status: "completed" } : t
    )
    setAutonomousTasks(updated)
    localStorage.setItem("autonomousTasks", JSON.stringify(updated))
  }

  const deleteAutonomousTask = (taskId: string) => {
    const updated = autonomousTasks.filter(t => t.id !== taskId)
    setAutonomousTasks(updated)
    localStorage.setItem("autonomousTasks", JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-emerald-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-emerald-600 hover:text-emerald-700">← 返回首页</Link>
              <h1 className="text-2xl font-bold text-gray-800">📌 学习任务</h1>
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
              自主任务
            </button>
            <button
              onClick={() => setActiveTab("manage")}
              className={`flex-1 py-3 px-6 rounded-md font-medium transition-all ${
                activeTab === "manage" ? "bg-emerald-500 text-white shadow-md" : "text-gray-600 hover:text-emerald-600"
              }`}
            >
              官方任务
            </button>
          </div>
        </div>

        {/* 自主任务 */}
        {activeTab === "create" && (
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Header + Button */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">学生的自主任务</h2>
              <button
                onClick={() => setShowAutonomousTaskForm(v => !v)}
                className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600"
              >
                {showAutonomousTaskForm ? "取消创建" : "创建新任务"}
              </button>
            </div>

            {/* Form */}
            {showAutonomousTaskForm && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">创建自主任务</h3>
                <form onSubmit={handleCreateAutonomousTask} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">任务标题 *</label>
                      <input
                        type="text" name="title" required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        placeholder="请输入任务标题"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">开始时间 *</label>
                      <input
                        type="date" name="startDate" required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">截止时间 *</label>
                      <input
                        type="date" name="deadline" required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">任务类型 *</label>
                      <select
                        name="type" required defaultValue=""
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      >
                        <option value="" disabled>选择任务类型</option>
                        <option value="销售基础训练">销售基础训练</option>
                        <option value="销售角色实训">销售角色实训</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">任务描述（可选）</label>
                    <textarea
                      name="description" rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                      placeholder="请输入任务描述"
                    />
                  </div>

                  <div className="flex justify-end">
                    <button type="submit" className="px-8 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600">
                      创建
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* List */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">我的任务</h3>
              </div>

              {autonomousTasks.length === 0 ? (
                <div className="p-6 text-gray-600">暂无任务，请点击“创建新任务”。</div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {autonomousTasks.map((task) => (
                    <div key={task.id} className="p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <div className="text-base font-semibold text-gray-900">{task.title}</div>
                        <div className="text-sm text-gray-600 mt-1">{task.description || "无描述"}</div>
                        <div className="text-xs text-gray-500 mt-2">
                          开始：{task.startDate}　/　截止：{task.deadline}　/　类型：{task.type}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          task.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : task.status === "in-progress"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                        }`}>
                          {task.status === "completed" ? "已完成" : task.status === "in-progress" ? "进行中" : "待开始"}
                        </span>
                        <button
                          onClick={() => {
                            setSelectedTask(task)
                            setShowTaskDetail(true)
                          }}
                          className="px-3 py-1 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
                        >
                          详情
                        </button>
                        {task.status !== "in-progress" && task.status !== "completed" && (
                          <button
                            onClick={() => startAutonomousTask(task.id)}
                            className="px-3 py-1 text-sm rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                          >
                            开始
                          </button>
                        )}
                        {task.status === "in-progress" && (
                          <button
                            onClick={() => completeAutonomousTask(task.id)}
                            className="px-3 py-1 text-sm rounded-lg bg-emerald-500 text-white hover:bg-emerald-600"
                          >
                            标记完成
                          </button>
                        )}
                        <button
                          onClick={() => deleteAutonomousTask(task.id)}
                          className="px-3 py-1 text-sm rounded-lg text-red-600 hover:bg-red-50 border border-red-200"
                        >
                          删除
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 官方任务（كما كانت لديك لعرض المهام الموزعة إداريًا من localStorage: tasksManagement） */}
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">分配人员</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">开始时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">截止时间</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状态</th>
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
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {task.assignees.slice(0, 3).map((assignee) => (
                              <span key={assignee.id} className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                {assignee.name}
                              </span>
                            ))}
                            {task.assignees.length > 3 && (
                              <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                +{task.assignees.length - 3}
                              </span>
                            )}
                          </div>
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            className="text-emerald-600 hover:text-emerald-900 mr-3"
                            onClick={() => { setSelectedTask(task); setShowTaskDetail(true) }}
                          >
                            查看详情
                          </button>
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

      {/* Task Detail Modal */}
      {showTaskDetail && selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">任务详情</h2>
              <button onClick={() => setShowTaskDetail(false)} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">任务信息</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><p className="text-sm text-gray-500">任务标题</p><p className="font-medium">{selectedTask.title}</p></div>
                    <div><p className="text-sm text-gray-500">任务类型</p><p className="font-medium">{selectedTask.type}</p></div>
                    <div><p className="text-sm text-gray-500">负责人</p><p className="font-medium">{selectedTask.supervisor}</p></div>
                    <div><p className="text-sm text-gray-500">状态</p>
                      <p className="font-medium">
                        {selectedTask.status === "completed" ? "已完成" : selectedTask.status === "in-progress" ? "进行中" : "待开始"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">任务描述</h3>
                <div className="bg-gray-50 rounded-lg p-4"><p>{selectedTask.description || "无描述"}</p></div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">时间安排</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><p className="text-sm text-gray-500">开始时间</p><p className="font-medium">{selectedTask.startDate}</p></div>
                    <div><p className="text-sm text-gray-500">截止时间</p><p className="font-medium">{selectedTask.deadline}</p></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-between">
              {(selectedTask.type === "销售角色实训" || selectedTask.title?.includes("产品介绍") || selectedTask.title?.includes("异议处理") || selectedTask.title?.includes("价格谈判") || selectedTask.title?.includes("客户跟进")) && (
                <button 
                  onClick={() => {
                    setShowTaskDetail(false);
                    setShowScenarioPage(true);
                  }} 
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  开始场景
                </button>
              )}
              <button onClick={() => setShowTaskDetail(false)} className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 ml-auto">
                关闭
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 产品介绍场景模态框 */}
      {showProductIntro && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">产品介绍场景</h2>
              <button onClick={() => setShowProductIntro(false)} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">场景说明</h3>
                  <p className="text-gray-600">在这个场景中，您将学习如何有效地向客户介绍产品，包括产品特点、优势以及如何针对客户需求进行个性化介绍。</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-800 mb-2">学习目标</h3>
                  <ul className="list-disc pl-5 text-gray-600 space-y-1">
                    <li>掌握产品核心卖点</li>
                    <li>学习有效的产品介绍技巧</li>
                    <li>提高客户沟通能力</li>
                    <li>增强产品说服力</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-between">
              <button 
                onClick={() => {
                  setShowProductIntro(false);
                  setShowScenarioPage(true);
                }} 
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                开始场景
              </button>
              <button onClick={() => setShowProductIntro(false)} className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                返回
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 场景页面模态框 */}
      {showScenarioPage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">销售角色实训场景</h2>
              <button onClick={() => setShowScenarioPage(false)} className="text-gray-500 hover:text-gray-700">×</button>
            </div>
            <div className="p-6">
              <div className="w-full h-[70vh]">
                <iframe 
                  src="https://avatargpt.cybotstar.cn/chat/h5/108/1732774021-7809/0bc24baf-6c4d-4ded-9de7-83016008b1e7" 
                  className="w-full h-full border-0 rounded-lg"
                  title="销售角色实训场景"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button onClick={() => setShowScenarioPage(false)} className="px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600">
                关闭场景
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
