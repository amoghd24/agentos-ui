import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface SearchFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export function SearchField({
  value,
  onChange,
  placeholder = 'Search...',
  className = ''
}: SearchFieldProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
      <Input
        value={value}
        onChange={onChange}
        className={`bg-gray-800 border-gray-700 pl-9 text-white placeholder:text-gray-500 ${className}`}
        placeholder={placeholder}
      />
    </div>
  );
} 