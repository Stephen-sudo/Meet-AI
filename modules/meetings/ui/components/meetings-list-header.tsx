"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";
import { MeetingsSearchFilter } from "./agents-search-filter";
import { StatusFilter } from "./status-filter";
import { AgentsIdFilter } from "./agents-id-filter";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import {
  ScrollArea,
  ScrollBar,
} from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";

export const MeetingsListHeader = () => {
  const [
    isNewMeetingDialogOpen,
    setIsNewMeetingDialogOpen,
  ] = useState(false);

  const [filters, setFilters] = useMeetingsFilters();
  const isAnyFilterModified =
    !!filters.search ||
    !!filters.status ||
    !!filters.agentId;
  const onClearFilters = () => {
    setFilters({
      search: "",
      agentId: "",
      page: DEFAULT_PAGE,
      status: null,
    });
  };

  return (
    <>
      <NewMeetingDialog
        open={isNewMeetingDialogOpen}
        onOpenChange={setIsNewMeetingDialogOpen}
      />
      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium"> Meetings</h5>
          <Button
            onClick={() => setIsNewMeetingDialogOpen(true)}
          >
            <PlusIcon className="mr-2" /> New Meeting
          </Button>
        </div>

        <ScrollArea>
          <div className="flex items-center gap-x-2 p-1">
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentsIdFilter />
            {isAnyFilterModified && (
              <Button
                variant="outline"
                onClick={onClearFilters}
              >
                <XCircleIcon className="text-destructive size-4" />{" "}
                Clear
              </Button>
            )}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  );
};
