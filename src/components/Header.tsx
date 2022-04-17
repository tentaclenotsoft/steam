import React from 'react'

import Link from 'next/link'

import SwitchTheme from './SwitchTheme'

const Header = ({ title }: { title: string }) => {
  return (
    <div className="w-full px-16 md:px-32 xl:px-64 2xl:px-96 py-6 flex justify-between items-center">
      <h1 className="text-3xl font-extrabold hover:text-zinc-600 dark:hover:text-zinc-300">
        <Link href="/">{title}</Link>
      </h1>
      <SwitchTheme />
    </div>
  )
}

export default Header
