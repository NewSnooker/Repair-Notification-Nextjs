/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

export default function PasswordInput({
  field,
  id,
  placeholder,
  autoComplete,
}: {
  field: any;
  id: string;
  placeholder?: string;
  autoComplete?: string;
}) {
  const [passType, setPassType] = useState("password");

  return (
    <div className="relative w-full">
      <Input
        id={id}
        type={passType}
        placeholder={placeholder || "******"}
        {...field}
        autoComplete={autoComplete || "current-password"}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() =>
          setPassType(passType === "password" ? "text" : "password")
        }
        className="absolute inset-y-0 right-3 flex items-center"
      >
        {passType === "password" ? (
          <Eye className="w-4 h-4 text-gray-600" />
        ) : (
          <EyeOff className="w-4 h-4 text-gray-600" />
        )}
      </button>
    </div>
  );
}
