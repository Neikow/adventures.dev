import type { Metadata } from "next";
import { BackButton } from "@/components/lib/navigation/BackButton";
import { TripCreation } from "@/app/dashboard/trips/TripCreation";

export const metadata: Metadata = {
  title: "Create a new trip",
  description: "My adventures around the world",
};

export default function CreateTripPage() {
  return (
    <div>
      <div>Create Trip</div>
      <BackButton />
      <TripCreation />
    </div>
  );
}
