'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ListFilter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { StrategyCard } from './strategy-card';
import { StrategyDialog } from './strategy-dialog';
import { StrategyDetail } from './strategy-detail';
import type { Strategy } from './types';
import { initialStrategies } from './mock-data';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const STRATEGIES_KEY = 'edge-cipher-strategies';

export default function StrategyManagementPage() {
  const { toast } = useToast();
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [filter, setFilter] = useState('All');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStrategy, setEditingStrategy] = useState<Strategy | null>(null);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const [strategyToDelete, setStrategyToDelete] = useState<Strategy | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const saved = localStorage.getItem(STRATEGIES_KEY);
      if (saved) {
        setStrategies(JSON.parse(saved));
      } else {
        setStrategies(initialStrategies);
      }
    } catch (e) {
      console.error("Failed to load from localStorage", e);
      setStrategies(initialStrategies);
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    try {
        localStorage.setItem(STRATEGIES_KEY, JSON.stringify(strategies));
    } catch (e) {
        console.error("Failed to save to localStorage", e);
    }
  }, [strategies, isMounted]);

  const handleAddOrUpdateStrategy = (strategyData: Strategy) => {
    setStrategies(prev => {
      if (editingStrategy) {
        return prev.map(s => s.id === strategyData.id ? strategyData : s);
      } else {
        return [{ ...strategyData, id: `strat-${Date.now()}` }, ...prev];
      }
    });
    toast({
      title: editingStrategy ? 'Strategy Updated' : 'Strategy Added',
      description: `${strategyData.name} has been saved.`,
    });
  };

  const handleOpenDialog = (strategy: Strategy | null = null) => {
    setEditingStrategy(strategy);
    setIsDialogOpen(true);
  };

  const handleDeleteClick = (strategy: Strategy) => {
    setStrategyToDelete(strategy);
    setIsDeleteAlertOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (!strategyToDelete) return;
    setStrategies(prev => prev.filter(s => s.id !== strategyToDelete.id));
    if (selectedStrategy?.id === strategyToDelete.id) {
        setSelectedStrategy(null);
    }
    toast({ variant: 'destructive', title: 'Strategy Deleted' });
    setIsDeleteAlertOpen(false);
    setStrategyToDelete(null);
  };

  const handleStatusToggle = (id: string) => {
    setStrategies(prev => prev.map(s => {
      if (s.id === id) {
        return { ...s, status: s.status === 'Running' ? 'Paused' : 'Running' };
      }
      return s;
    }));
  };

  const handleSaveNotes = (id: string, notes: string) => {
    setStrategies(prev => prev.map(s => s.id === id ? { ...s, notes } : s));
    setSelectedStrategy(prev => prev && prev.id === id ? { ...prev, notes } : prev);
    toast({ title: 'Notes Saved' });
  };

  const filteredStrategies = strategies.filter(
    s => filter === 'All' || s.status === filter
  );

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Strategy Management</h2>
          <p className="text-muted-foreground">
            Create, monitor, and adjust your automated trading strategies.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <ListFilter className="mr-2 h-4 w-4" />
                {filter}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup value={filter} onValueChange={setFilter}>
                {['All', 'Running', 'Paused', 'Draft'].map(f => (
                  <DropdownMenuRadioItem key={f} value={f}>{f}</DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button onClick={() => handleOpenDialog()}>Add Strategy</Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          {filteredStrategies.map(strategy => (
            <StrategyCard
              key={strategy.id}
              strategy={strategy}
              onView={() => setSelectedStrategy(strategy)}
              onEdit={() => handleOpenDialog(strategy)}
              onStatusToggle={() => handleStatusToggle(strategy.id)}
              onDelete={() => handleDeleteClick(strategy)}
              isSelected={selectedStrategy?.id === strategy.id}
            />
          ))}
          {filteredStrategies.length === 0 && (
            <div className="text-center text-muted-foreground p-8">No strategies match the filter.</div>
          )}
        </div>
        <div className="lg:col-span-2">
          {selectedStrategy ? (
             <StrategyDetail strategy={selectedStrategy} onSaveNotes={handleSaveNotes} />
          ) : (
             <div className="flex h-full min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed shadow-sm bg-card text-muted-foreground">
                Select a strategy to view details.
            </div>
          )}
        </div>
      </div>

      <StrategyDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        strategy={editingStrategy}
        onSave={handleAddOrUpdateStrategy}
      />
      <AlertDialog open={isDeleteAlertOpen} onOpenChange={setIsDeleteAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the strategy "{strategyToDelete?.name}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}