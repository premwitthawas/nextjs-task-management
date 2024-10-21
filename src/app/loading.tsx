'use client';
import { Loader2Icon } from 'lucide-react';
import React from 'react'

const LoadingPageApp = () => {
  return (
    <div className='h-screen flex flex-col items-center justify-center'>
        <Loader2Icon className='size-6 animate-spin'/>
    </div>
  )
}

export default LoadingPageApp