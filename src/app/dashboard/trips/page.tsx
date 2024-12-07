import type { Metadata } from "next";
import { BackButton } from "@/components/lib/navigation/BackButton";
import { TripCreation } from "@/app/dashboard/trips/TripCreation";
import { DashboardWrapper } from "@/components/lib/ui/dashboard/wrapper";

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
