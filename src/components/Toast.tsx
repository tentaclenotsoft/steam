import { useState } from 'react'

import * as ToastPrimitive from '@radix-ui/react-toast'
import clsx from 'clsx'

import { useMediaQuery } from '@hooks/useMediaQuery'
import { IToast } from '@interfaces'

export const useOpenToast = () => useState(false)

export const useToastContent = () =>
  useState({} as { title: string; message: string })

export default function Toast ({
  open,
  setOpen,
  title,
  message,
  duration = 4000
}: IToast) {
  const isMd = useMediaQuery('(min-width: 768px)')

  return (
    <ToastPrimitive.Provider swipeDirection={isMd ? 'up' : 'down'}>
      <ToastPrimitive.Root
        open={open}
        onOpenChange={setOpen}
        duration={duration}
        className={clsx(
          'fixed z-50',
          'top-8 inset-x-1/3',
          'bg-white dark:bg-zinc-900',
          'shadow-lg',
        )}
      >
        <div className="flex flex-col px-5 py-3">
          <ToastPrimitive.Title className="font-medium">
            {title}
          </ToastPrimitive.Title>
          <ToastPrimitive.Description className="mt-1 text-sm text-zinc-500 dark:text-zinc-400/75">
            {message}
          </ToastPrimitive.Description>
        </div>
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  )
}
