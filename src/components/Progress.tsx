import * as ProgressPrimitive from '@radix-ui/react-progress'
import clsx from 'clsx'

export default function Progress ({
  percentage,
  value
}: {
  percentage: number
  value?: string | number
}) {
  percentage = percentage || 0

  return (
    <ProgressPrimitive.Root
      value={percentage}
      className="w-full h-5 bg-zinc-300 dark:bg-zinc-900 overflow-hidden"
    >
      <ProgressPrimitive.Indicator
        style={{ width: `${percentage}%` }}
        className={clsx(
          'h-full flex items-center bg-zinc-800 dark:bg-zinc-200 duration-300 ease-in-out',
          percentage >= 90 ? 'justify-end' : 'justify-start'
        )}
      >
        <div
          className={clsx(
            'flex',
            percentage >= 90
              ? 'text-zinc-200 dark:text-zinc-800'
              : 'text-zinc-800 dark:text-zinc-200'
          )}
          style={percentage >= 90 ? { right: '0' } : { paddingLeft: '100%' }}
        >
          <span
            className={clsx(
              'px-1.5 text-sm font-light whitespace-nowrap',
              percentage === 0 ? 'opacity-0' : 'opacity-100'
            )}
          >
            {value}
          </span>
        </div>
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  )
}
