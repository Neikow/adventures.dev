// import { Link } from "@/components/lib/navigation/Link";
import React from "react";
import { DashboardWrapper } from "@/components/lib/ui/dashboard/DashboardWrapper";
import { Link } from "@/components/lib/navigation/Link";
import { TripsList } from "@/components/lib/ui/dashboard/trips/TripsList";

export function Dashboard() {
  return (
    <DashboardWrapper
      topNavigation={<Link href={"/"}>{"< Go Home"}</Link>}
      title={"Dashboard"}
    >
      <Link href={"dashboard/trips"}>Start a new Trip !</Link>
      <TripsList />
    </DashboardWrapper>
  );
}
