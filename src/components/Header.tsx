import React from 'react'

import SwitchTheme from './SwitchTheme'

const Header = ({ title }: { title: string }) => {
  return (
    <div className="w-full px-16 md:px-32 xl:px-64 2xl:px-96 py-6 flex justify-between">
      <h1 className="text-xl font-bold">{title}</h1>
      <SwitchTheme />
    </div>
  )
}

export default Header
