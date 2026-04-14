"use client";
import { Button } from "@/components/ui/button";
import React from "react";
import { NewAgentDialog } from "./new-agent-dialog";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { AgentsSearchFilter } from "./agents-search-filter";
import { DEFAULT_PAGE } from "@/constants";
import { XCircleIcon } from "lucide-react";

export const AgentsListHeader = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filters, setFilters] = useAgentsFilters();
  const isAnyFilterModified = !!filters.search;
  const clearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    });
  };

  return (
    <>
      <NewAgentDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <div className="flex flex-col gap-y-4 px-4 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <h5 className="text-xl font-medium">My Agents</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon className="mr-2" /> New Agent
          </Button>
        </div>
        <div className="flex items-center gap-x-2 p-1">
          <AgentsSearchFilter />
          {isAnyFilterModified && (
            <Button
              size="sm"
              variant="outline"
              onClick={clearFilters}
            >
              <XCircleIcon className="mr-2" /> Clear
            </Button>
          )}
        </div>
      </div>
    </>
  );
};
