"use client";
import React, { useEffect, useState } from "react";
import AuthenticatedAvatar from "./AuthenticatedAvatar";

export default function Navbar() {
  const [name, setName] = useState<string>("");
  const [level, setLevel] = useState<string>("");

  useEffect(() => {
    setName(localStorage.getItem("bun_service_name") || "");
    setLevel(localStorage.getItem("bun_service_level") || "");
  }, []);
  return (
    <div className="flex justify-end p-4 bg-zinc-100 border-b">
      <AuthenticatedAvatar name={name} level={level} />
    </div>
  );
}
