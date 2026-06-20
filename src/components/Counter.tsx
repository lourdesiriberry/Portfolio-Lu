import { useEffect, useRef } from 'react'
import { animate, useInView, useMotionValue, useTransform, motion } from 'motion/react'

type CounterProps = {
  value: number
  prefix?: string
  suffix?: string
  duration?: number
}

/** Contador que anima de 0 al valor cuando entra en viewport (una sola vez). */
export default function Counter({ value, prefix = '', suffix = '', duration = 1.8 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString('es-AR'))

  useEffect(() => {
    if (!inView) return
    const controls = animate(count, value, { duration, ease: [0.22, 1, 0.36, 1] })
    return () => controls.stop()
  }, [inView, value, duration, count])

  return (
    <span ref={ref}>
      {prefix}
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
