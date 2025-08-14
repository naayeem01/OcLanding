'use client';

import { Input } from '@/components/ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function SearchBar() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleTypeChange = (type: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('type', type);
    replace(`${pathname}?${params.toString()}`);
  }
  
  const handleStatusChange = (status: string) => {
    const params = new URLSearchParams(searchParams);
    if (status === 'all') {
      params.delete('status');
    } else {
      params.set('status', status);
    }
    replace(`${pathname}?${params.toString()}`);
  }


  return (
    <div className="flex flex-wrap gap-2 items-center mt-4">
      <Input
        placeholder="অনুসন্ধান করুন..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('search')?.toString()}
        className="max-w-sm font-bangla"
      />
      <Select onValueChange={handleTypeChange} defaultValue={searchParams.get('type') || 'orderNumber'}>
        <SelectTrigger className="w-[180px] font-bangla">
          <SelectValue placeholder="অনুসন্ধানের ধরণ" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="orderNumber" className='font-bangla'>অর্ডার নম্বর</SelectItem>
          <SelectItem value="phone" className='font-bangla'>ফোন নম্বর</SelectItem>
          <SelectItem value="transactionId" className='font-bangla'>ট্রানজেকশন আইডি</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={handleStatusChange} defaultValue={searchParams.get('status') || 'all'}>
        <SelectTrigger className="w-[180px] font-bangla">
          <SelectValue placeholder="স্ট্যাটাস" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all" className='font-bangla'>সকল স্ট্যাটাস</SelectItem>
          <SelectItem value="Completed" className='font-bangla'>সম্পন্ন</SelectItem>
          <SelectItem value="Pending" className='font-bangla'>বিচারাধীন</SelectItem>
        </SelectContent>
      </Select>

    </div>
  );
}
