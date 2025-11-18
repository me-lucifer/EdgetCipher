'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const mockPositions = [
  { id: 1, symbol: 'BTC/USDT', direction: 'Long', size: '0.5 BTC', pnl: '+$1,230.50', pnlValue: 1230.5, risk: 'Medium' },
  { id: 2, symbol: 'ETH/USDT', direction: 'Short', size: '10 ETH', pnl: '-$450.20', pnlValue: -450.2, risk: 'High' },
  { id: 3, symbol: 'SOL/USDT', direction: 'Long', size: '100 SOL', pnl: '+$890.00', pnlValue: 890, risk: 'Low' },
  { id: 4, symbol: 'DOGE/USDT', direction: 'Long', size: '50,000 DOGE', pnl: '-$50.75', pnlValue: -50.75, risk: 'High' },
];

const mockAiResponses = [
    "Considering the current market volatility, have you thought about tightening your stop-loss on the ETH position?",
    "Your BTC trade is performing well. It might be a good time to consider taking partial profits to secure some gains.",
    "The risk on your DOGE trade seems high relative to its size. Ensure this aligns with your overall risk management strategy.",
    "Remember, sticking to your trading plan is crucial, especially when managing multiple positions. Avoid making emotional decisions."
];

const initialMessages = [
  { from: 'ai', text: 'Hello! I am your AI trading coach. I see you have a few open positions. The market is showing increased volatility in the altcoin sector.' },
  { from: 'user', text: 'Should I be concerned about my ETH short?' },
  { from: 'ai', text: 'Your ETH position is currently at a high-risk level due to the recent upward momentum. I recommend reviewing your stop-loss placement.' },
];

export default function LiveTradeCoaching() {
  const [selectedPositionId, setSelectedPositionId] = useState<number | null>(mockPositions[0].id);
  const [messages, setMessages] = useState(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const userAvatar = PlaceHolderImages.find(img => img.id === 'user-avatar');

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    const newMessages = [...messages, { from: 'user', text: inputValue }];
    setMessages(newMessages);
    setInputValue('');

    setTimeout(() => {
      const aiResponse = mockAiResponses[Math.floor(Math.random() * mockAiResponses.length)];
      setMessages(prev => [...prev, { from: 'ai', text: aiResponse }]);
    }, 1000);
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>Active Positions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockPositions.map(pos => (
              <div
                key={pos.id}
                onClick={() => setSelectedPositionId(pos.id)}
                className={cn(
                  'p-3 rounded-lg border cursor-pointer transition-all',
                  selectedPositionId === pos.id ? 'bg-muted ring-2 ring-primary' : 'hover:bg-muted/50'
                )}
              >
                <div className="flex justify-between items-center">
                  <span className="font-semibold">{pos.symbol}</span>
                  <Badge variant={pos.direction === 'Long' ? 'default' : 'destructive'} className={cn(pos.direction === 'Long' ? 'bg-emerald-500/20 text-emerald-500 border-transparent' : 'bg-red-500/20 text-red-500 border-transparent')}>
                    {pos.direction === 'Long' ? <ArrowUp className="mr-1 h-3 w-3" /> : <ArrowDown className="mr-1 h-3 w-3" />}
                    {pos.direction}
                  </Badge>
                </div>
                <div className="flex justify-between items-end mt-2 text-sm">
                  <div className="text-muted-foreground">
                    <div>Size: {pos.size}</div>
                    <div>Unrealized PnL: <span className={cn(pos.pnlValue >= 0 ? 'text-emerald-500' : 'text-destructive')}>{pos.pnl}</span></div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn({
                      'border-green-500/50 text-green-500': pos.risk === 'Low',
                      'border-yellow-500/50 text-yellow-500': pos.risk === 'Medium',
                      'border-red-500/50 text-red-500': pos.risk === 'High',
                    })}
                  >
                    {pos.risk} Risk
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>AI Coaching Chat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 overflow-y-auto pr-4 space-y-4 bg-background rounded-lg p-4 border">
             {messages.map((msg, index) => (
              <div key={index} className={cn("flex items-end gap-2", msg.from === 'user' ? "justify-end" : "justify-start")}>
                {msg.from === 'ai' && (
                  <Avatar className="h-8 w-8">
                     <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div className={cn("max-w-[75%] rounded-lg p-3 text-sm", msg.from === 'user' ? "bg-primary text-primary-foreground" : "bg-muted")}>
                  <p>{msg.text}</p>
                </div>
                 {msg.from === 'user' && userAvatar && (
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={userAvatar.imageUrl} alt="User Avatar" data-ai-hint={userAvatar.imageHint} />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask the coach a question..."
            />
            <Button onClick={handleSendMessage}>Ask</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
