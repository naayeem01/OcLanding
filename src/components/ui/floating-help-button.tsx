'use client';
import { PhoneCall } from 'lucide-react';
import { Button } from './button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const FloatingHelpButton = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <Button
        asChild
        size="lg"
        className={cn(
          'flex items-center gap-3 rounded-full px-6 py-4 shadow-lg transition-all duration-300 transform-gpu group-hover:scale-105 group-hover:shadow-2xl'
        )}
        style={{
            animation: 'pulse 2s infinite',
        }}
      >
        <Link href="tel:+8801577001441">
          <PhoneCall className="h-6 w-6" />
          <span className="font-bangla text-lg font-semibold">
            অপারেটর এর সাহায্য নিতে কল করুন
          </span>
        </Link>
      </Button>
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 hsl(var(--primary) / 0.7);
          }
          70% {
            transform: scale(1);
            box-shadow: 0 0 0 10px hsl(var(--primary) / 0);
          }
          100% {
            transform: scale(0.95);
            box-shadow: 0 0 0 0 hsl(var(--primary) / 0);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingHelpButton;
