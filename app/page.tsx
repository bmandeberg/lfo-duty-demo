'use client'

import { useState, useMemo, useEffect, CSSProperties as CSS } from 'react'
import styles from './page.module.css'

const MAX_DUTY_CYCLE = 100
const SVG_WIDTH = 500
const SVG_HEIGHT = 200
const STROKE_WIDTH = 8

export default function Home() {
  const [triangleWave, setTriangleWave] = useState<boolean>(true)
  const [dutyCycle, setDutyCycle] = useState<number>(MAX_DUTY_CYCLE / 2)
  const [svgWidth, setSvgWidth] = useState<number>(SVG_WIDTH)
  const [svgHeight, setSvgHeight] = useState<number>(SVG_HEIGHT)
  const [strokeWidth, setStrokeWidth] = useState<number>(STROKE_WIDTH)

  useEffect(() => {
    const updateDimensions = () => {
      const padding = 16
      const widthRatio = window.innerWidth / SVG_WIDTH
      setSvgWidth(widthRatio < 1 ? SVG_WIDTH * widthRatio - padding * 2 : SVG_WIDTH)
      setSvgHeight(widthRatio < 1 ? SVG_HEIGHT * widthRatio - padding * 2 : SVG_HEIGHT)
      setStrokeWidth(widthRatio < 1 ? STROKE_WIDTH * widthRatio : STROKE_WIDTH)
    }

    const handleResize = () => {
      updateDimensions()
    }

    updateDimensions()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const path = useMemo(() => {
    const dutyCycleValue = constrain((dutyCycle / MAX_DUTY_CYCLE) * svgWidth, strokeWidth, svgWidth - strokeWidth)
    return triangleWave
      ? `M ${strokeWidth},${svgHeight - strokeWidth} L ${dutyCycleValue},${strokeWidth} L ${svgWidth - strokeWidth},${
          svgHeight - strokeWidth
        }`
      : `M ${strokeWidth},${
          svgHeight - strokeWidth
        } L ${strokeWidth},${strokeWidth} L ${dutyCycleValue},${strokeWidth} L ${dutyCycleValue},${
          svgHeight - strokeWidth
        } L ${svgWidth - strokeWidth},${svgHeight - strokeWidth}`
  }, [triangleWave, dutyCycle, svgWidth, svgHeight, strokeWidth])

  return (
    <div className={styles.page} style={{ '--svg-width': svgWidth + 'px', '--svg-height': svgHeight + 'px' } as CSS}>
      <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className={styles.svg} xmlns="http://www.w3.org/2000/svg">
        <path fill="none" stroke="black" strokeWidth={strokeWidth} strokeLinecap="round" d={path} />
      </svg>
      <div className={styles.controls}>
        <div className={styles.control}>
          <label>
            <input
              className={styles.radioInput}
              type="radio"
              name="waveform"
              checked={triangleWave}
              onChange={() => setTriangleWave(true)}
            />
            Triangle
          </label>
          <label>
            <input
              className={styles.radioInput}
              type="radio"
              name="waveform"
              checked={!triangleWave}
              onChange={() => setTriangleWave(false)}
            />
            Square
          </label>
        </div>
        <div className={styles.control}>
          <input
            type="range"
            id="dutyCycle"
            min={0}
            max={MAX_DUTY_CYCLE}
            value={dutyCycle}
            onChange={(e) => setDutyCycle(Number(e.target.value))}
          />
          <label htmlFor="dutyCycle">Duty Cycle</label>
        </div>
      </div>
    </div>
  )
}

function constrain(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}
