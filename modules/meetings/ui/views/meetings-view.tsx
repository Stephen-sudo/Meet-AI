"use client";
import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const MeetingsView = () => {
  const trpc = useTRPC();

  const { data } = useSuspenseQuery(
    trpc.meetings.getMany.queryOptions({}),
  );

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable data={data.items} columns={columns} />
      {data.items.length === 0 && (
        <EmptyState
          title="Create your first Meeting"
          description="Create a new meeting to connect with others. Each meeting will follow the instructions and can interact with participants."
        />
      )}
    </div>
  );
};

export const MeetingsViewWithSuspense = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="Please wait while we load the meetings."
    />
  );
};

export const MeetingsViewError = () => {
  return (
    <ErrorState
      title="Failed to Load Meetings"
      description="An error occurred while loading the meetings. Please try again later."
    />
  );
};

export default MeetingsViewError;
