'use client'

import { useState, useMemo, CSSProperties as CSS } from 'react'
import styles from './page.module.css'

const MAX_DUTY_CYCLE = 100
const SVG_WIDTH = 500
const SVG_HEIGHT = 200
const STROKE_WIDTH = 8

export default function Home() {
  const [triangleWave, setTriangleWave] = useState<boolean>(true)
  const [dutyCycle, setDutyCycle] = useState<number>(MAX_DUTY_CYCLE / 2)

  const path = useMemo(() => {
    const dutyCycleValue = constrain((dutyCycle / MAX_DUTY_CYCLE) * SVG_WIDTH, STROKE_WIDTH, SVG_WIDTH - STROKE_WIDTH)
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
            Triangle Wave
          </label>
          <label>
            <input
              className={styles.radioInput}
              type="radio"
              name="waveform"
              checked={!triangleWave}
              onChange={() => setTriangleWave(false)}
            />
            Square Wave
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
