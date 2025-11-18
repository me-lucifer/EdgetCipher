'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockEvents } from './mock-data';
import { Bell, BellRing } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function EventsTab() {
  const { toast } = useToast();
  const [reminders, setReminders] = useState<Record<string, boolean>>({});
  const [details, setDetails] = useState<string | null>(null);

  const handleReminder = (eventId: string) => {
    const isSet = !reminders[eventId];
    setReminders(prev => ({...prev, [eventId]: isSet }));
    if(isSet) {
        toast({
            title: 'Reminder Set!',
            description: 'We will notify you before the event starts.',
        });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
        <CardDescription>Join live sessions with top traders and the community.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {mockEvents.map(event => (
          <div key={event.id} className="p-4 border rounded-lg">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
              <div>
                <h3 className="font-semibold">{event.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Hosted by {event.host} &bull; {event.date}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleReminder(event.id)}>
                   {reminders[event.id] ? 
                    <BellRing className="mr-2 h-4 w-4 text-primary" /> : 
                    <Bell className="mr-2 h-4 w-4" />
                   }
                  {reminders[event.id] ? 'Reminder Set' : 'Remind Me'}
                </Button>
                <Button size="sm" onClick={() => setDetails(details === event.id ? null : event.id)}>
                  {details === event.id ? 'Hide Details' : 'Show Details'}
                </Button>
              </div>
            </div>
            {details === event.id && (
              <p className="mt-4 text-sm text-muted-foreground border-t pt-4">
                {event.description}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
