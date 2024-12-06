"use client";

import { useSession } from "next-auth/react";
import React from "react";
import { Loading } from "@/components/lib/ui/loading/PageLoading";
import { UnauthenticatedDashboard } from "@/app/dashboard/unauthenticated";
import { Dashboard } from "./dashboard";

export default function Admin() {
  const { status } = useSession();

  if (status === "loading") return <Loading />;

  if (status === "unauthenticated") {
    return <UnauthenticatedDashboard />;
  }

  return <Dashboard />;
}
