"use client";
import { useRef, useEffect, useMemo } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useSession } from "next-auth/react";
import Link from "next/link";

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
        "my-8 p-2 border border-zinc-700 text-start rounded-md transition-all hover:bg-zinc-900 hover:-translate-y-1"
      }
      onClick={() => onClick(location)}
    >
      <h2 className={"text-4xl font-semibold font-mono pb-2"}>{title}</h2>
      <span className={"font-mono"}>{locationToString(location)}</span>
      <p className={"text-zinc-400 pt-2"}>{description}</p>
    </button>
  );
}

export default function Home() {
  const mapRef = useRef<mapboxgl.Map>();
  const mapContainerRef = useRef<HTMLDivElement>(null);

  const { status } = useSession();

  useEffect(() => {
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

  const getRandomLocation = (): [number, number] => {
    return [Math.random() * 360 - 180, Math.random() * 180 - 90];
  };

  const locations = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        location: getRandomLocation(),
        title: `Location ${i}, Country ${i}`,
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.`,
      })),
    [],
  );

  return (
    <div className="grid grid-cols-5 h-screen font-sans">
      <main className={"col-span-2 overflow-scroll"}>
        <header className={"sticky p-4 top-0 z-50 bg-background"}>
          <h1 className={"text-4xl font-mono font-semibold"}>Adventures</h1>
          <nav className={"flex gap-8 font-mono text-xl mt-2"}>
            {status === "authenticated" && (
              <Link className={"hover:underline"} href={"/admin"}>
                Admin
              </Link>
            )}
            <Link className={"hover:underline"} href="/trips">
              Trips
            </Link>
            <Link className={"hover:underline"} href={"/places"}>
              Places
            </Link>
            <Link className={"hover:underline"} href="/gallery">
              Gallery
            </Link>
            <Link className={"hover:underline"} href="/about">
              About
            </Link>
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
