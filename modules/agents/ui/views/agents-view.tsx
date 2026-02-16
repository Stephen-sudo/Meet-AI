"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";

export const AgentsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions(),
  );

  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export const AgentsViewWithSuspense = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="Please wait while we load the agents."
    />
  );
};

const AgentsViewError = () => {
  return (
    <ErrorState
      title="Failed to Load Agents"
      description="An error occurred while loading the agents. Please try again later."
    />
  );
};

export default AgentsViewError;
