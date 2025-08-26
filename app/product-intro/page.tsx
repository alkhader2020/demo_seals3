"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface Task {
  id: string
  title: string
  description: string
  type: "销售基础训练" | "销售角色实训"
  mode?: "选择题模式" | "开放问答模式" | "自由对话练习"
  taskType: "官方任务" | "自主任务"
}

export default function ProductIntroPage() {
  const router = useRouter()
  const [task, setTask] = useState<Task | null>(null)

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const taskId = searchParams.get("taskId")

    if (taskId) {
      const autonomousTasks = JSON.parse(localStorage.getItem("autonomousTasks") || "[]")
      const foundTask = autonomousTasks.find((t: Task) => t.id === taskId)
      if (foundTask) {
        setTask(foundTask)
      }
    }
  }, [])

  const handleStartScenario = () => {
    window.open("https://avatargpt.cybotstar.cn/chat/h5/108/1732774021-7809/0bc24baf-6c4d-4ded-9de7-83016008b1e7", "_blank")
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <button 
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            返回
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-800">产品介绍场景</h1>
            {task && <p className="text-gray-600 mt-1">任务: {task.title}</p>}
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* 左侧：用户提问款和回答款 */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-gray-50 p-5 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">场景说明</h2>
                  <p className="text-gray-600 leading-relaxed">
                    在这个场景中，您将学习如何有效地向客户介绍产品，包括产品特点、优势以及如何针对客户需求进行个性化介绍。
                    通过角色扮演和实际演练，您将掌握产品介绍的核心技巧，提高销售转化率。
                  </p>
                </div>

                <div className="bg-blue-50 p-5 rounded-lg">
                  <h2 className="text-xl font-semibold text-gray-800 mb-3">学习目标</h2>
                  <ul className="list-disc pl-5 text-gray-600 space-y-2">
                    <li>掌握产品核心卖点</li>
                    <li>学习有效的产品介绍技巧</li>
                    <li>提高客户沟通能力</li>
                    <li>增强产品说服力</li>
                    <li>根据客户类型调整介绍策略</li>
                  </ul>
                </div>
              </div>

              {/* 右侧：陪练提醒款 */}
              <div className="bg-yellow-50 p-5 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">💡 陪练提醒</h2>
                <ol className="list-decimal pl-5 text-gray-600 space-y-2">
                  <li>了解客户背景和需求</li>
                  <li>分析产品与客户需求的匹配点</li>
                  <li>准备产品介绍的关键点</li>
                  <li>进行产品介绍演示</li>
                  <li>处理客户疑问和异议</li>
                  <li>总结产品优势并促成下一步行动</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-between">
            <button 
              onClick={handleStartScenario}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              开始场景
            </button>
            <button 
              onClick={handleBack}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
            >
              返回
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
