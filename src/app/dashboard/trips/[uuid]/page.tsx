import { notFound } from "next/navigation";
import { db } from "@/db";
import { trips } from "@/db/schema/trip";
import { eq } from "drizzle-orm";
import { DashboardWrapper } from "@/components/lib/ui/dashboard/wrapper";
import { BackButton } from "@/components/lib/navigation/BackButton";
import { Link } from "@/components/lib/navigation/Link";

type ManageTripProps = { params: Promise<{ uuid: string }> };

async function getTrip(uuid: string) {
  const trip = await db
    .select()
    .from(trips)
    .where(eq(trips.uuid, uuid))
    .limit(1);
  if (!trip || trip.length === 0) notFound();
  return trip[0];
}

export async function generateMetadata({ params }: ManageTripProps) {
  const { name } = await getTrip((await params).uuid);

  return {
    title: `${name} - Editing`,
  };
}

export default async function Page({ params }: ManageTripProps) {
  const { name } = await getTrip((await params).uuid);

  return (
    <DashboardWrapper
      topNavigation={<Link href={"/dashboard"} />}
      hideGreeting
      title={name}
    >
      <div></div>
    </DashboardWrapper>
  );
}
