'use client';

import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type ActionItem = {
  id: string;
  label: string;
};

type NextBestActionsProps = {
  items: ActionItem[];
};

const LOCAL_STORAGE_KEY = 'edge-cipher-next-best-actions';

export default function NextBestActions({ items }: NextBestActionsProps) {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedItems) {
        setCheckedItems(JSON.parse(storedItems));
      }
    } catch (error) {
      console.error('Failed to parse next best actions from localStorage', error);
    }
  }, []);

  const handleCheckedChange = (id: string, checked: boolean) => {
    const newCheckedItems = { ...checkedItems, [id]: checked };
    setCheckedItems(newCheckedItems);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newCheckedItems));
    } catch (error) {
      console.error('Failed to save next best actions to localStorage', error);
    }
  };

  return (
    <div className="space-y-3">
      {items.map(item => (
        <div key={item.id} className="flex items-center space-x-3">
          <Checkbox
            id={item.id}
            checked={checkedItems[item.id] || false}
            onCheckedChange={checked => handleCheckedChange(item.id, !!checked)}
          />
          <Label
            htmlFor={item.id}
            className={cn(
              'text-sm font-medium leading-none transition-colors',
              checkedItems[item.id]
                ? 'text-muted-foreground line-through'
                : 'text-foreground'
            )}
          >
            {item.label}
          </Label>
        </div>
      ))}
    </div>
  );
}
