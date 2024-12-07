"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { PageLoading } from "@/components/lib/ui/loading/PageLoading";
import { Dashboard } from "./dashboard";

export default function DashboardPage() {
  const { status } = useSession();

  if (status === "loading") return <PageLoading />;

  return <Dashboard />;
}
