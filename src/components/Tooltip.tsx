import { ReactNode } from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'
import clsx from 'clsx'

export default function Tooltip ({
  show,
  message,
  sideOffset,
  children
}: {
  show: boolean
  message: string | null
  sideOffset?: number,
  children: ReactNode
}) {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>
          <button>{children}</button>
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            sideOffset={sideOffset || 5}
            className={clsx(
              'radix-side-top:animate-slide-down-fade',
              'radix-side-right:animate-slide-left-fade',
              'radix-side-bottom:animate-slide-up-fade',
              'radix-side-left:animate-slide-right-fade',
              'inline-flex items-center px-4 py-2.5',
              'bg-white dark:bg-zinc-900',
              !show ? 'opacity-0' : 'opacity-100'
            )}
          >
            <TooltipPrimitive.Arrow className="fill-current text-white dark:text-zinc-900" />
            <span className="block text-sm leading-none">
              {message}
            </span>
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  )
}
