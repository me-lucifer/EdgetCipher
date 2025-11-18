'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, BookOpen, Mic, Rss, Star, Calendar } from 'lucide-react';
import FeedTab from './feed-tab';
import GroupsTab from './groups-tab';
import LeadersTab from './leaders-tab';
import LearnTab from './learn-tab';
import EventsTab from './events-tab';

export default function CommunityPage() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Trading Community</h2>
          <p className="text-muted-foreground">
            Share ideas, follow mentors, and learn together.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Members Online
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">1,284</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Discussions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">342</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Ideas Shared Today
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">97</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="feed" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          <TabsTrigger value="feed"><Rss className="mr-2" />Feed</TabsTrigger>
          <TabsTrigger value="groups"><Users className="mr-2" />Groups</TabsTrigger>
          <TabsTrigger value="leaders"><Star className="mr-2" />Leaders</TabsTrigger>
          <TabsTrigger value="learn"><BookOpen className="mr-2" />Learn</TabsTrigger>
          <TabsTrigger value="events"><Calendar className="mr-2" />Events</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">
          <FeedTab />
        </TabsContent>
        <TabsContent value="groups">
          <GroupsTab />
        </TabsContent>
        <TabsContent value="leaders">
          <LeadersTab />
        </TabsContent>
        <TabsContent value="learn">
          <LearnTab />
        </TabsContent>
        <TabsContent value="events">
          <EventsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
