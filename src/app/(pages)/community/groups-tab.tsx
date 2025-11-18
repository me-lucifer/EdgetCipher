'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { mockGroups } from './mock-data';

type Group = (typeof mockGroups)[0];

export default function GroupsTab() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [joinedGroups, setJoinedGroups] = useState<Record<string, boolean>>({});

  const handleJoinToggle = (groupId: string) => {
    setJoinedGroups(prev => ({...prev, [groupId]: !prev[groupId]}));
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockGroups.map(group => (
          <Card key={group.id}>
            <CardHeader>
              <CardTitle>{group.name}</CardTitle>
              <CardDescription>{group.members.toLocaleString()} members</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{group.description}</p>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setSelectedGroup(group)}>View Group</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Sheet open={!!selectedGroup} onOpenChange={(isOpen) => !isOpen && setSelectedGroup(null)}>
        <SheetContent>
            {selectedGroup && (
                <>
                    <SheetHeader>
                        <SheetTitle>{selectedGroup.name}</SheetTitle>
                        <SheetDescription>{selectedGroup.description}</SheetDescription>
                    </SheetHeader>
                    <div className="py-4">
                        <Button className="w-full" onClick={() => handleJoinToggle(selectedGroup.id)}>
                            {joinedGroups[selectedGroup.id] ? 'Leave Group' : 'Join Group'}
                        </Button>
                    </div>
                    <div className="space-y-4">
                        <h4 className="font-semibold">Recent Posts</h4>
                        <div className="p-3 rounded-lg bg-muted/50 text-sm">
                            <p className="font-semibold">User A</p>
                            <p className="text-muted-foreground">Just closed a great swing trade on ETH...</p>
                        </div>
                         <div className="p-3 rounded-lg bg-muted/50 text-sm">
                            <p className="font-semibold">User B</p>
                            <p className="text-muted-foreground">What are your thoughts on the upcoming FOMC meeting?</p>
                        </div>
                    </div>
                </>
            )}
        </SheetContent>
      </Sheet>
    </>
  );
}
