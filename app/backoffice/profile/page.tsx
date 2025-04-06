import ProfileForm from "@/components/Form/ProfileForm";
import React from "react";

export default function page() {
  return (
    <div className="flex  w-full items-center justify-center ">
      <div className="w-full max-w-sm">
        <ProfileForm />
      </div>
    </div>
  );
}
