"use client";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";
import {
    ArrowUpRightIcon,
    CircleFadingPlusIcon,
    FileInputIcon,
    FolderPlusIcon,
    SearchIcon,
} from "lucide-react";
import * as React from "react";

interface Props {
  placeholder?: string;
  buttonLabel?: string;
  shortcut?: string;
  initialOpen?: boolean;
  children?: React.ReactNode;
  inverted?: boolean;
}

export default function CommandPalette({
  placeholder = "Type a command or search...",
  buttonLabel = "Rechercher...",
  shortcut = "⌘K",
  initialOpen = false,
  children,
  inverted = false,
}: Props) {
  const [open, setOpen] = React.useState<boolean>(initialOpen);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <button
        className={
          inverted
            ? "inline-flex h-9 w-full rounded border border-muted-foreground bg-transparent px-3 py-2 text-muted-foreground text-sm shadow-none outline-none transition-colors hover:bg-gray-800/50"
            : "inline-flex h-9 w-full rounded border border-input bg-white px-3 py-2 text-foreground text-sm shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        }
        onClick={() => setOpen(true)}
        type="button"
      >
        <span className="flex grow items-center">
          <SearchIcon
            aria-hidden="true"
            className={inverted ? "-ms-1 me-3 text-muted-foreground/80" : "-ms-1 me-3 text-muted-foreground/80"}
            size={16}
          />
          <span className={inverted ? "font-normal text-muted-foreground/70" : "font-normal text-muted-foreground/70"}>{buttonLabel}</span>
        </span>
        <kbd className={inverted ? "-me-1 ms-12 inline-flex h-5 max-h-full items-center rounded border border-muted-foreground bg-transparent px-1 font-[inherit] font-medium text-[0.625rem] text-muted-foreground/70" : "-me-1 ms-12 inline-flex h-5 max-h-full items-center rounded border bg-background px-1 font-[inherit] font-medium text-[0.625rem] text-muted-foreground/70"}>
          {shortcut}
        </kbd>
      </button>

      <CommandDialog onOpenChange={setOpen} open={open} >
        <CommandInput placeholder={placeholder} />
        <CommandList>
          {children ?? (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Quick start">
                <CommandItem>
                  <FolderPlusIcon aria-hidden="true" className="opacity-60" size={16} />
                  <span>New folder</span>
                  <CommandShortcut className="justify-center">⌘N</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <FileInputIcon aria-hidden="true" className="opacity-60" size={16} />
                  <span>Import document</span>
                  <CommandShortcut className="justify-center">⌘I</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CircleFadingPlusIcon aria-hidden="true" className="opacity-60" size={16} />
                  <span>Add block</span>
                  <CommandShortcut className="justify-center">⌘B</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Navigation">
                <CommandItem>
                  <ArrowUpRightIcon aria-hidden="true" className="opacity-60" size={16} />
                  <span>Go to dashboard</span>
                </CommandItem>
                <CommandItem>
                  <ArrowUpRightIcon aria-hidden="true" className="opacity-60" size={16} />
                  <span>Go to apps</span>
                </CommandItem>
                <CommandItem>
                  <ArrowUpRightIcon aria-hidden="true" className="opacity-60" size={16} />
                  <span>Go to connections</span>
                </CommandItem>
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
