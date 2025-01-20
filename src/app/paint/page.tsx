import React from 'react'
import { Draw } from '@/components/paint/Draw'

export const PaintPage = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row w-full md:h-screen leading-6 bg-white">
      <Draw />
    </div>
  )
}

export default PaintPage