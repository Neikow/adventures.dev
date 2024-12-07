"use server";

import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { UnauthenticatedDashboard } from "@/app/dashboard/unauthenticated";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <UnauthenticatedDashboard />;
  }

  return children;
}
