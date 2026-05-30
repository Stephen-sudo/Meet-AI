import { EmptyState } from "@/components/empty-state";

export const ProcessingState = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-8 rounded-lg bg-white px-4 py-5">
        <EmptyState
          title="Meeting is processing"
          description="The meeting is currently being processed."
          image="/processing.svg"
        />
      </div>
    </>
  );
};
