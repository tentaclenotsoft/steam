import clsx from 'clsx'

import { levelToClasses } from '@utils'

export default function SteamLevels ({
  level,
  size
}: {
  level: number
  size?: string
}) {
  const levelClasses = levelToClasses(level)
  const sizes = {
    small: null,
    medium: 'scale-125',
    large: 'scale-[3]'
  }

  return (
    <div className={clsx('level', levelClasses?.join(' ').trim(), sizes[size])}>
      <div className="h-full flex justify-center">
        <span
          className={clsx(
            'font-light font-motiva-sans',
            !level ? 'text-[#9b9b9b]/50' : 'text-white'
          )}
        >
          {level || '?'}
        </span>
      </div>
      <div className="absolute inset-0 -z-10 bg-zinc-400/50 dark:bg-transparent blur" />
    </div>
  )
}
