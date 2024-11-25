"use client";

import { useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";

export default function Admin() {
  const { status } = useSession();

  if (status === "loading") return <div>Loading...</div>;

  if (status === "unauthenticated") {
    return (
      <div>
        <h1>Admin</h1>
        <p>You need to sign in to access this page.</p>
        <Link href={"/api/auth/signin"}>Sign-in</Link>
      </div>
    );
  }

  return (
    <div className={"p-4"}>
      <h1 className={"text-4xl font-mono font-semibold"}>Dashboard</h1>
    </div>
  );
}
