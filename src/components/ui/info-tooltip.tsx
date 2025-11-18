import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type InfoTooltipProps = {
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
  className?: string;
};

export function InfoTooltip({ children, side = 'top', className }: InfoTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <span className={cn("cursor-help inline-flex items-center justify-center", className)}>
            <Info className="h-4 w-4 text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs z-50">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
