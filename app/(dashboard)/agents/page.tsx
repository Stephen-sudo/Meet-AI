import { auth } from "@/lib/auth";
import { AgentsListHeader } from "@/modules/agents/ui/components/agents-list-header";
import AgentsViewError, {
  AgentsView,
  AgentsViewWithSuspense,
} from "@/modules/agents/ui/views/agents-view";
import { getQueryClient, trpc } from "@/trpc/server";
import {
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { loadSearchParams } from "@/modules/agents/params";
import type { SearchParams } from "nuqs";

interface Props {
  searchParams: Promise<SearchParams>;
}
const Page = async ({ searchParams }: Props) => {
  const filters = await loadSearchParams(searchParams);

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getMany.queryOptions({ ...filters }),
  );
  return (
    <>
      <AgentsListHeader />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<AgentsViewWithSuspense />}>
          <ErrorBoundary
            FallbackComponent={AgentsViewError}
          >
            <AgentsView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  );
};

export default Page;
