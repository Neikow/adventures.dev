import { useSession } from "next-auth/react";
import Link from "next/link";

export const Dashboard = () => {
  const { data } = useSession();
  const username = data!.user?.name;

  return (
    <div className={"h-screen p-4"}>
      <h1 className={"font-mono text-4xl font-semibold"}>Dashboard</h1>
      <p className={"font-mono text-xl"}>Hello {username} !</p>
      <main className={"border-zinc-200 mt-4 rounded-xl border p-4"}>
        <Link href={"dashboard/trips"}>Start a new Trip !</Link>
      </main>
    </div>
  );
};
