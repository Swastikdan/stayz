'use client';
import { cn } from '@/lib/utils';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
const mdParser = new MarkdownIt(/* Markdown-it options */);
// export default function Textarea({
//   label,
//   name,
//   value,
//   rows,
//   onChange,
//   placeholder,
//   className,
//   ...props
// }) {
//   const [useRichText, setUseRichText] = useState(false);
//   return (
//     <>
//       <div className="flex items-center justify-between">
//         <Label
//           htmlFor={name}
//           className="mb-2 block text-base font-semibold text-gray-900 md:text-lg"
//         >
//           {label}
//         </Label>

//         <div className="flex items-center space-x-2">
//           <Switch
//             checked={useRichText}
//             onCheckedChange={() => setUseRichText(!useRichText)}
//             id="rech-text-area"
//           />
//           <Label htmlFor="rech-text-area">
//             Switch to {useRichText ? 'Simple Text' : 'Rich Text'}
//           </Label>
//         </div>
//       </div>
//       {useRichTextDescription ? (
//         <MdEditor
//           value={value}
//           name={name}
//           style={{ height: '500px' }}
//           renderHTML={(text) => mdParser.render(text)}
//           onChange={({ html, text }) => {
//             onChange({ target: { value: text, name } });
//           }}
//           {...props}
//           aria-describedby={`${name}-description`}
//           className={cn(
//             'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-light text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base',
//             className,
//           )}
//           placeholder={placeholder}
//         />
//       ) : (
//         <textarea
//           value={value}
//           name={name}
//           onChange={onChange}
//           rows={rows}
//           {...props}
//           aria-describedby={`${name}-description`}
//           className={cn(
//             'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-light text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base',
//             className,
//           )}
//           placeholder={placeholder}
//         />
//       )}
//     </>
//   );
// }

export function Textarea({
  label,
  name,
  value,
  rows,
  onChange,
  placeholder,
  className,
  ...props
}) {
    const [useRichText, setUseRichText] = useState(false);
  return (
    <>
      <div className="flex items-center justify-between">
        <Label
          htmlFor={name}
          className="mb-2 block text-base font-semibold text-gray-900 md:text-lg"
        >
          {label}
        </Label>

        <div className="flex items-center space-x-2">
          <Switch
            checked={useRichText}
            onCheckedChange={() => setUseRichText(!useRichText)}
            id="rech-text-area"
          />
          <Label htmlFor="rech-text-area">Switch to Rich Text</Label>
        </div>
      </div>
      {useRichText ? (
        <MdEditor
          value={value}
          name={name}
          style={{ height: '500px' }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={({ html, text }) => {
            onChange({ target: { value: text, name } });
          }}
          {...props}
          aria-describedby={`${name}-description`}
          className={cn(
            'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-light text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base',
            className,
          )}
          placeholder={placeholder}
        />
      ) : (
        <textarea
          value={value}
          name={name}
          onChange={onChange}
          rows={rows}
          {...props}
          aria-describedby={`${name}-description`}
          className={cn(
            'block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm font-light text-gray-900 focus:border-blue-500 focus:ring-blue-500 md:text-base',
            className,
          )}
          placeholder={placeholder}
        />
      )}
    </>
  );
}