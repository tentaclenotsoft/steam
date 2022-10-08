import React from 'react'

import SwitchTheme from './SwitchTheme'

const Header = () => {
  return (
    <div className="h-60 sm:h-44 flex flex-col sm:flex-row justify-between items-center px-16 py-6 sm:py-0">
      <div className="text-center text-5xl font-black tracking-tighter leading-9 bg-clip-text text-transparent bg-gradient-to-br from-rose-600 to-red-700">
        Steam
        <br />
        Toolkit
      </div>
      <div className="w-9/12 flex justify-center items-center text-xl space-x-5">
        <div className="text-extrabold hover:scale-125 cursor-pointer ease-in-out duration-300">
          Foo
        </div>
        <div className="text-extrabold hover:scale-125 cursor-pointer ease-in-out duration-300">
          Bar
        </div>
        <div className="text-extrabold hover:scale-125 cursor-pointer ease-in-out duration-300">
          Qux
        </div>
      </div>
      <SwitchTheme />
    </div>
  )
}

export default Header
