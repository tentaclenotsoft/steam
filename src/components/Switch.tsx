import * as SwitchPrimitive from '@radix-ui/react-switch'
import clsx from 'clsx'

export default function Switch (props: SwitchPrimitive.SwitchProps) {
  return (
    <SwitchPrimitive.Root
      className={clsx(
        'group',
        'radix-state-unchecked:bg-zinc-300',
        'radix-state-checked:bg-zinc-900',
        'w-16 h-8 relative inline-flex flex-shrink-0 cursor-pointer transition-colors duration-200 ease-in-out'
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={clsx(
          'group-radix-state-unchecked:translate-x-2 group-radix-state-unchecked:bg-white',
          'group-radix-state-checked:translate-x-9 group-radix-state-checked:bg-black',
          'w-5 h-5 my-auto inline-block transition duration-200 ease-in-out pointer-events-none'
        )}
      />
    </SwitchPrimitive.Root>
  )
}
