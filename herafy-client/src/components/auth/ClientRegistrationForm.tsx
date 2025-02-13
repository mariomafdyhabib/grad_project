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
import { useUser } from "@/app/contexts/user-context";

function ClientRegistrationForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useUser();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:7000/api/users/register",
        {
          name,
          email,
          password,
          role: "client",
        },
      );

      console.log("return value form client registration ", response.data);
      const user = response.data;
      const token = response.headers["x-auth-token"];

      if (token) {
        localStorage.setItem("token", token);
        setUser(user);
        router.push("/client");
      }
    } catch (e: any) {
      if (e.response) {
        setError(e.response.data);
        console.log(e.response.data);
      }

      alert(translateServerMessage(error));
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">إنشاء حساب</CardTitle>
            <CardDescription>
              أدخل تفاصيل حسابك لإنشاء حساب عميل
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-4">
                <Label htmlFor="name">الاسم</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-4">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
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
                إنشاء حساب
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              لديك حساب؟{" "}
              <Link href="/login" className="underline">
                تسجيل الدخول
              </Link>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}

export default ClientRegistrationForm;
