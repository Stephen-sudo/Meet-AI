import { ReactNode, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { ChevronsDownIcon } from "lucide-react";

interface CommandSelectProps {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  value?: string;
  isSearchable?: boolean;
  className?: string;
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  placeholder = "Select an option",
  value,
  className,
}: CommandSelectProps) => {
  const [open, setOpen] = useState(false);

  const selectedOption = options.find(
    (option) => option.value === value,
  );

  return (
    <>
      <Button
        variant="outline"
        type="button"
        className={cn(
          "h-9 justify-between px-2 font-normal",
          !selectedOption && "text-muted-foreground",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronsDownIcon />
        <CommandResponsiveDialog
          shouldFilter={!onSearch}
          open={open}
          onOpenChange={setOpen}
        >
          <CommandInput
            onValueChange={onSearch}
            placeholder="Search..."
          />
          <CommandList>
            <CommandEmpty>
              <span className="text-muted-foreground text-sm">
                No results found.
              </span>
            </CommandEmpty>
            {options.map((option) => (
              <CommandItem
                key={option.id}
                onSelect={() => {
                  onSelect(option.value);
                  setOpen(false);
                }}
              >
                {option.children}
              </CommandItem>
            ))}
          </CommandList>
        </CommandResponsiveDialog>
      </Button>
    </>
  );
};
