import { ReactNode } from 'react'

import clsx from 'clsx'

export default function Button ({
  children,
  ...props
}: {
  children: ReactNode
}) {
  return (
    <button
      className={clsx(
        'w-full p-2 text-zinc-200',
        'bg-gradient-to-br from-rose-500 to-red-600 dark:from-rose-600 dark:to-red-700',
        'hover:from-rose-400 hover:to-red-500 hover:dark:from-rose-700 hover:dark:to-red-800'
      )}
      {...props}
    >
      {children}
    </button>
  )
}
