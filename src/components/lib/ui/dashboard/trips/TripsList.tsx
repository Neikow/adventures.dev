"use client";

import {
  InfiniteScroll,
  InfiniteScrollRef,
  LoadMoreFunction,
} from "@/components/lib/ui/lists/InfiniteScroll";
import { getTrips } from "@/app/dashboard/actions";
import { TripCard } from "@/components/lib/ui/dashboard/trips/TripCard";
import { Trip, TripSchema } from "@/models/trip";
import React from "react";

export function TripsList() {
  const loadMore: LoadMoreFunction<TripSchema> = async (offset, limit) => {
    return getTrips(offset, limit);
  };
  const ref = React.useRef<InfiniteScrollRef>(null);

  return (
    <div className={"flex min-h-0 flex-1 flex-col"}>
      <InfiniteScroll
        ref={ref}
        renderItem={(data, index) => {
          return (
            <TripCard
              key={`trip-${index}`}
              onDelete={() => ref.current?.remove(index)}
              trip={Trip.fromORM(data)}
            />
          );
        }}
        pageSize={10}
        loadMore={loadMore}
      />
    </div>
  );
}
