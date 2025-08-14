import { cn } from '@/lib/utils';
import type { SVGProps } from 'react';

const OushodCloudLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
    className={cn('text-primary', props.className)}
  >
    <defs>
      <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: 'hsl(var(--accent))', stopOpacity: 1 }} />
      </linearGradient>
    </defs>
    <path d="M16 20h.01" />
    <path d="M11.5 20h.01" />
    <path d="M7 20h.01" />
    <path d="M4 16.5A4.5 4.5 0 0 1 8.5 12H14a4.5 4.5 0 1 1 0 9h- среди" />
    <path d="M12 12V6" />
    <path d="M15 9l-3-3-3 3" />
    <path d="M5.5 12.5A4.5 4.5 0 0 1 10 8h.5" />
  </svg>
);

export default OushodCloudLogo;
