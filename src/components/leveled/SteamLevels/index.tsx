import React from 'react'

import { levelToClasses } from '../../../utils'

const SteamLevels = ({ level }: { level: number }) => {
  const levelClasses = levelToClasses(level)

  return (
    <div className={`level ${levelClasses?.join(' ').trim()} scale-150`}>
      <div className="h-full flex justify-center items-center">
        <span className="text-white font-sans">{level ?? '?'}</span>
      </div>
      <div className="absolute inset-0 -z-10 bg-zinc-400/50 dark:bg-transparent blur" />
    </div>
  )
}

export default SteamLevels
