import { Dispatch, SetStateAction } from "react";

import {
  CommandInput,
  CommandResponsiveDialog,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface DashboardCommandProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}
export const DashboardCommand = ({
  open,
  setOpen,
}: DashboardCommandProps) => {
  return (
    <CommandResponsiveDialog
      open={open}
      onOpenChange={setOpen}
    >
      <CommandInput placeholder="Find a meeting or agent..." />
      <CommandList>
        <CommandItem onSelect={() => setOpen(false)}>
          Test
        </CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
