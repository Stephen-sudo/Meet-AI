import {
  MeetingsView,
  MeetingsViewWithSuspense,
  MeetingsViewError,
} from "@/modules/meetings/ui/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { Suspense } from "react";
import {
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
const Meetings = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({}),
  );
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsViewWithSuspense />}>
        <ErrorBoundary fallback={<MeetingsViewError />}>
          <MeetingsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Meetings;
