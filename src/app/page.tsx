"use client";
import React from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSession } from "next-auth/react";
import { Link } from "@/components/lib/navigation/Link";

function locationToString(location: [number, number]) {
  return `${location[1].toFixed(3)}°N ${location[0].toFixed(3)}°E`;
}

function LocationCard({
  location,
  title,
  description,
  onClick,
}: {
  location: [number, number];
  title: string;
  description: string;
  onClick: (location: [number, number]) => void;
}) {
  return (
    <button
      className={
        "border-zinc-700 hover:bg-zinc-900 my-8 rounded-md border p-2 text-start transition-all hover:-translate-y-1"
      }
      onClick={() => onClick(location)}
    >
      <h2 className={"pb-2 font-mono text-4xl font-semibold"}>{title}</h2>
      <span className={"font-mono"}>{locationToString(location)}</span>
      <p className={"text-zinc-400 pt-2"}>{description}</p>
    </button>
  );
}

export default function Home() {
  const mapRef = React.useRef<mapboxgl.Map>(null);
  const mapContainerRef = React.useRef<HTMLDivElement>(null);

  const { status } = useSession();

  React.useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN!;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current!,
      attributionControl: false,
      center: [2.3514, 48.8575],
      zoom: 5,
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  const getRandomLocation = (i: number): [number, number] => {
    return [i * 40 - 180, i * 20 - 90];
  };

  const locations = React.useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        location: getRandomLocation(i),
        title: `Location ${i}, Country ${i}`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      })),
    [],
  );

  return (
    <div className="grid h-screen grid-cols-5 font-sans">
      <main className={"col-span-2 overflow-scroll"}>
        <header className={"bg-background sticky top-0 z-50 p-4"}>
          <h1 className={"font-mono text-4xl font-semibold"}>Adventures</h1>
          <nav className={"mt-2 flex gap-8 font-mono text-xl"}>
            {status === "authenticated" && <Link href="/dashboard">Admin</Link>}
            <Link href="/trips">Trips</Link>
            <Link href="/places">Places</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>
        <div className={"p-4"}>
          {locations.map(({ location, title, description }) => (
            <LocationCard
              key={title}
              location={location}
              onClick={(location) =>
                mapRef.current?.flyTo({ center: location, zoom: 5 })
              }
              title={title}
              description={description}
            />
          ))}
        </div>
      </main>
      <div className={"col-span-3 bg-white"}>
        <div
          className={"h-full w-full"}
          id={"map-container"}
          ref={mapContainerRef}
        />
      </div>
    </div>
  );
}
