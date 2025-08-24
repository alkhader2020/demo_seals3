"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, User, Lock, Sparkles } from "lucide-react"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const router = useRouter()

  // 检测是否为移动设备
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // 初始检查
    checkIfMobile()
    
    // 添加窗口大小变化监听
    window.addEventListener("resize", checkIfMobile)
    
    // 清理监听器
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (username.trim() === "" || password.trim() === "") {
      setError("请输入用户名和密码")
      setIsLoading(false)
      return
    }

    try {
      // Simulate login process
      setTimeout(() => {
        // 确保localStorage操作成功
        try {
          localStorage.setItem("isLoggedIn", "true")
          localStorage.setItem("username", username)

          // 验证设置是否成功
          const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
          if (isLoggedIn) {
            router.push("/")
          } else {
            setError("登录失败，请重试")
          }
        } catch (storageError) {
          console.error("localStorage error:", storageError)
          setError("浏览器不支持本地存储，请使用较新版本的浏览器")
        }
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Login error:", error)
      setError("登录过程中发生错误，请重试")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      <Card className={`relative backdrop-blur-sm bg-white/95 shadow-2xl border-0 ring-1 ring-slate-200/50 ${isMobile ? "w-full max-w-sm mx-2" : "w-full max-w-md"}`}>
        <CardHeader className={`text-center ${isMobile ? "pb-6" : "pb-8"}`}>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <CardTitle className={`${isMobile ? "text-xl" : "text-2xl"} font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent`}>
              智能销售培训平台
            </CardTitle>
          </div>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
          <p className={`text-slate-600 mt-4 font-medium ${isMobile ? "text-sm" : ""}`}>开启您的AI驱动销售学习之旅</p>
        </CardHeader>

        <CardContent className={`space-y-${isMobile ? "4" : "6"}`}>
          <form onSubmit={handleLogin} className={`space-y-${isMobile ? "4" : "5"}`}>
            <div className="space-y-2">
              <Label htmlFor="username" className={`text-sm font-semibold text-slate-700 ${isMobile ? "text-xs" : ""}`}>
                用户名
              </Label>
              <div
                className={`relative transition-all duration-200 ${focusedField === "username" ? "scale-[1.02]" : ""}`}
              >
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="请输入用户名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setFocusedField("username")}
                  onBlur={() => setFocusedField(null)}
                  disabled={isLoading}
                  className={`pl-10 ${isMobile ? "h-10" : "h-12"} border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className={`text-sm font-semibold text-slate-700 ${isMobile ? "text-xs" : ""}`}>
                密码
              </Label>
              <div
                className={`relative transition-all duration-200 ${focusedField === "password" ? "scale-[1.02]" : ""}`}
              >
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="请输入密码"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  disabled={isLoading}
                  className={`pl-10 pr-10 ${isMobile ? "h-10" : "h-12"} border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className={`w-full ${isMobile ? "h-10" : "h-12"} bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  登录中...
                </div>
              ) : (
                "立即登录"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
