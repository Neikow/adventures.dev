import type { Metadata } from "next";
import { BackButton } from "@/components/lib/navigation/BackButton";
import { DashboardWrapper } from "@/components/lib/ui/dashboard/DashboardWrapper";
import React from "react";
import { TripCreation } from "@/components/lib/ui/dashboard/trips/TripCreation";

export const metadata: Metadata = {
  title: "Create a new trip",
  description: "My adventures around the world",
};

export default function CreateTripPage() {
  return (
    <DashboardWrapper
      topNavigation={<BackButton />}
      title={"Create a new trip"}
    >
      <TripCreation />
    </DashboardWrapper>
  );
}
