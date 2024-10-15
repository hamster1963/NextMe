import React from 'react'
import { Progress } from './progress'

type PercentBarProps = {
  playing?: boolean
  value: number
}

export default function PercentBar({ playing, value }: PercentBarProps) {
  return (
    <Progress
      aria-label={'Percent Bar'}
      aria-labelledby={'Percent Bar'}
      value={value}
      indicatorClassName={playing ? 'bg-green-600' : 'bg-orange-600'}
      className={'h-[3px] rounded-sm bg-white/80 dark:bg-neutral-900'}
    />
  )
}
