import { ReactNode } from 'react'

export default function Label ({ children, ...props }: { children: ReactNode }) {
  return (
    <label className="p-2 text-zinc-500 dark:text-zinc-400/75" {...props}>
      {children}
    </label>
  )
}
