"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { translateServerMessage } from "@/utils/utils";
import { useUser } from "../contexts/user-context";

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/api/users/login",
        {
          email,
          password,
        },
      );

      const user = response.data.user;
      const token = response.headers["x-auth-token"];

      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        user.role === "client"
          ? router.push("/client")
          : router.push("/craftsman");
      }
    } catch (e: any) {
      if (e.response) {
        setError(e.response.data.message);
      }
      console.error(error);
      alert(translateServerMessage(error));
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
            <CardDescription>
              أدخل بريدك الإلكتروني أدناه لتسجيل الدخول إلى حسابك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-4">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="bg-gradient-hover w-full">
                تسجيل الدخول
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              ليس لديك حساب؟{" "}
              <Link href="/register" className="underline">
                إنشاء حساب
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default LoginForm;
