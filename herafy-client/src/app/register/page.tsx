"use client";

import { Card, CardContent, CardTitle } from "@/components/ui/card";
import ClientRegistraionForm from "@/components/auth/ClientRegistrationForm";
import CraftsmanRegistrationForm from "@/components/auth/craftsmanRegistrationForm";
import Image from "next/image";
import { useState } from "react";

function RegisterFrom() {
  const [role, setRole] = useState<"client" | "craftsman" | null>(null);
  if (!role) {
    return (
      <div className="mx-auto mt-12 flex min-h-96 max-w-screen-md justify-center gap-4 px-4">
        <Card
          onClick={() => setRole("client")}
          className="relative h-40 w-1/2 cursor-pointer py-4 transition-all hover:scale-105"
        >
          <CardContent>
            <Image
              src="/images/client.png"
              alt=""
              width={30}
              height={30}
              className="mb-2 sm:h-14 sm:w-14"
            />
            <CardTitle>أنا عميل، توظيف</CardTitle>
            <input
              type="radio"
              value="client"
              checked={role === "client"}
              className="absolute left-2 top-2"
            />
          </CardContent>
        </Card>
        <Card
          onClick={() => setRole("craftsman")}
          className="relative h-40 w-1/2 cursor-pointer py-4 transition-all hover:scale-105"
        >
          <CardContent>
            <Image
              src="/images/client.png"
              alt=""
              width={30}
              height={30}
              className="mb-2 sm:h-14 sm:w-14"
            />
            <CardTitle>أنا حرفي ابحث عن عمل</CardTitle>
            <input
              type="radio"
              value="craftsman"
              checked={role === "craftsman"}
              className="absolute left-2 top-2"
            />
          </CardContent>
        </Card>
      </div>
    );
  }

  return role === "client" ? (
    <ClientRegistraionForm />
  ) : (
    <CraftsmanRegistrationForm />
  );
}

export default RegisterFrom;
