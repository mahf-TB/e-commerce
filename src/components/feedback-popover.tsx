import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import TextareaForm from "./TextareaForm";

export default function FeedbackPopover() {
  return (
    <div className="flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Feedback</Button>
        </PopoverTrigger>
        <PopoverContent className="w-72">
          <h2 className="mb-2 font-semibold text-sm">Send us feedback</h2>
          <RadioGroup className="-space-x-px flex gap-0 rounded-md shadow-xs mb-4">
            {[0, 1, 2, 3, 4, 5].map((number) => (
              <label
                className="relative flex size-9 flex-1 cursor-pointer flex-col items-center justify-center gap-3 border border-input text-center text-sm outline-none transition-[color,box-shadow] first:rounded-s-md last:rounded-e-md has-data-[state=checked]:z-10 has-data-disabled:cursor-not-allowed has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-data-disabled:opacity-50 has-focus-visible:ring-[3px] has-focus-visible:ring-ring/50"
                key={number}
              >
                <RadioGroupItem
                  className="sr-only after:absolute after:inset-0"
                  id={`radio-17-r${number}`}
                  value={number.toString()}
                />
                {number}
              </label>
            ))}
          </RadioGroup>
          <form className="space-y-3">
            <TextareaForm
              aria-label="Send feedback"
              id="feedback"
              placeholder="How can we improve coss ui?"
            />
            <div className="flex flex-col sm:flex-row sm:justify-end">
              <Button size="sm">Send feedback</Button>
            </div>
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
