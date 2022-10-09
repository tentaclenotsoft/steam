import { useEffect, useState } from 'react'
import Switch from 'react-switch'

import { useTheme } from 'next-themes'

import { shade } from 'polished'

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
      offColor={shade(0.04, '#e4e4e7')}
      onColor={shade(0.8, '#52525b')}
      handleDiameter={15}
      uncheckedIcon={false}
      checkedIcon={false}
      height={30}
      width={50}
      borderRadius={0}
      checkedHandleIcon={
        <div
          style={{
            height: '100%',
            backgroundColor: '#000',
            border: '1px solid #000'
          }}
        />
      }
    />
  )
}

export default SwitchTheme
