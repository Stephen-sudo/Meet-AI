import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon, BanIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  meetingId: string;
  onCancelMeeting: () => void;
  isCancelled: boolean;
}
export const UpcomingState = ({
  meetingId,
  onCancelMeeting,
  isCancelled,
}: Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
      <EmptyState
        title="Not Started Yet"
        description="Once you start a meeting, it will appear here."
        image="/upcoming.svg"
      />
      <div className="flex w-full flex-col-reverse items-center gap-2 lg:flex-row lg:justify-center">
        <Button
          variant="secondary"
          className="w-full lg:w-auto"
          onClick={onCancelMeeting}
          disabled={isCancelled}
        >
          <BanIcon /> Cancel Meeting
        </Button>
        <Button
          disabled={isCancelled}
          asChild
          className="w-full lg:w-auto"
        >
          <Link href={`/call/${meetingId}`}>
            {" "}
            <VideoIcon /> Start Meeting
          </Link>
        </Button>
      </div>
    </div>
  );
};
