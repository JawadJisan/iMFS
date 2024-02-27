"use client";
import { getUserInfo } from "@/utils/auth.service";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Page = () => {
  const { accountType } = getUserInfo() as any;
  console.log(accountType);
  const router = useRouter();

  useEffect(() => {
    if (accountType === "admin") {
      router.push("/dashboard/admin");
    } else if (accountType === "agent") {
      router.push("/dashboard/agent");
    } else if (accountType === "user") {
      router.push("/dashboard/user");
    }
  }, [accountType, router]);

  return (
    <div className="text-center">This is the dashboard Content Layout</div>
  );
};

export default Page;
