'use client';

import { useFieldArray, type UseFormReturn } from 'react-hook-form';
import type { Trade } from './types';
import { Button } from '@/components/ui/button';
import { FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

type ExitManagementProps = {
  form: UseFormReturn<Trade>;
};

export default function ExitManagement({ form }: ExitManagementProps) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'exits',
  });

  const addNewExit = () => {
    append({
      date: new Date(),
      price: 0,
      quantity: 0,
    });
  };

  return (
    <div className="space-y-4 rounded-lg border bg-card p-4">
      <h3 className="font-semibold">Exit Management</h3>
      {fields.length > 0 && <Separator />}
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="space-y-4 rounded-md border p-4 relative">
             <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={() => remove(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>

            <div className="grid md:grid-cols-3 gap-4 items-end">
               <FormField
                  control={form.control}
                  name={`exits.${index}.date`}
                  render={({ field: dateField }) => (
                    <FormItem>
                      <FormLabel>Exit Date & Time</FormLabel>
                       <FormControl>
                          <Input 
                            type="datetime-local" 
                             value={dateField.value ? new Date(dateField.value.getTime() - dateField.value.getTimezoneOffset() * 60000).toISOString().slice(0, 16) : ''}
                             onChange={(e) => dateField.onChange(new Date(e.target.value))}
                          />
                       </FormControl>
                    </FormItem>
                  )}
                />
              <FormField
                control={form.control}
                name={`exits.${index}.price`}
                render={({ field: priceField }) => (
                  <FormItem>
                    <FormLabel>Exit Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...priceField} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`exits.${index}.quantity`}
                render={({ field: qtyField }) => (
                  <FormItem>
                    <FormLabel>Exit Quantity</FormLabel>
                    <FormControl>
                      <Input type="number" step="any" {...qtyField} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" onClick={addNewExit}>
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Exit
      </Button>
    </div>
  );
}
