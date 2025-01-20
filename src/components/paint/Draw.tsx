'use client'

import { IPoint } from '@/constants/common'
import React, { MouseEvent, useEffect, useRef, useState } from 'react'
import './draw.css'

const LINE_WIDTH = 5

export const Draw = () => {
  const canvasTempRef = useRef<HTMLCanvasElement | null>(null)
  const canvasDrawRef = useRef<HTMLCanvasElement | null>(null)
  const pointRef = useRef<IPoint[]>([])
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  useEffect(() => {
    if (canvasTempRef.current && canvasDrawRef.current) {
      const rect = canvasTempRef.current.getBoundingClientRect()      
      canvasTempRef.current.width = rect.width
      canvasTempRef.current.height = rect.height

      canvasDrawRef.current.width = rect.width
      canvasDrawRef.current.height = rect.height

      const context = canvasTempRef.current.getContext('2d')

      if (context) {
        context.lineJoin = 'round'
        context.lineCap = 'round'
        context.strokeStyle = '#000'
        context.lineWidth = LINE_WIDTH

        setCtx(context)
      }
    }
  }, [])

  const getMidPoint = (p1: IPoint, p2: IPoint) => {
    return {
      x: p1.x + (p2.x - p1.x) / 2,
      y: p1.y + (p2.y - p1.y) / 2
    }
  }

  const onDrawBegin = (e: MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault()

    const { nativeEvent } = e
    if (pointRef.current)
      pointRef.current.push({x: nativeEvent.offsetX, y: nativeEvent.offsetY})

    setIsDrawing(true)
  }

  const onDrawing = (e: MouseEvent<HTMLCanvasElement>) => {
    if (!ctx || !isDrawing || !pointRef.current || !canvasTempRef.current ) return

    e.preventDefault()

    const { nativeEvent } = e
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    pointRef.current.push({
      x: nativeEvent.offsetX,
      y: nativeEvent.offsetY,
    })

    let p1 = pointRef.current[0]
    let p2 = pointRef.current[1]

    ctx.moveTo(p2.x, p2.y)
    ctx.beginPath()

    for (let i = 1, len = pointRef.current.length; i < len; i++) {
      const midPoint = getMidPoint(p1, p2)

      ctx.quadraticCurveTo(p1.x, p1.y, midPoint.x, midPoint.y)
      p1 = pointRef.current[i]
      p2 = pointRef.current[i + 1]
    }

    ctx.lineTo(p1.x, p1.y)
    ctx.stroke()
  }

  const onDrawEnd = () => {
    if (!ctx || !canvasTempRef.current || !canvasDrawRef.current) return;

    const w = ctx.canvas.width
    const h = ctx.canvas.height

    const drawContext = canvasDrawRef.current.getContext('2d')
    drawContext?.drawImage(canvasTempRef.current, 0, 0, w, h)
    ctx.clearRect(0, 0, w, h)

    if (pointRef.current) {
      pointRef.current = []

      setIsDrawing(false)
    }
  }

  return (
    <div className="relative z-10 w-full md:h-full border-t border-stone-300 md:border-t-0">
      <canvas
        ref={canvasTempRef}
        className="canvas z-40"
        onMouseDown={onDrawBegin}
        onMouseUp={onDrawEnd}
        onMouseMove={onDrawing}
      />
      <canvas ref={canvasDrawRef} className="canvas z-30"></canvas>
    </div>
  )
}