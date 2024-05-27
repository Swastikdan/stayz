"use client";
import { cn } from '@/lib/utils';

export function Input({ label, name, type, value, onChange, placeholder, className, ...props }) {
  return (
    <>
      <label
        htmlFor={name}
        className="mb-2 block text-base md:text-lg font-semibold text-gray-900"
      >
        {label}
      </label>
        <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        {...props}
        aria-describedby={`${name}-description`}
        className={cn("block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm md:text-base font-light text-gray-900 focus:border-blue-500 focus:ring-blue-500", className)}
        placeholder={placeholder}
      />
    </>
  );
}

export function Textarea({ label, name, value, rows, onChange, placeholder, className, ...props }) {
  return (
    <>
      <label
        htmlFor={name}
        className="mb-2 block text-base font-semibold text-gray-900 md:text-lg"
      >
        {label}
      </label>
      <MdEditor
        value={value}
        name={name}
        style={{ height: "500px" }}
        renderHTML={(text) => mdParser.render(text)}
        onChange={({html, text}) => {onChange({target: {value: text, name}})}}
        {...props}
        aria-describedby={`${name}-description`}
        className={cn(
          'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-light text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base',
          className,
        )}
        placeholder={placeholder}
      />
    </>
  );
}