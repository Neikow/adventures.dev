"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import { useInView } from "react-intersection-observer";
import { Spinner } from "@/components/lib/ui/loading/Spinner";

export type LoadMoreFunction<T> = (
  offset: number,
  limit: number,
) => Promise<{ items: T[]; hasMore: boolean }>;

export interface InfiniteScrollProps<T> {
  renderItem: (data: T, index: number, items: T[]) => React.ReactNode;
  direction?: "vertical" | "horizontal";
  pageSize: number;
  loadMore: LoadMoreFunction<T>;
}

export interface InfiniteScrollRef {
  scrollToStart: () => void;
  remove: (index: number) => void;
}

function InfiniteScrollInner<T>(
  {
    loadMore,
    renderItem,
    direction = "vertical",
    pageSize,
  }: InfiniteScrollProps<T>,
  ref: React.ForwardedRef<InfiniteScrollRef>,
) {
  const [items, setItems] = React.useState<T[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  const { ref: intersectionRef, inView } = useInView();

  React.useImperativeHandle(ref, () => ({
    scrollToStart: () => {
      scrollContainerRef.current?.scrollTo(0, 0);
    },
    remove: (index) => {
      setItems((items) => {
        const newItems = [...items];
        newItems.splice(index, 1);
        return newItems;
      });
    },
  }));

  const handleLoadMore = React.useCallback(async () => {
    const { items: newItems, hasMore: newHasMore } = await loadMore(
      items.length,
      pageSize,
    );
    setItems([...items, ...newItems]);
    setHasMore(newHasMore);
  }, [items, loadMore, pageSize]);

  React.useEffect(() => {
    if (hasMore && inView && !isLoading) {
      setIsLoading(true);
      handleLoadMore().then(() => {
        setIsLoading(false);
      });
    }
  }, [handleLoadMore, hasMore, inView, isLoading, items, loadMore, pageSize]);

  if (direction === "horizontal") {
    return <div>Not implemented</div>;
  }

  return (
    <div
      ref={scrollContainerRef}
      className={twMerge("h-full flex-col overflow-scroll")}
    >
      {items.map((item, index) => renderItem(item, index, items))}
      {hasMore && (
        <div
          className={"flex items-center justify-center"}
          ref={intersectionRef}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
}

export const InfiniteScroll = React.forwardRef<
  InfiniteScrollRef,
  InfiniteScrollProps<unknown>
>(InfiniteScrollInner) as <T>(
  props: InfiniteScrollProps<T> & { ref?: React.Ref<InfiniteScrollRef> },
) => React.ReactElement;
