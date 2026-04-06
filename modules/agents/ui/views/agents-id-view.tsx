"use client";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { AgentsIdViewHeader } from "../components/agents-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";

interface Props {
  agentId: string;
}

export const AgentsIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId }),
  );
  return (
    <div className="flex flex-1 flex-col gap-y-4 px-4 py-4 md:px-8">
      <AgentsIdViewHeader
        agentId={data.id}
        agentName={data.name}
        onEdit={() => {}}
        onRemove={() => {}}
      />
      <div className="rounded-lg border bg-white">
        <div className="col-span-5 flex flex-col gap-y-5 px-4 py-5">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              className="size-10"
              variant="botttsNeutral"
              seed={data.name}
            />
            <h2 className="text-2xl font-medium">
              {data.name}
            </h2>
          </div>
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 [&>svg]:size-4"
          >
            <VideoIcon className="text-blue-700" />
            {data.meetingCount}{" "}
            {data.meetingCount === 1
              ? "Meeting"
              : "Meetings"}
          </Badge>
          <div className="gap-y- flex flex-col">
            <p className="text-lg font-medium">
              Instructions
            </p>
            <p className="text-neutral-800">
              {data.instructions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export const AgentsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agent"
      description="Please wait while we load the agent."
    />
  );
};

export const AgentsIdViewError = () => {
  return (
    <ErrorState
      title="Error loading Agent"
      description="An error occurred while loading the agent. Please try again later."
    />
  );
};
