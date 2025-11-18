'use client';

import { useState, useEffect }from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { mockLessons } from './mock-data';
import { Badge } from '@/components/ui/badge';
import { CheckCircle } from 'lucide-react';

const LESSON_STATUS_KEY = 'edge-cipher-lesson-status';

export default function LearnTab() {
    const [lessonStatus, setLessonStatus] = useState<Record<string, 'Not Started' | 'In Progress' | 'Completed'>>({});

    useEffect(() => {
        try {
            const saved = localStorage.getItem(LESSON_STATUS_KEY);
            if (saved) {
                setLessonStatus(JSON.parse(saved));
            }
        } catch (e) {
            console.error('Failed to load lesson statuses', e);
        }
    }, []);

    const updateStatus = (id: string, status: 'In Progress' | 'Completed') => {
        const newStatus = { ...lessonStatus, [id]: status };
        setLessonStatus(newStatus);
        try {
            localStorage.setItem(LESSON_STATUS_KEY, JSON.stringify(newStatus));
        } catch (e) {
            console.error('Failed to save lesson status', e);
        }
    }


  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockLessons.map(lesson => {
            const status = lessonStatus[lesson.id] || 'Not Started';
            return (
                <Card key={lesson.id} className="flex flex-col">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <CardTitle>{lesson.title}</CardTitle>
                             <Badge variant={status === 'Completed' ? 'default' : 'outline'} className={
                                 status === 'Completed' ? 'bg-emerald-500/20 text-emerald-500 border-transparent' :
                                 status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-500 border-transparent' : ''
                             }>{status}</Badge>
                        </div>
                        <CardDescription>{lesson.duration}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">{lesson.description}</p>
                         {status !== 'Not Started' && (
                            <div className="mt-4 text-sm space-y-2 p-3 bg-muted/50 rounded-lg">
                                <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-emerald-500"/> Introduction</p>
                                <p className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-emerald-500"/> Key concepts</p>
                                <p className="flex items-center opacity-50">... Quiz (coming soon)</p>
                            </div>
                        )}
                    </CardContent>
                    <CardFooter>
                         {status !== 'Completed' && (
                           <Button 
                             onClick={() => updateStatus(lesson.id, status === 'Not Started' ? 'In Progress' : 'Completed')}
                             className="w-full"
                           >
                            {status === 'Not Started' ? 'Start Lesson' : 'Mark as Complete'}
                           </Button>
                         )}
                    </CardFooter>
                </Card>
            )
        })}
    </div>
  );
}
