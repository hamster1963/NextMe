'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

export default function TypeSwitch() {
  const router = useRouter()
  const pathname = usePathname()
  const [isChecked, setIsChecked] = useState(pathname === '/blog/daily')

  useEffect(() => {
    const isDailyPath = pathname === '/blog/daily'
    setIsChecked(isDailyPath)

    if (!isDailyPath) {
      router.prefetch('/blog/daily')
    }
  }, [pathname, router])

  const handleCheckedChange = useCallback(() => {
    setIsChecked((prevChecked) => !prevChecked)

    // Use a timeout for animation or transition effects
    setTimeout(() => {
      const newPath = pathname === '/blog/daily' ? '/blog' : '/blog/daily'
      router.push(newPath)
    }, 300)
  }, [pathname, router])

  return (
    <div className="flex items-center gap-x-2">
      <button
        onClick={handleCheckedChange}
        type="button"
        role="switch"
        aria-checked="false"
        data-state={isChecked ? 'checked' : 'unchecked'}
        value="on"
        className="data-[state=unchecked]:hover:after:bg-switch-off-hover-gradient group relative inline-flex h-[16px] w-[28px] items-center rounded-full bg-ui-bg-switch-off outline-none transition-all duration-300 before:absolute before:inset-0 before:rounded-full before:shadow-details-switch-background before:content-[''] after:absolute after:inset-0 after:rounded-full after:content-[''] hover:bg-ui-bg-switch-off-hover focus-visible:shadow-details-switch-background-focus disabled:cursor-not-allowed disabled:!bg-ui-bg-disabled data-[state=checked]:bg-ui-bg-interactive"
        id="daily-switch"
      >
        <span
          data-state={isChecked ? 'checked' : 'unchecked'}
          className="pointer-events-none h-[12px] w-[12px] rounded-full bg-ui-fg-on-color shadow-details-switch-handle transition-all group-disabled:bg-ui-fg-disabled group-disabled:shadow-none data-[state=checked]:translate-x-3.5 data-[state=unchecked]:translate-x-0.5"
        ></span>
      </button>
      <label
        className="txt-compact-medium font-sans text-[11px] font-normal"
        htmlFor="daily-switch"
      >
        thoughts
      </label>
    </div>
  )
}
