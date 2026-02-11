"use client";

import { Button } from "@/components/ui/button";
import {
  SearchIcon,
  PanelLeftIcon,
  PanelLeftClose,
} from "lucide-react";

import React, { useState } from "react";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { DashboardCommand } from "./dashboard-command";
import { useEffect } from "react";
const DashboardNavbar = () => {
  const { toggleSidebar, isMobile, state } = useSidebar();
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    window.addEventListener("keydown", down);
    return () =>
      window.removeEventListener("keydown", down);
  }, []);
  return (
    <>
      <DashboardCommand
        open={commandOpen}
        setOpen={setCommandOpen}
      />
      <nav className="bg-background flex items-center gap-x-2 border-b px-4 py-3">
        <Button
          variant="outline"
          className="size-9"
          onClick={toggleSidebar}
        >
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon />
          ) : (
            <PanelLeftClose />
          )}
        </Button>
        <Button
          variant="outline"
          className={cn(
            "text-muted-foreground hover:text-muted-foreground h-9 w-[240px] justify-start",
          )}
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon />
          Search
          <kbd
            className={cn(
              "bg-muted pointer-events-none ml-auto inline-flex",
              "items-center gap-1 rounded border px-1.5 font-mono",
              "text-[10px] font-medium select-none",
            )}
          >
            <span>⌘K </span>
          </kbd>
        </Button>
      </nav>
    </>
  );
};

export default DashboardNavbar;
