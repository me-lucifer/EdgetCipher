'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { tradeSchema, type Trade } from './types';
import TradeFormFields from './trade-form-fields';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { UploadCloud, File, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InfoTooltip } from '@/components/info-tooltip';

const DRAFT_KEY = 'edge-cipher-trade-draft-image';

type ImageUploadFormProps = {
  onSwitchTab: () => void;
  onAddTrade: (trade: Trade) => void;
};

type FilePreview = {
  name: string;
  type: string;
  preview: string;
};

export default function ImageUploadForm({
  onSwitchTab,
  onAddTrade,
}: ImageUploadFormProps) {
  const { toast } = useToast();
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isOcrComplete, setIsOcrComplete] = useState(false);

  const form = useForm<Trade>({
    resolver: zodResolver(tradeSchema),
    defaultValues: {
      symbol: '',
      direction: 'Long',
      tradeType: 'Image',
      entryPrice: 0,
      quantity: 0,
      leverage: 1,
      commission: 0,
      notes: '',
      exits: [],
    },
  });

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files ? Array.from(event.target.files) : [];
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles: File[]) => {
    const filePreviews = newFiles.map(file => ({
      name: file.name,
      type: file.type,
      preview: URL.createObjectURL(file),
    }));
    setFiles(filePreviews);
    simulateOcr(filePreviews);
  };

  const simulateOcr = (filePreviews: FilePreview[]) => {
    setIsProcessing(true);
    setIsOcrComplete(false);
    setTimeout(() => {
      // Mocked data extracted from the image
      const mockExtractedData = {
        symbol: 'BTC/USDT',
        direction: 'Long',
        entryDate: new Date(),
        entryPrice: 69420.0,
        quantity: 0.5,
        leverage: 20,
        commission: 15.5,
        notes: `Extracted from ${filePreviews.map(f => f.name).join(', ')}.`,
      };
      form.reset({ ...form.getValues(), ...mockExtractedData, tradeType: 'Image' });
      setIsProcessing(false);
      setIsOcrComplete(true);
      toast({
        title: 'OCR Simulation Complete',
        description: 'Trade data has been extracted from the image.',
      });
    }, 2000);
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(form.getValues()));
      toast({ title: 'Draft Saved' });
    } catch (e) {
      toast({ variant: 'destructive', title: 'Error', description: 'Could not save draft.' });
    }
  };

  const onSubmit = (data: Trade) => {
    onAddTrade(data);
    toast({ title: 'Trade Submitted (Simulation)' });
    form.reset();
    setFiles([]);
    setIsOcrComplete(false);
    localStorage.removeItem(DRAFT_KEY);
  };

  return (
    <Card>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader>
            <CardTitle>Upload Trade Screenshot</CardTitle>
            <CardDescription>
              We'll use simulated OCR to extract the details from your broker screenshot.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {!isOcrComplete ? (
               <div
                className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted transition-colors"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleFileDrop}
              >
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileSelect}
                  accept="image/*,.pdf"
                  multiple
                />
                <div className="text-center">
                  <UploadCloud className="w-12 h-12 mx-auto text-muted-foreground" />
                  <p className="mt-4 text-lg font-semibold">
                    {isProcessing ? "Processing..." : "Drag & drop files here, or click to select"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Supports: PNG, JPG, GIF, PDF (Simulated)
                  </p>
                  <InfoTooltip side="bottom">
                    In a real application, this would extract trade details automatically from your broker screenshots. This is a client-side simulation; no files are actually uploaded.
                  </InfoTooltip>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-semibold mb-2">Uploaded Files:</h4>
                <div className="flex gap-4 flex-wrap">
                  {files.map((file) => (
                    <div key={file.name} className="flex items-center gap-2 text-sm">
                      {file.type.startsWith('image/') ? (
                        <ImageIcon className="h-5 w-5" />
                      ) : (
                        <File className="h-5 w-5" />
                      )}
                      <span>{file.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {isOcrComplete && <TradeFormFields form={form} isOcr={true} />}

          </CardContent>
          {isOcrComplete && (
            <CardFooter className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                    <Button type="submit">Submit Trade</Button>
                    <Button type="button" variant="outline" onClick={handleSaveDraft}>Save as Draft</Button>
                </div>
                <Button type="button" variant="secondary" onClick={onSwitchTab}>
                    Manual Entry Instead
                </Button>
            </CardFooter>
          )}
        </form>
      </Form>
    </Card>
  );
}
