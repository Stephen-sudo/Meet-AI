"use client";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog";
import { useState } from "react";

export const MeetingsListHeader = () => {
  const [
    isNewMeetingDialogOpen,
    setIsNewMeetingDialogOpen,
  ] = useState(false);
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
        <div className="flex items-center gap-x-2 p-1"></div>
      </div>
    </>
  );
};
