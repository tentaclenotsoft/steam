import { ReactNode } from 'react'

import clsx from 'clsx'

export default function Button ({
  disabled = false,
  children,
  ...props
}: {
  disabled?: boolean
  children: ReactNode
}) {
  return (
    <button
      className={clsx(
        'w-full p-2 text-zinc-200',
        ...(!disabled
          ? [
              'bg-gradient-to-br from-rose-500 to-red-600 dark:from-rose-600 dark:to-red-700',
              'hover:from-rose-400 hover:to-red-500 hover:dark:from-rose-700 hover:dark:to-red-800'
            ]
          : [
              'bg-gradient-to-br from-rose-500/50 to-red-600/50 dark:from-rose-600/50 dark:to-red-700/50',
              'cursor-not-allowed'
            ])
      )}
      {...props}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
