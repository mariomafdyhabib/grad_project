"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { translateServerMessage } from "@/utils/utils";
import { jobCategories, jobDurations } from "@/lib/placehoder-data";

const PostJobForm = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState<number>(50);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:7000/api/jobs",
        {
          title,
          description,
          duration,
          budget,
          location,
          category,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );

      router.push("/client");
    } catch (e: any) {
      setError(e.response?.data?.message || "An error occurred");
      alert(translateServerMessage(error));
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">نشر وظيفة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">العنوان</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="عنوان الوظيفة"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">الوصف</Label>
                <Textarea
                  id="description"
                  placeholder="وصف الوظيفة"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="duration">المدة</Label>
                  <Select onValueChange={setDuration} required>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المدة" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobDurations.map((d) => (
                        <SelectItem value={d} key={d}>
                          {d}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="budget">الميزانية</Label>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="الميزانية"
                    required
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">الموقع</Label>
                <Input
                  id="location"
                  type="text"
                  placeholder="الموقع"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">الفئة</Label>
                <Select onValueChange={setCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الفئة" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobCategories.map((c) => (
                      <SelectItem value={c} key={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="bg-gradient-hover mt-4 w-full">
                نشر الوظيفة
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default PostJobForm;
