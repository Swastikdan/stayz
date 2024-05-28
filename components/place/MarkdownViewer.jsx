import React from 'react';
import Markdown from 'react-markdown';

export default function MarkdownViewer({ markdown }) {
  return <Markdown>{markdown}</Markdown>;
}
