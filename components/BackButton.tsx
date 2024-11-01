"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      className="absolute top-4 left-4 p-2"
      onClick={() => router.push("/")}
    >
      <ArrowLeft className="w-5 h-5" />
    </Button>
  );
}