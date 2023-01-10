import Link from 'next/link'

import clsx from 'clsx'

import SwitchTheme from './SwitchTheme'

const MenuItem = ({ href, text }: { href?: string; text: string }) => {
  return (
    <div
      className={clsx(
        'font-light',
        'text-zinc-600 dark:text-zinc-300 hover:text-black hover:dark:text-white',
        'ease-in-out duration-300',
        'uppercase cursor-pointer'
      )}
    >
      {href ? <Link href={href}>{text}</Link> : text}
    </div>
  )
}

export default function Header () {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center px-16 py-6 space-y-5 sm:space-y-0">
      <Link href="/">
        <div
          className={clsx(
            'text-center text-5xl font-black tracking-tighter leading-9',
            'bg-clip-text text-transparent bg-gradient-to-br from-rose-600 to-red-700 hover:from-rose-700 hover:to-red-800',
            'cursor-pointer'
          )}
        >
          Steam
          <br />
          Toolkit
        </div>
      </Link>
      <div className="w-9/12 flex justify-center items-center space-x-5">
        <MenuItem href="/level" text="Level" />
      </div>
      <SwitchTheme />
    </div>
  )
}
