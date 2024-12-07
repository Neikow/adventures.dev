"use client";

import React from "react";
import { useSession } from "next-auth/react";

export function DashboardWrapper({
  title,
  children,
  topNavigation,
  hideGreeting,
}: {
  title: string;
  children: React.ReactNode;
  topNavigation?: React.ReactNode;
  hideGreeting?: boolean;
}) {
  const { data } = useSession();
  const username = data?.user?.name;

  return (
    <div className={"flex h-screen flex-col p-4"}>
      <h1 className={"font-mono text-4xl font-semibold"}>{title}</h1>
      {topNavigation}
      {!hideGreeting && (
        <p className={"font-mono text-xl"}>Hello {username} !</p>
      )}
      <main className={"border-zinc-200 mt-8 h-full rounded-xl border p-4"}>
        {children}
      </main>
    </div>
  );
}
