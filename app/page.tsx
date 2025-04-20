'use client'

import { useState, useMemo, CSSProperties as CSS } from 'react'
import styles from './page.module.css'

const MAX_DUTY_CYCLE = 100
const SVG_WIDTH = 1000
const SVG_HEIGHT = 400
const STROKE_WIDTH = 4

export default function Home() {
  const [triangleWave, setTriangleWave] = useState<boolean>(true)
  const [dutyCycle, setDutyCycle] = useState<number>(MAX_DUTY_CYCLE / 2)

  const path = useMemo(() => {
    const dutyCycleValue = (dutyCycle / MAX_DUTY_CYCLE) * SVG_WIDTH
    return triangleWave
      ? `M ${STROKE_WIDTH},${SVG_HEIGHT - STROKE_WIDTH} L ${dutyCycleValue},${STROKE_WIDTH} L ${
          SVG_WIDTH - STROKE_WIDTH
        },${SVG_HEIGHT - STROKE_WIDTH}`
      : `M ${STROKE_WIDTH},${
          SVG_HEIGHT - STROKE_WIDTH
        } L ${STROKE_WIDTH},${STROKE_WIDTH} L ${dutyCycleValue},${STROKE_WIDTH} L ${dutyCycleValue},${
          SVG_HEIGHT - STROKE_WIDTH
        } L ${SVG_WIDTH - STROKE_WIDTH},${SVG_HEIGHT - STROKE_WIDTH}`
  }, [triangleWave, dutyCycle])

  return (
    <div className={styles.page} style={{ '--svg-width': SVG_WIDTH + 'px', '--svg-height': SVG_HEIGHT + 'px' } as CSS}>
      <svg viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`} className={styles.svg} xmlns="http://www.w3.org/2000/svg">
        <path fill="none" stroke="black" strokeWidth={STROKE_WIDTH} strokeLinecap="round" d={path} />
      </svg>
    </div>
  )
}
