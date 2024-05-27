'use client';
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
export default function SelectScroll({
  items,
  setSelectedData,
  label,
  placeholder,
  className,
}) {
  const handleValueChange = (value) => {
    setSelectedData(value);
  };

  return (
    <div className="my-3">
      <label
        htmlFor={label}
        className="mb-2 block text-base font-semibold text-gray-900 md:text-lg"
      >
        {label}
      </label>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-light text-gray-900 md:text-base  ">
          <SelectValue placeholder={placeholder}  className='placeholder:text-gray-600  text-gray-600' />
        </SelectTrigger>
        <SelectContent >
          <SelectGroup>
            {items && items.length > 0 ? (
              items.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))
            ) : (
              <SelectItem value=" ">No data found</SelectItem>
            )}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}