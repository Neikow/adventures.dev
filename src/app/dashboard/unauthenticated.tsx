import Link from "next/link";
import React from "react";

export const UnauthenticatedDashboard = () => {
  return (
    <div>
      <h1>Admin</h1>
      <p>You need to sign in to access this page.</p>
      <Link href={"/api/auth/signin"}>Sign-in</Link>
    </div>
  );
};
