"use client";

import { useRouter } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { LoadingState } from "@/components/loading-state";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";

export const AgentsView = () => {
  const router = useRouter();
  const [filters, setFilters] = useAgentsFilters();
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getMany.queryOptions({
      ...filters,
    }),
  );

  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 pb-4 md:px-8">
      <DataTable
        columns={columns}
        data={data.items}
        onRowClick={(row) =>
          router.push(`/agents/${row.id}`)
        }
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPages}
        onPageChange={(page) =>
          setFilters({ ...filters, page })
        }
      />
      {data.items.length === 0 && (
        <EmptyState
          title="No Agents Found"
          description="Create a new agent to get started. Each agent will follow the instructions and can interact with participants in meetings."
        />
      )}
    </div>
  );
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
