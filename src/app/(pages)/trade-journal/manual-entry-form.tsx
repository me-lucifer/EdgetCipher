'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tradeSchema, type Trade } from './types';
import TradeFormFields from './trade-form-fields';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { useEffect } from 'react';

const DRAFT_KEY = 'edge-cipher-trade-draft-manual';

type ManualEntryFormProps = {
  onSwitchTab: () => void;
  onAddTrade: (trade: Trade) => void;
};

export default function ManualEntryForm({
  onSwitchTab,
  onAddTrade,
}: ManualEntryFormProps) {
  const { toast } = useToast();
  const form = useForm<Trade>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      symbol: '',
      direction: 'Long',
      entryDate: new Date(),
      tradeType: 'Manual',
      entryPrice: 0,
      quantity: 0,
      leverage: 1,
      commission: 0,
      notes: '',
      exits: [],
    },
  });

  useEffect(() => {
    try {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) {
        const parsed = JSON.parse(savedDraft);
        // Ensure dates are correctly parsed
        if (parsed.entryDate) parsed.entryDate = new Date(parsed.entryDate);
        parsed.exits?.forEach((exit: any) => {
          if (exit.date) exit.date = new Date(exit.date);
        });
        
        const validation = tradeSchema.safeParse(parsed);
        if (validation.success) {
          form.reset(validation.data);
          toast({ title: 'Draft Loaded', description: 'Your previously saved draft has been loaded.' });
        }
      }
    } catch (e) {
      console.error("Failed to load draft", e);
    }
  }, [form, toast]);


  const handleSaveDraft = () => {
    try {
      const values = form.getValues();
      localStorage.setItem(DRAFT_KEY, JSON.stringify(values));
      toast({
        title: 'Draft Saved',
        description: 'Your trade entry has been saved as a draft.',
      });
    } catch (e) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not save draft.',
      });
    }
  };

  const onSubmit = (data: Trade) => {
    onAddTrade(data);
    toast({
      title: 'Trade Submitted (Simulation)',
      description: 'Your trade journal entry has been saved.',
    });
    form.reset();
    localStorage.removeItem(DRAFT_KEY);
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Enter Trade Details</CardTitle>
          </CardHeader>
          <CardContent>
            <TradeFormFields form={form} />
          </CardContent>
          <CardFooter className="flex flex-wrap justify-between gap-2">
            <div className="flex gap-2">
              <Button type="submit">Submit Trade</Button>
              <Button type="button" variant="outline" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
            </div>
            <Button
              type="button"
              variant="secondary"
              onClick={onSwitchTab}
            >
              Switch to Image Upload
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
