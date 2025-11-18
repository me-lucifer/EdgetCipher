'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockLeaders } from './mock-data';
import { InfoTooltip } from '@/components/ui/info-tooltip';

type Leader = (typeof mockLeaders)[0];

export default function LeadersTab() {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Top Traders
             <InfoTooltip side="right">In a real system, performance would be verified and connected to broker accounts.</InfoTooltip>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockLeaders.map(leader => (
            <div key={leader.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback>{leader.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{leader.name}</p>
                  <p className="text-sm text-muted-foreground">{leader.stats}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedLeader(leader)}>
                View Profile
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <Dialog open={!!selectedLeader} onOpenChange={(isOpen) => !isOpen && setSelectedLeader(null)}>
        <DialogContent>
            {selectedLeader && (
                <>
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                               <AvatarFallback>{selectedLeader.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                            </Avatar>
                           {selectedLeader.name}
                        </DialogTitle>
                        <DialogDescription>{selectedLeader.stats}</DialogDescription>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                        <p className="text-muted-foreground">{selectedLeader.bio}</p>
                        <div>
                            <h4 className="font-semibold mb-2">Focus Areas</h4>
                             <div className="flex flex-wrap gap-2">
                                {selectedLeader.focus.map(area => (
                                    <Badge key={area} variant="secondary">{area}</Badge>
                                ))}
                            </div>
                        </div>
                         <Button className="w-full">Follow</Button>
                    </div>
                </>
            )}
        </DialogContent>
      </Dialog>
    </>
  );
}
