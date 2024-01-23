'use client'
import React from 'react'
import { Next13ProgressBar } from 'next13-progressbar'

const ProgressbarProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Next13ProgressBar
        height='4px'
        color='#050E05'
        options={{ showSpinner: false }}
        showOnShallow
      />
    </>
  )
}

export default ProgressbarProvider
