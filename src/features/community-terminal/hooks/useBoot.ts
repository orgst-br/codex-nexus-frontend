'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export type BootPhase = 'booting' | 'post' | 'progress' | 'motd' | 'autoexec' | 'done'

export type BootLogEntry = {
  level: 'OK' | 'INFO' | 'WARN' | 'ERR'
  message: string
  delay: number
}

const BOOT_SEQUENCE: BootLogEntry[] = [
  { level: 'OK', message: 'Starting kernel thread...', delay: 120 },
  { level: 'OK', message: 'Detected hardware_soul at /dev/human0', delay: 180 },
  { level: 'OK', message: 'Verifying integrity of past_experiences...', delay: 240 },
  { level: 'OK', message: 'Mounting ~/dreams --read-only', delay: 150 },
  { level: 'OK', message: 'Allocating mental_cache for innovation', delay: 200 },
  { level: 'OK', message: 'Establishing peer-to-peer empathy link...', delay: 300 },
  { level: 'INFO', message: 'Visualizing the invisible. Nexus online.', delay: 350 },
  { level: 'OK', message: 'sh ./init_community_protocol.sh', delay: 400 },
]

const POST_BOOT = [
  { text: '> Initializing community_protocol.sh', delay: 300 },
  { text: '> Loading assets...', delay: 500 },
]

const PROGRESS_STEPS = 50
const PROGRESS_DURATION = 2400

export function useBoot(autoexecCommand?: string) {
  const [phase, setPhase] = useState<BootPhase>('booting')
  const [visibleLogs, setVisibleLogs] = useState<BootLogEntry[]>([])
  const [postLines, setPostLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)
  const [autoexecText, setAutoexecText] = useState('')
  const skippedRef = useRef(false)

  const skip = useCallback(() => {
    if (skippedRef.current) return
    skippedRef.current = true
    setVisibleLogs(BOOT_SEQUENCE)
    setPostLines(POST_BOOT.map(p => p.text))
    setProgress(100)
    setPhase('done')
  }, [])

  useEffect(() => {
    if (skippedRef.current) return
    let cancelled = false
    let acc = 0
    BOOT_SEQUENCE.forEach((entry, i) => {
      acc += entry.delay
      setTimeout(() => {
        if (cancelled || skippedRef.current) return
        setVisibleLogs(prev => [...prev, entry])
        if (i === BOOT_SEQUENCE.length - 1) setPhase('post')
      }, acc)
    })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (phase !== 'post' || skippedRef.current) return
    let cancelled = false
    let acc = 0
    POST_BOOT.forEach((line, i) => {
      acc += line.delay
      setTimeout(() => {
        if (cancelled || skippedRef.current) return
        setPostLines(prev => [...prev, line.text])
        if (i === POST_BOOT.length - 1) setPhase('progress')
      }, acc)
    })
    return () => {
      cancelled = true
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'progress' || skippedRef.current) return
    let cancelled = false
    const interval = PROGRESS_DURATION / PROGRESS_STEPS
    let step = 0
    const timer = setInterval(() => {
      if (cancelled || skippedRef.current) return
      step++
      setProgress(Math.round((step / PROGRESS_STEPS) * 100))
      if (step >= PROGRESS_STEPS) {
        clearInterval(timer)
        setPhase('motd')
      }
    }, interval)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [phase])

  useEffect(() => {
    if (phase !== 'motd' || skippedRef.current) return
    const timer = setTimeout(() => {
      if (skippedRef.current) return
      if (autoexecCommand) {
        setPhase('autoexec')
      } else {
        setPhase('done')
      }
    }, 1200)
    return () => clearTimeout(timer)
  }, [phase, autoexecCommand])

  useEffect(() => {
    if (phase !== 'autoexec' || !autoexecCommand || skippedRef.current) return
    let cancelled = false
    let i = 0
    const timer = setInterval(() => {
      if (cancelled || skippedRef.current) return
      i++
      setAutoexecText(autoexecCommand.slice(0, i))
      if (i >= autoexecCommand.length) {
        clearInterval(timer)
        setTimeout(() => {
          if (!cancelled && !skippedRef.current) setPhase('done')
        }, 600)
      }
    }, 50)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [phase, autoexecCommand])

  return { phase, visibleLogs, postLines, progress, autoexecText, skip }
}
