"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SendProposalForm = ({ params }: { params: { id: string } }) => {
  const { id: jobId } = params;
  console.log(jobId);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [proposedBudget, setProposedBudget] = useState<number>(50);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:7000/api/proposals",
        {
          jobId,
          message,
          proposedBudget,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        },
      );

      router.push("/craftsman");
    } catch (e: any) {
      if (!e.response) {
        // Network error
        setError("A network error occurred. Please try again.");
      } else if (e.response.status === 401 || e.response.status === 403) {
        // Unauthorized or Forbidden
        window.location.href = "/";
      } else {
        // Other errors
        setError(e.response?.data?.message || "An error occurred");
      }
    }
  };

  return (
    <div className="p-8">
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <CardTitle className="text-2xl">إرسال عرض</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="message">العرض</Label>
                <Textarea
                  id="message"
                  placeholder="اكتب عرضك هنا"
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="proposedBudget">الميزانية المقترحة</Label>
                <Input
                  id="proposedBudget"
                  min={50}
                  type="number"
                  placeholder="الميزانية المقترحة"
                  required
                  value={proposedBudget}
                  onChange={(e) => setProposedBudget(Number(e.target.value))}
                />
              </div>
              {/* {error && <div className="text-red-500">{error}</div>} */}
              <Button type="submit" className="bg-gradient-hover mt-4 w-full">
                إرسال العرض
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default SendProposalForm;
