import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import type { ReactNode } from 'react';

type InfoTooltipProps = {
  children: ReactNode;
  side?: 'top' | 'right' | 'bottom' | 'left';
};

export function InfoTooltip({ children, side = 'top' }: InfoTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <span className="cursor-help">
            <Info className="h-4 w-4 text-muted-foreground" />
          </span>
        </TooltipTrigger>
        <TooltipContent side={side} className="max-w-xs">
          {children}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
