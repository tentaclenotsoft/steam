import clsx from 'clsx'

import { levelToClasses } from '@utils'

export default function SteamLevels ({ level }: { level: number }) {
  const levelClasses = levelToClasses(level)

  return (
    <div className={clsx('level', levelClasses?.join(' ').trim(), 'scale-[3]')}>
      <div className="h-full flex justify-center">
        <span
          className={clsx(
            'font-light font-motiva-sans',
            !level ? 'text-[#9b9b9b]/50' : 'text-white'
          )}
        >
          {level ?? '?'}
        </span>
      </div>
      <div className="absolute inset-0 -z-10 bg-zinc-400/50 dark:bg-transparent blur" />
    </div>
  )
}
