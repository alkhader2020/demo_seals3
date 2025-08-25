"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, User, Lock, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (username.trim() === "" || password.trim() === "") {
      setError("请输入用户名和密码");
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      try {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);

        if (localStorage.getItem("isLoggedIn") === "true") {
          router.push("/");
        } else {
          setError("登录失败，请重试");
        }
      } catch {
        setError("浏览器不支持本地存储，请使用较新版本的浏览器");
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-6">
      {/* الخلفية المتحركة */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-40 h-40 sm:w-64 sm:h-64 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-96 sm:h-96 bg-indigo-200/20 rounded-full blur-3xl"></div>
      </div>

      {/* بطاقة تسجيل الدخول */}
      <Card className="relative backdrop-blur-sm bg-white/95 shadow-2xl border-0 ring-1 ring-slate-200/50 w-full max-w-sm sm:max-w-md lg:max-w-lg">
        <CardHeader className="text-center pb-6 sm:pb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
              智能销售培训平台
            </CardTitle>
          </div>
          <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
          <p className="text-slate-600 mt-4 font-medium text-sm sm:text-base">
            开启您的AI驱动销售学习之旅
          </p>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-6">
          <form onSubmit={handleLogin} className="space-y-4 sm:space-y-5">
            {/* اسم المستخدم */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-xs sm:text-sm font-semibold text-slate-700">
                用户名
              </Label>
              <div
                className={`relative transition-all duration-200 ${
                  focusedField === "username" ? "scale-[1.02]" : ""
                }`}
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
                  className="pl-10 h-10 sm:h-12 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                />
              </div>
            </div>

            {/* كلمة المرور */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-xs sm:text-sm font-semibold text-slate-700">
                密码
              </Label>
              <div
                className={`relative transition-all duration-200 ${
                  focusedField === "password" ? "scale-[1.02]" : ""
                }`}
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
                  className="pl-10 pr-10 h-10 sm:h-12 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
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

            {/* رسالة الخطأ */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}

            {/* زر الدخول */}
            <Button
              type="submit"
              className="w-full h-10 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-[1.02]"
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
  );
}
