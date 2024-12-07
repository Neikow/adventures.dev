import React from "react";
import { Link } from "@/components/lib/navigation/Link";

export const UnauthenticatedDashboard = () => {
  return (
    <div>
      <h1>Admin</h1>
      <p>You need to sign in to access this page.</p>
      <Link href={"/api/auth/signin"}>Sign-in</Link>
    </div>
  );
};
