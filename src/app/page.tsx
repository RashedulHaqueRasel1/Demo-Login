"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, Copy, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copiedField, setCopiedField] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError(res.error);
    } else {
      toast.success("Login successful!");
      setTimeout(() => {
        router.push("/profile");
      }, 2000);
    }
  };

  interface HandleCopyParams {
    text: string;
    field: "Email" | "Password";
  }

  const handleCopy = (text: HandleCopyParams["text"], field: HandleCopyParams["field"]) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied!`);
    setTimeout(() => setCopiedField(""), 1500);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-slate-900 via-zinc-900 to-black">
      {/* Glow blobs */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-fuchsia-600/30 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row items-center justify-center gap-8 px-4 py-10">
        
        {/* Left Side - Home Page Welcome */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center lg:text-left max-w-md"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to <span className="text-fuchsia-400">Our App</span>
          </h1>
          <p className="text-white/70 mb-6">
            Please log in to continue. You can use the demo account below to try it out instantly.
          </p>

          {/* Test Login Details */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
            <CardHeader>
              <CardTitle className="text-lg text-white">Test Login Details</CardTitle>
              <CardDescription className="text-white/70">Click to copy</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2">
                <span className="text-white text-sm">sahed.bdcalling@gmail.com</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="cursor-pointer text-white/70 hover:text-black"
                  onClick={() => handleCopy("sahed.bdcalling@gmail.com", "Email")}
                >
                  {copiedField === "Email" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4 " />
                  )}
                </Button>
              </div>
              <div className="flex items-center justify-between bg-white/10 rounded-lg px-3 py-2">
                <span className="text-white text-sm">123456</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="cursor-pointer  text-white/70 hover:text-black"
                  onClick={() => handleCopy("123456", "Password")}
                >
                  {copiedField === "Password" ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right Side - Login Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-black/40">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-fuchsia-500 to-cyan-500 shadow-lg">
                  <LogIn className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl tracking-tight text-white">
                    Login
                  </CardTitle>
                  <CardDescription className="text-sm text-white/70">
                    Enter your credentials to access your account
                  </CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-white/10 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-fuchsia-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-white">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-10 bg-white/10 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-fuchsia-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl p-2 hover:bg-white/10"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-white/70" />
                    ) : (
                      <Eye className="h-4 w-4 text-white/70" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    className="border-white/20 data-[state=checked]:bg-fuchsia-600 cursor-pointer"
                  />
                  <Label htmlFor="remember" className="text-white/80 cursor-pointer">
                    Remember me
                  </Label>
                </div>
                <Link
                  href="#"
                  className="text-sm text-fuchsia-300 hover:text-fuchsia-200"
                >
                  Forgot password?
                </Link>
              </div>

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <Button
                onClick={handleLogin}
                disabled={loading}
                className="w-full h-11 rounded-2xl bg-gradient-to-r from-fuchsia-600 to-cyan-500 text-white font-medium shadow-lg shadow-fuchsia-900/30 hover:opacity-90 cursor-pointer"
              >
                {loading ? "Logging in..." : (<><LogIn className="mr-2 h-4 w-4" /> Login</>)}
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col items-center gap-2">
              <p className="text-xs text-white/50">
                By logging in, you agree to our Terms & Privacy Policy
              </p>
            </CardFooter>
          </Card>

          <Toaster position="top-center" />
        </motion.div>
      </div>
    </div>
  );
}
