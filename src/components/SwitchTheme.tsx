import { useEffect, useState } from 'react'

import { useTheme } from 'next-themes'

import Switch from './Switch'

export default function SwitchTheme () {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setIsMounted(true))

  const switchTheme = (checked) => {
    if (isMounted) {
      setTheme(checked ? 'dark' : 'light')
    }
  }

  return (
    <Switch
      checked={!isMounted || theme === 'dark'}
      onCheckedChange={switchTheme}
    />
  )
}
