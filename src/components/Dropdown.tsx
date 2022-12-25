import { ReactNode } from 'react'

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu'
import clsx from 'clsx'

export const DropdownItem = DropdownMenuPrimitive.Item

export default function Dropdown ({
  icon,
  children
}: {
  icon: ReactNode
  children: ReactNode
}) {
  return (
    <DropdownMenuPrimitive.Root>
      <DropdownMenuPrimitive.Trigger asChild>
        <button
          className={clsx(
            'px-4 py-2 select-none',
            'bg-white hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-800',
            'focus:outline-none'
          )}
        >
          {icon}
        </button>
      </DropdownMenuPrimitive.Trigger>
      <DropdownMenuPrimitive.Content>{children}</DropdownMenuPrimitive.Content>
    </DropdownMenuPrimitive.Root>
  )
}
