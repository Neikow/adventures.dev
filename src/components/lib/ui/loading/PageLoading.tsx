import { Spinner } from "@/components/lib/ui/loading/Spinner";

export const PageLoading = () => {
  return (
    <div className={"flex h-screen w-screen items-center justify-center"}>
      <Spinner className={"h-12 w-12"} />
    </div>
  );
};
