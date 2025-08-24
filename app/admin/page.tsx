"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Settings, Users, Eye, Edit, Trash2, BookOpen, X } from "lucide-react"

/* ===================== Helpers & Types ===================== */
type KnowledgeItem = {
  id: number
  title: string
  category: string
  type: string
  uploadDate: string
  size: string
  downloads: number
  status: "published" | "draft"
}

function kindFromExt(name: string): "PPT" | "Word" | "Excel" | "文件" {
  const ext = name.split(".").pop()?.toLowerCase() || ""
  if (["ppt", "pptx"].includes(ext)) return "PPT"
  if (["doc", "docx"].includes(ext)) return "Word"
  if (["xls", "xlsx"].includes(ext)) return "Excel"
  return "文件"
}
function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + "MB"
  if (bytes >= 1024) return (bytes / 1024).toFixed(0) + "KB"
  return bytes + "B"
}
function today() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${mm}-${dd}`
}
/* =========================================================== */

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState<"projects" | "knowledge" | "users">("projects")
  const [showCreateProject, setShowCreateProject] = useState(false)
  const [showCreateKnowledge, setShowCreateKnowledge] = useState(false)
  const [editingKnowledge, setEditingKnowledge] = useState<number | null>(null)

  // نموذج الرفع (العنوان/الوصف/الملف)
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState<{ title?: string; file?: string }>({})

  // بيانات المشاريع (تجريبية)
  const projects = [
    { id: 1, name: "赛博坦防火墙销售培训", description: "针对新产品的销售技能培训", status: "active", participants: 45, completionRate: 78, createdDate: "2024-01-10", visibility: "all" },
    { id: 2, name: "异议处理专项训练", description: "提升销售人员异议处理能力", status: "draft", participants: 0, completionRate: 0, createdDate: "2024-01-15", visibility: "sales" },
    { id: 3, name: "客户谈判技巧培训", description: "高级销售谈判策略与技巧", status: "completed", participants: 32, completionRate: 95, createdDate: "2023-12-20", visibility: "senior" },
  ]

  // ⬇️ حولناها إلى state حتى نضيف الملفات الجديدة مباشرةً
  const [knowledgeList, setKnowledgeList] = useState<KnowledgeItem[]>([
    { id: 1, title: "赛博坦防火墙产品手册", category: "产品知识", type: "PDF",  uploadDate: "2024-01-10", size: "2.4MB",  downloads: 45, status: "published" },
    { id: 2, title: "销售异议处理技巧",   category: "销售技巧", type: "PPT",  uploadDate: "2024-01-15", size: "125MB", downloads: 32, status: "published" },
    { id: 3, title: "客户谈判案例集",     category: "案例分析", type: "Word", uploadDate: "2024-01-20", size: "1.8MB",  downloads: 28, status: "draft" },
  ])

  const handleCreateProject = () => {
    alert("项目创建成功！")
    setShowCreateProject(false)
  }

  // اختيار ملف
  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
    if (file) setErrors((s) => ({ ...s, file: undefined }))
  }
  const clearSelectedFile = () => setSelectedFile(null)

  // رفع الملف (مع التحقق + إضافة إلى القائمة)
  const handleCreateKnowledge = async () => {
    const newErrors: typeof errors = {}
    if (!title.trim()) newErrors.title = "请输入资料标题"
    if (!selectedFile) newErrors.file = "请先选择一个文件（PPT/Word/Excel）"
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    try {
      setUploading(true)

      // هنا لاحقًا ممكن تضيف API حقيقي لرفع الملف:
      // const form = new FormData()
      // form.append("title", title)
      // form.append("desc", desc)
      // form.append("file", selectedFile!)
      // await fetch("/api/knowledge/upload", { method: "POST", body: form })

      await new Promise((r) => setTimeout(r, 800)) // محاكاة رفع

      const newItem: KnowledgeItem = {
        id: Date.now(),
        title: title.trim(),
        category: "产品知识", // بإمكانك تحويله لاحقًا لاختيار من Select
        type: kindFromExt(selectedFile!.name),
        uploadDate: today(),
        size: formatSize(selectedFile!.size),
        downloads: 0,
        status: "published",
      }

      setKnowledgeList(prev => [newItem, ...prev]) // أضفه أعلى القائمة

      // 保存到localStorage
      localStorage.setItem("knowledgeBase", JSON.stringify([newItem, ...knowledgeList]))

      // 触发自定义事件，通知其他页面知识库已更新
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("knowledgeBaseUpdated"))
      }

      alert("知识库内容创建成功！")

      // إعادة الضبط
      setShowCreateKnowledge(false)
      setTitle("")
      setDesc("")
      setSelectedFile(null)
      setErrors({})
    } catch {
      alert("上传失败，请稍后重试")
    } finally {
      setUploading(false)
    }
  }

  const handleEditKnowledge = (id: number) => setEditingKnowledge(id)
  const handleUpdateKnowledge = () => {
    alert("知识库内容更新成功！")
    setEditingKnowledge(null)
  }
  const handleCancelEdit = () => setEditingKnowledge(null)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回首页
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-foreground">👨‍💼 管理员后台</h1>
            </div>

            {/* الترتيب: 项目管理 → 知识库管理 → 用户管理 */}
            <div className="flex space-x-2">
              <Button variant={selectedTab === "projects" ? "default" : "outline"} onClick={() => setSelectedTab("projects")}>
                <Settings className="w-4 h-4 mr-2" />
                项目管理
              </Button>
              <Button variant={selectedTab === "knowledge" ? "default" : "outline"} onClick={() => setSelectedTab("knowledge")}>
                <BookOpen className="w-4 h-4 mr-2" />
                知识库管理
              </Button>
              <Button variant={selectedTab === "users" ? "default" : "outline"} onClick={() => setSelectedTab("users")}>
                <Users className="w-4 h-4 mr-2" />
                用户管理
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* 项目管理 */}
        {selectedTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">陪练项目管理</h2>
              <div className="flex space-x-2">
              </div>
            </div>

            {showCreateProject && (
              <Card>
                <CardHeader>
                  <CardTitle>创建新项目</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">项目名称</label>
                    <Input placeholder="输入项目名称" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">项目描述</label>
                    <Textarea placeholder="输入项目描述" rows={3} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">可见人群</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择可见人群" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">全体员工</SelectItem>
                          <SelectItem value="sales">销售部门</SelectItem>
                          <SelectItem value="senior">高级销售</SelectItem>
                          <SelectItem value="custom">自定义</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">分组逻辑</label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="选择分组方式" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="department">按部门分组</SelectItem>
                          <SelectItem value="random">随机分组</SelectItem>
                          <SelectItem value="manual">手动分组</SelectItem>
                          <SelectItem value="none">不分组</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handleCreateProject}>创建项目</Button>
                    <Button variant="outline" onClick={() => setShowCreateProject(false)}>
                      取消
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg">{project.name}</h3>
                          <Badge variant={project.status === "active" ? "default" : project.status === "draft" ? "secondary" : "outline"}>
                            {project.status === "active" ? "进行中" : project.status === "draft" ? "草稿" : "已完成"}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-4">{project.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div><p className="text-muted-foreground">参与人数</p><p className="font-semibold">{project.participants}</p></div>
                          <div><p className="text-muted-foreground">完成率</p><p className="font-semibold">{project.completionRate}%</p></div>
                          <div><p className="text-muted-foreground">创建日期</p><p className="font-semibold">{project.createdDate}</p></div>
                          <div><p className="text-muted-foreground">可见范围</p><p className="font-semibold">{project.visibility === "all" ? "全体" : project.visibility === "sales" ? "销售部" : "高级销售"}</p></div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline"><Eye className="w-4 h-4" /></Button>
                        <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
                        <Button size="sm" variant="outline"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* 用户管理 */}
        {selectedTab === "users" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">用户权限管理</h2>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">用户管理功能</h3>
                  <p className="text-muted-foreground">用户角色分配、权限设置、部门管理等功能正在开发中</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* 知识库管理 */}
        {selectedTab === "knowledge" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">知识库管理</h2>
              <Button onClick={() => setShowCreateKnowledge(true)}>
                <Plus className="w-4 h-4 mr-2" />
                上传资料
              </Button>
            </div>

            {showCreateKnowledge && (
              <Card>
                <CardHeader>
                  <CardTitle>上传新资料</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-bold mb-2 block">资料标题</label>
                    <Input
                      value={title}
                      onChange={(e) => { setTitle(e.target.value); if (errors.title) setErrors((s) => ({ ...s, title: undefined })) }}
                      placeholder="输入资料标题"
                    />
                    {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title}</p>}
                  </div>

                  <div>
                    <label className="text-sm font-bold mb-2 block">资料描述</label>
                    <Textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="输入资料描述"
                      rows={3}
                    />
                  </div>

                  {/* 上传文件 */}
                  <div>
                    <label className="text-sm font-bold mb-2 block">上传文件</label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <p className="text-muted-foreground mb-4">支持导入 PPT、Word、Excel 文件</p>

                      <input
                        id="uploadFile"
                        type="file"
                        accept=".ppt,.pptx,.doc,.docx,.xls,.xlsx"
                        className="hidden"
                        onChange={handleFileChange}
                      />

                      <label
                        htmlFor="uploadFile"
                        className="cursor-pointer inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                      >
                        点击上传
                      </label>

                      {selectedFile && (
                        <div className="mt-3 flex items-center justify-center gap-2 text-sm">
                          <span className="text-muted-foreground">已选择：</span>
                          <span className="font-medium text-foreground truncate max-w-[240px]">{selectedFile.name}</span>
                          <Button variant="ghost" size="sm" onClick={clearSelectedFile} className="h-7 px-2">
                            <X className="w-4 h-4" />
                            <span className="ml-1">移除</span>
                          </Button>
                        </div>
                      )}

                      {errors.file && <p className="mt-2 text-xs text-red-500">{errors.file}</p>}
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end mt-6">
                    <Button onClick={handleCreateKnowledge} className="px-6" disabled={uploading}>
                      {uploading ? "上传中…" : (<><Plus className="w-4 h-4 mr-2" /> 上传资料</>)}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowCreateKnowledge(false)
                        setTitle("")
                        setDesc("")
                        setSelectedFile(null)
                        setErrors({})
                      }}
                    >
                      取消
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {knowledgeList.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg">{item.title}</h3>
                          <Badge variant={item.status === "published" ? "default" : "secondary"}>
                            {item.status === "published" ? "已发布" : "草稿"}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div><p className="text-muted-foreground">类型</p><p className="font-semibold">{item.type}</p></div>
                          <div><p className="text-muted-foreground">上传日期</p><p className="font-semibold">{item.uploadDate}</p></div>
                          <div><p className="text-muted-foreground">文件大小</p><p className="font-semibold">{item.size}</p></div>
                          <div><p className="text-muted-foreground">使用次数</p><p className="font-semibold">{item.downloads}</p></div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline"><Eye className="w-4 h-4" /></Button>
                        <Button size="sm" variant="outline"><Edit className="w-4 h-4" /></Button>
                        <Button size="sm" variant="outline"><Trash2 className="w-4 h-4" /></Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
