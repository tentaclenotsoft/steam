import React, { useEffect, useState } from 'react'
import Switch from 'react-switch'

import { useTheme } from 'next-themes'

const SwitchTheme = () => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setIsMounted(true))

  const switchTheme = () => {
    if (isMounted) {
      setTheme(theme === 'light' ? 'dark' : 'light')
    }
  }

  return (
    <Switch
      checked={!isMounted || theme === 'dark'}
      onChange={switchTheme}
      offColor="#e4e4e7"
      onColor="#52525b"
      handleDiameter={10}
      uncheckedIcon={false}
      checkedIcon={false}
      height={20}
      width={35}
      borderRadius={0}
    />
  )
}

export default SwitchTheme
