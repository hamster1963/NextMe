import { cn } from '../../lib/utils'
import React from 'react'

function SkeletonBase({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-neutral-200 dark:bg-neutral-800',
        className
      )}
      {...props}
    />
  )
}

export { SkeletonBase }
