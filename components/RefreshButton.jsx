'use client'
import React from 'react'
import { Button } from './ui/button';

export default function RefreshButton() {
  return (
    <Button
      onClick={() => window.location.reload()}
      variant="outline"
    >
      Refresh Page 
    </Button>
  );
}
