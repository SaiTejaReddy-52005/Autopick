import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HelpCircle } from "lucide-react";
import type { Feature } from "@/lib/features";

interface FeaturePopoverProps {
  feature: Feature;
}

export function FeaturePopover({ feature }: FeaturePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger>
        <HelpCircle className="h-4 w-4 ml-2 text-muted-foreground hover:text-primary cursor-help" />
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-2">
          <h4 className="font-medium leading-none">{feature.name}</h4>
          <p className="text-sm text-muted-foreground">
            {feature.description}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
