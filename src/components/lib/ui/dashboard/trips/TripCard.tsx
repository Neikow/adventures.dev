import { Trip } from "@/models/trip";
import Link from "next/link";

export function TripCard({
  trip,
  onDelete,
}: {
  trip: Trip;
  onDelete: () => void;
}) {
  const handleDelete = () => {
    const result = confirm("Are you sure you want to delete this trip?");
    if (!result) {
      return;
    }

    onDelete();
  };
  return (
    <div className="my-2 mr-2 rounded-lg border border-gray-200 bg-white p-4">
      <div className={"flex items-center justify-between"}>
        <h2 className="text-xl">
          <Link href={`/dashboard/trips/${trip.uuid}`}>{trip.name}</Link>
        </h2>
        <div className={"flex"}>
          <button className={"ml-2"} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
