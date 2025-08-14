
'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useState, useEffect } from 'react';

export default function LegalDocumentModal({
  children,
  docType,
}: {
  children: React.ReactNode;
  docType: 'privacy-policy' | 'terms-of-service';
}) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const docDetails = {
    'privacy-policy': {
      title: 'গোপনীয়তা নীতি',
      url: '/privacy-policy',
    },
    'terms-of-service': {
      title: 'শর্তাবলী',
      url: '/terms-of-service',
    },
  };

  useEffect(() => {
    if (open) {
      setIsLoading(true);
      fetch(docDetails[docType].url)
        .then((res) => res.text())
        .then((text) => {
           // This is a hacky way to extract the main content from the fetched HTML page
          const mainContentRegex = /<main[^>]*>([\s\S]*)<\/main>/;
          const match = text.match(mainContentRegex);
          setContent(match ? match[1] : 'Content could not be loaded.');
          setIsLoading(false);
        })
        .catch(() => {
          setContent('Content could not be loaded.');
          setIsLoading(false);
        });
    }
  }, [open, docType]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-bangla text-2xl">
            {docDetails[docType].title}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-6">
          {isLoading ? (
            <p className="font-bangla">লোড হচ্ছে...</p>
          ) : (
            <div className="prose prose-sm max-w-none font-bangla" dangerouslySetInnerHTML={{ __html: content }} />
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
