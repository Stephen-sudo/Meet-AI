import { trpc, getQueryClient } from "@/trpc/server";
import { ErrorBoundary } from "react-error-boundary";
import {
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";
import {
  AgentsIdView,
  AgentsIdViewError,
  AgentsIdViewLoading,
} from "@/modules/agents/ui/views/agents-id-view";

interface Props {
  params: Promise<{ agentId: string }>;
}

const Page = async ({ params }: Props) => {
  const { agentId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ErrorBoundary fallback={<AgentsIdViewError />}>
        <Suspense fallback={<AgentsIdViewLoading />}>
          <AgentsIdView agentId={agentId} />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  );
};

export default Page;
