'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, Bookmark } from 'lucide-react';
import { mockPosts } from './mock-data';
import { cn } from '@/lib/utils';

const SAVED_POSTS_KEY = 'edge-cipher-saved-posts';

export default function FeedTab() {
  const [likes, setLikes] = useState<Record<string, number>>({});
  const [saved, setSaved] = useState<Record<string, boolean>>({});

  useEffect(() => {
    mockPosts.forEach(post => {
      setLikes(prev => ({ ...prev, [post.id]: post.likes }));
    });
    try {
      const savedInStorage = localStorage.getItem(SAVED_POSTS_KEY);
      if (savedInStorage) {
        setSaved(JSON.parse(savedInStorage));
      }
    } catch (e) {
      console.error('Failed to load saved posts', e);
    }
  }, []);

  const handleLike = (postId: string) => {
    setLikes(prev => ({ ...prev, [postId]: (prev[postId] || 0) + 1 }));
  };

  const handleSave = (postId: string) => {
    const newSaved = { ...saved, [postId]: !saved[postId] };
    setSaved(newSaved);
    try {
      localStorage.setItem(SAVED_POSTS_KEY, JSON.stringify(newSaved));
    } catch (e) {
      console.error('Failed to save post status', e);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {mockPosts.map(post => (
        <Card key={post.id}>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{post.author.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{post.author}</p>
                <p className="text-sm text-muted-foreground">{post.timestamp}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="whitespace-pre-wrap">{post.content}</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => handleLike(post.id)}>
                <Heart className="mr-2 h-4 w-4" />
                {likes[post.id] || 0}
              </Button>
              <Button variant="ghost" size="sm">
                <MessageSquare className="mr-2 h-4 w-4" />
                {post.comments}
              </Button>
            </div>
            <Button variant="ghost" size="sm" onClick={() => handleSave(post.id)}>
              <Bookmark className={cn('mr-2 h-4 w-4', saved[post.id] && 'fill-current text-primary')} />
              {saved[post.id] ? 'Saved' : 'Save'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
