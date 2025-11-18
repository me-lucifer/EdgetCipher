'use client';

import type { UseFormReturn } from 'react-hook-form';
import type { Trade } from './types';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import ExitManagement from './exit-management';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import React from 'react';

type TradeFormFieldsProps = {
  form: UseFormReturn<Trade>;
  isOcr?: boolean;
};

const OcrConfidence = ({ confidence }: { confidence: number }) => (
    <Badge variant="outline" className="ml-2 border-green-500/50 text-green-500">
        {confidence}% conf.
    </Badge>
);

export default function TradeFormFields({ form, isOcr = false }: TradeFormFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Symbol / Asset
                {isOcr && <OcrConfidence confidence={98} />}
              </FormLabel>
              <FormControl>
                <div>
                  <Input list="symbols" {...field} />
                  <datalist id="symbols">
                    <option value="BTC/USDT" />
                    <option value="ETH/USDT" />
                    <option value="SOL/USDT" />
                    <option value="XRP/USDT" />
                  </datalist>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="direction"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Trade Direction
                {isOcr && <OcrConfidence confidence={99} />}
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trade direction" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Long">Long</SelectItem>
                  <SelectItem value="Short">Short</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

       <div className="grid md:grid-cols-2 gap-6">
         <FormField
          control={form.control}
          name="entryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Entry Date & Time
                {isOcr && <OcrConfidence confidence={92} />}
              </FormLabel>
              <FormControl>
                <Input 
                    type="datetime-local" 
                    value={field.value ? new Date(field.value.getTime() - field.value.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="tradeType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Trade Type
                 <InfoTooltip>
                    "Manual" for entries you type yourself. "Image" for entries filled from a screenshot.
                </InfoTooltip>
              </FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Manual">Manual</SelectItem>
                  <SelectItem value="Image">Image</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>


      <div className="grid md:grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="entryPrice"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Entry Price
                {isOcr && <OcrConfidence confidence={99} />}
              </FormLabel>
              <FormControl>
                <Input type="number" step="any" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                Quantity / Size
                {isOcr && <OcrConfidence confidence={97} />}
              </FormLabel>
              <FormControl>
                <Input type="number" step="any" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="leverage"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1">
                Leverage
                {isOcr && <OcrConfidence confidence={85} />}
                <InfoTooltip>Higher leverage increases both potential profit and risk.</InfoTooltip>
              </FormLabel>
              <FormControl>
                <Input type="number" min={1} max={500} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="notes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Notes / Thesis</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Why did you take this trade? What was your thesis?"
                rows={4}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <ExitManagement form={form} />
    </div>
  );
}
