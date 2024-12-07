export default async function Page({
  params,
}: {
  params: Promise<{ trip: string }>;
}) {
  const trip = (await params).trip;

  return <div>Page {trip}</div>;
}
